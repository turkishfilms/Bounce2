class Ball {
    constructor({
        x = width / 2,
        y = height / 2,
        r = 0.04 * width,
        xspeed = 5,
        yspeed = 5,
        boundingBox = new BoundingBox(),
        paddles = [],
        scoreManager = new ScoreManager(),
        gravity = 0,
        minXSpeed = -boundingBox.maxX / 40,
        minYSpeed = -boundingBox.minY / 40,
        maxXSpeed = boundingBox.maxX / 40,
        maxYSpeed = -boundingBox.maxY / 100 } = {}) {
        this.x = x
        this.y = y
        this.r = r
        this.xSpeed = xspeed
        this.ySpeed = yspeed
        this.boundingBox = boundingBox
        this.paddles = paddles
        this.scoreManager = scoreManager
        this.gravity = gravity
        this.minXSpeed = minXSpeed
        this.minYSpeed = minYSpeed
        this.maxXSpeed = maxXSpeed
        this.maxYSpeed = maxYSpeed
    }

    nextFrame() {
        this.move()
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
        ellipse(this.x, this.y, this.r,this.r);
    }

    showImg() {
        imageMode(CENTER)
        image(CJimg, this.x, this.y, 2 * this.r, 2 * this.r)
    }

    experienceForce() {
        this.ySpeed += this.gravity
    }

    isCollideWall() {
        return this.x + this.r >= this.boundingBox.maxX || this.x - this.r <= this.boundingBox.minX
    }

    bringInBounds() {
        this.x = this.x + this.r > this.boundingBox.maxX ? this.boundingBox.maxX - this.r : this.boundingBox.minX + this.r
    }

    isCollidePaddle(paddle) {
        return this.y + this.r >= paddle.y &&
            this.y - this.r <= paddle.y + paddle.h &&
            this.x - this.r >= paddle.x &&
            this.x + this.r <= paddle.x + paddle.w
    }

    isHighscore() { return points > highscore }

    updateHighScore(points) { highscore = points }

    updatePos() {
        this.x += this.xSpeed
        this.y += this.ySpeed
    }

    reverseXSpeed() { this.xSpeed *= -1 }

    randomXSpeed() {
        const randomXSpeedForce = random(-this.boundingBox.maxX / 20, -this.boundingBox.maxX / 20)

        return constrain(this.xSpeed + randomXSpeedForce, this.minXSpeed, this.maxXSpeed)
    }

    setXSpeed(speed) { this.xSpeed = speed }

    bounceXSpeed() { this.setXSpeed(this.randomXSpeed()) }

    bounceYSpeed() { this.ySpeed = random(-this.maxYSpeed, -this.minYSpeed) }
}