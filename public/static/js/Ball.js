class Ball {
    constructor({
        boundingBox = new BoundingBox(),
        scoreManager = new ScoreManager(),
        physics = new Physics(),
        paddles = [],
        x = boundingBox.maxX / 2,
        y = boundingBox.maxY / 2,
        r = 0.04 * boundingBox.maxX,
        xspeed = 5,
        yspeed = 5,
        minYSpeed = -5,
        maxYSpeed = -20,
        minXSpeed = -boundingBox.maxX / 40,
        maxXSpeed = boundingBox.maxX / 40,
        color = {r:255,g:255,b:255}
    } = {}) {
        this.x = x
        this.y = y
        this.r = r
        this.xSpeed = xspeed
        this.ySpeed = yspeed
        this.boundingBox = boundingBox
        this.paddles = paddles
        this.scoreManager = scoreManager
        this.physics = physics
        this.minXSpeed = minXSpeed
        this.minYSpeed = minYSpeed
        this.maxXSpeed = maxXSpeed
        this.maxYSpeed = maxYSpeed
        this.color = color
    }

    move(paddleIndex) {
        this.#experienceForce()
        this.#updatePos()

        if (this.#isCollideWall()) this.#reverseXSpeed()

        if (this.#isCollidePaddle(this.paddles[paddleIndex])) {
            this.#setYSpeed(this.#bounceYSpeed())
            this.#setXSpeed(this.#bounceXSpeed())
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

    //#private

    #experienceForce() {
        const forces = this.physics
        for (let force in forces.yForces) this.ySpeed += forces.yForces[force]
        for (let [type, Force] of Object.entries(forces.xForces)) this.xSpeed *= Force
    }

    #updatePos() {
        this.x += this.xSpeed
        this.y += this.ySpeed
    }

    #reverseXSpeed() { this.xSpeed *= -1 }

    #bounceXSpeed() {
        const randomXSpeedForce = random(-this.boundingBox.maxX / 20, this.boundingBox.maxX / 20)

        return constrain(this.xSpeed + randomXSpeedForce, this.minXSpeed, this.maxXSpeed)
    }

    #bounceYSpeed() { return random(this.maxYSpeed, this.minYSpeed) }

    #setXSpeed(speed) { this.xSpeed = speed }

    #setYSpeed(speed) { this.ySpeed = speed }

    //conditionals

    #isCollideWall() {
        return this.x + this.r >= this.boundingBox.maxX || this.x - this.r <= this.boundingBox.minX
    }

    #isCollidePaddle(paddle) {
        return this.y >= paddle.y &&
            this.y <= paddle.y + paddle.h &&
            this.x >= paddle.x &&
            this.x <= paddle.x + paddle.w
    }


}