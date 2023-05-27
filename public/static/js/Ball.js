class Ball {
    constructor({
        x = width / 2,
        y = height / 2,
        r = 0.04 * width,
        xspeed = 5,
        yspeed = 5,
        game = new BounceGame(),
        minXSpeed = -game.boundingBox.maxX / 40,
        minYSpeed = -game.boundingBox.minY / 40,
        maxXSpeed = game.boundingBox.maxX / 40,
        maxYSpeed = game.boundingBox.maxY / 40 } = {}) {
        this.x = x
        this.y = y
        this.r = r
        this.xspeed = xspeed
        this.yspeed = yspeed
        this.game = game
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

        if (this.isCollidePaddle(this.game.paddles[paddleIndex])) {
            this.bounceYSpeed()
            this.bounceXSpeed()
            this.game.incrementScore()
        }
    }

    show() {
        fill(200, 50, 100)
        ellipse(this.x, this.y, this.r);
    }

    showImg() {
        imageMode(CENTER)
        image(CJimg, this.x, this.y, 2 * this.r, 2 * this.r)
    }

    experienceForce() {
        this.ySpeed += gravity
    }

    isCollideWall() {
        return this.x + this.r >= this.game.boundingBox.maxX || this.x - this.r <= this.game.boundingBox.minX
    }

    bringInBounds() {
        this.x = this.x + this.r > this.game.boundingBox.maxX ? this.game.boundingBox.maxX - this.r : this.game.boundingBox.minX + this.r
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
        this.x += this.xspeed
        this.y += this.ySpeed
    }

    reverseXSpeed() { this.xspeed *= -1 }

    randomXSpeed() {
        const randomXSpeedForce = random(-this.game.boundingBox.maxX / 20, -this.game.boundingBox.maxX / 20)

        return constrain(this.xspeed + randomXSpeedForce, this.minXSpeed, THIS.maxXSpeed)
    }

    bounceXSpeed() { this.setXSpeed() }

    bounceYSpeed() { this.yspeed = random(-this.game.boundingBox.maxY / 40, -this.game.boundingBox.maxY / 100) }
}