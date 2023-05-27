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
        minXSpeed = -boundingBox.maxX / 40,
        minYSpeed = -1,
        maxXSpeed = boundingBox.maxX / 40,
        maxYSpeed = -20 } = {}) {
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
    }

    move(paddleIndex) {
        this.experienceForce()

        this.updatePos()
        if (this.isCollideWall()) this.reverseXSpeed()

        if (this.isCollidePaddle(this.paddles[paddleIndex])) {
            this.bounceYSpeed()
            this.bounceXSpeed()
            this.scoreManager.incrementScore()
        }
    }

    show() {
        fill(200, 50, 100)
        ellipse(this.x, this.y, this.r, this.r);
    }

    showImg() {
        imageMode(CORNER) //CENTER
        image(CJimg, this.x, this.y, 2 * this.r, 2 * this.r)
    }

    experienceForce() {
        const forces = this.physics
        for (let force in forces.yForces) this.ySpeed += forces.yForces[force]
        for (let [type, Force] of Object.entries(forces.xForces)) this.xSpeed *= Force
    }

    isCollideWall() {
        return this.x + this.r >= this.boundingBox.maxX || this.x - this.r <= this.boundingBox.minX
    }

    bringInBounds() {
        this.x = this.x + this.r > this.boundingBox.maxX ? this.boundingBox.maxX - this.r : this.boundingBox.minX + this.r
    }

    isCollidePaddle(paddle) {
        // rect(paddle.x - this.r, paddle.y + this.r, paddle.x + this.r - paddle.w, paddle.y - this.r - paddle.h)
        return this.y >= paddle.y &&
            this.y <= paddle.y + paddle.h &&
            this.x >= paddle.x &&
            this.x <= paddle.x + paddle.w
    }

    updatePos() {
        this.x += this.xSpeed
        this.y += this.ySpeed
    }

    reverseXSpeed() { this.xSpeed *= -1 }

    randomXSpeed() {
        const randomXSpeedForce = random(-this.boundingBox.maxX / 20, this.boundingBox.maxX / 20)

        return constrain(this.xSpeed + randomXSpeedForce, this.minXSpeed, this.maxXSpeed)
    }

    randomYSpeed() { return random(this.maxYSpeed, this.minYSpeed) }

    setXSpeed(speed) { this.xSpeed = speed }

    setYSpeed(speed) { this.ySpeed = speed }

    bounceXSpeed() { this.setXSpeed(this.randomXSpeed()) }

    bounceYSpeed() { this.setYSpeed(this.randomYSpeed()) }
}