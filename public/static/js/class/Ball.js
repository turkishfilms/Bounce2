class Ball {
    constructor({
        boundingBox = new BoundingBox(),
        scoreManager = new ScoreManager(),
        physics = new Physics(),
        paddles = [],
        x = boundingBox.maxX / 2,
        y = boundingBox.maxY / 2,
        r = 0.04 * boundingBox.maxX,
        xSpeed = 5,
        ySpeed = 5,
        minYSpeed = -5,
        maxYSpeed = -20,
        minXSpeed = -boundingBox.maxX / 40,
        maxXSpeed = boundingBox.maxX / 40,
        color = { r: 255, g: 255, b: 255 }
    } = {}) {

        if (!(boundingBox instanceof BoundingBox)) {
            throw new Error("'boundingBox' isnt of type BoundingBox")
        }
        if (!(physics instanceof Physics)) {
            throw new Error("'physics' isnt of type Physics")
        }
        if (!(scoreManager instanceof ScoreManager)) {
            throw new Error("'scoreManager' isnt of type ScoreManager")
        }

        this.boundingBox = boundingBox
        this.physics = physics
        this.scoreManager = scoreManager

        this.x = x
        this.y = y
        this.r = r
        this.xSpeed = xSpeed
        this.ySpeed = ySpeed
        this.paddles = paddles
        this.minXSpeed = minXSpeed
        this.minYSpeed = minYSpeed
        this.maxXSpeed = maxXSpeed
        this.maxYSpeed = maxYSpeed
        this.color = color
    }

    move(paddleIndex) {
        this.#_experienceForce()
        this.#_updatePos()

        if (this.#_isCollideWall()) this.#_reverseXSpeed()

        if (this.#_isCollidePaddle(this.paddles[paddleIndex])) {
            this.#_setYSpeed(this.#_bounceYSpeed())
            this.#_setXSpeed(this.#_bounceXSpeed())
            this.scoreManager.incrementScore()
        }
    }

    show(img) {
        if (img) image(img, this.x, this.y, 2 * this.r, 2 * this.r)
        else {
            fill(this.color)
            ellipse(this.x, this.y, this.r, this.r)
        }
    }

    //#_private

    #_experienceForce() {
        const forces = this.physics
        for (let force in forces.yForces) this.ySpeed += forces.yForces[force]
        for (let [type, Force] of Object.entries(forces.xForces)) this.xSpeed *= Force
    }

    #_updatePos() {
        this.x += this.xSpeed
        this.y += this.ySpeed
    }

    #_reverseXSpeed() { this.xSpeed *= -1 }

    #_bounceXSpeed() {
        const randomXSpeedForce = random(-this.boundingBox.maxX / 20, this.boundingBox.maxX / 20)

        return min(max(this.xSpeed + randomXSpeedForce, this.minXSpeed), this.maxXSpeed)
    }

    #_bounceYSpeed() { return random(this.maxYSpeed, this.minYSpeed) }

    #_setXSpeed(speed) { this.xSpeed = speed }

    #_setYSpeed(speed) { this.ySpeed = speed }

    //conditionals

    #_isCollideWall() {
        return this.x + this.r >= this.boundingBox.maxX || this.x - this.r <= this.boundingBox.minX
    }

    #_isCollidePaddle(paddle) {
        return (
            this.y >= paddle.y &&
            this.y <= paddle.y + paddle.h &&
            this.x >= paddle.x &&
            this.x <= paddle.x + paddle.w)
    }


}