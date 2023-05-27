class Ball {
    constructor({ x = width / 2, y = height / 2, r = 0.04 * width, xspeed = 5, yspeed = 5 } = {}) {
        this.x = x
        this.y = y
        this.r = r
        this.xspeed = xspeed
        this.yspeed = yspeed
    }

    nextFrame() {
        this.move()
        if (this.isHighscore) updateHighScore(score)
    }

    move(wall,paddle) {
        if (this.isCollideWall()) this.reverseXSpeed()

        if (this.isCollidePaddle()) {
            addPoint()
            this.bounceYSpeed()
            this.bounceXSpeed()
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
        return this.x > width - this.r || this.x < this.r
    }

    bringInBounds() {
        this.x = this.x > width - this.r ? width - this.r : this.r

    }

    isCollidePaddle() {
        return this.y >= boardY - this.r &&
            (this.x > boardX - boardW / 2 && this.x < boardX + boardW / 2)
    }

    isHighscore() { return points > highscore }

    updateHighScore(points) { highscore = points }

    updatePos() {
        this.x += this.xspeed
        this.y += this.ySpeed
    }

    reverseXSpeed() { this.xspeed *= -1 }

    bounceXSpeed() { this.xspeed = constrain(this.xspeed + random(-width / 20, -width / 20), -width / 40, width / 40) }

    bounceYSpeed() { this.yspeed = random(-height / 40, -height / 100) }
}