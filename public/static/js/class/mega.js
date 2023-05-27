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
class BounceGame {
    constructor({
        balls = [],
        paddles = [],
        name,
        boundingBox = new BoundingBox(),
        scoreManager = new ScoreManager(),
        physics = new Physics(),
        domManager = new DOMManager()
    } = {}) {

        if (!(boundingBox instanceof BoundingBox)) {
            throw new Error("'boundingBox' is not of type BoundingBox")
        }
        if (!(scoreManager instanceof ScoreManager)) {
            throw new Error("'scoreManager' is not of type ScoreManager")
        }
        if (!(physics instanceof Physics)) {
            throw new Error("'physics' is not of type Physics")
        }
        if (!(domManager instanceof DOMManager)) {
            throw new Error("'domManager' is not of type DOMManager")
        }


        this.boundingBox = boundingBox
        this.scoreManager = scoreManager
        this.physics = physics
        this.domManager = domManager

        this.balls = balls
        this.paddles = paddles

        this.name = name || games.length + 1

        this.#_addPaddle(this.#_newPaddle())
        this.#_addBall(this.#_newBall())
        this.domManager.addDiv(`Game ${this.name} score`, this.scoreManager.currentScore())
        this.domManager.addDiv(`Game ${this.name} highscore`, this.scoreManager.currentHighscore())
    }

    nextFrame() {
        this.#_ballsNext()
        this.#_paddlesNext()
        this.domManager.updateScoreDisplay(
            this.name,
            this.scoreManager.currentScore(),
            this.scoreManager.currentHighscore()
        )
    }

    receiveBall(pos) {
        if (this.#_contains(pos)) this.#_addBall(this.#_newBall())
    }

    //#_private

    #_addPaddle(paddle) {
        this.paddles.push(paddle)
    }

    #_addBall(ball) {
        this.balls.push(ball)
    }

    #_newPaddle() {
        const x = this.boundingBox.maxX / 2
        const w = this.boundingBox.maxX / 4
        const h = w / 4
        const y = (0.90 * this.boundingBox.maxY) - h
        return new Paddle({
            x: x,
            w: w,
            h: h,
            y: y
        })
    }

    #_newBall() {
        console.log()
        return new Ball({
            xSpeed: random(-5, 5),
            ySpeed: random(-5, 0),
            boundingBox: this.boundingBox,
            scoreManager: this.scoreManager,
            paddles: this.paddles,
            physics: this.physics
        })
    }

    #_paddlesNext() {
        this.paddles.forEach(p => {
            p.x = mouseX - p.w / 2
            p.show(Fimg)
        })
    }

    #_ballsNext() {
        this.balls.forEach((b, i) => {
            b.move(0)
            b.show(CJimg)
            if (this.#_isBallOffscreen(b)) this.#_ballFell(i)
        })
    }

    #_ballFell(index) {
        this.#_removeBall(index)
        this.scoreManager.resetScore()
        this.#_addBall(this.#_newBall())
    }

    #_removeBall(ballIndex) {
        this.balls.splice(ballIndex, 1)
    }

    //conditional

    #_isBallOffscreen(ball) {
        return ball.y >= this.boundingBox.maxY
    }

    #_contains(pos) {
        return (
            pos.x > this.boundingBox.minX &&
            pos.x < this.boundingBox.maxX &&
            pos.y > this.boundingBox.minY &&
            pos.y < this.boundingBox.maxY)
    }
}
class BoundingBox {
    constructor({
        maxX = 100,
        maxY = 100,
        minX = -100,
        minY = -100,
    } = {}) {
        this.maxX = maxX
        this.maxY = maxY
        this.minX = minX
        this.minY = minY
    }
}
class DOMManager {
    constructor({ } = {}) {
        this.x = 0
    }

    addDiv = (id) => { //FIXME
        const scoreDiv = document.createElement("p")
        scoreDiv.id = id
        scoreDiv.appendChild(document.createTextNode(`0\n`))
        document.body.prepend(scoreDiv)
    }

    updateScoreDisplay(id, score, highscore) {
        document.getElementById(`Game ${id} score`).textContent = `Points: ${score}\n`
        document.getElementById(`Game ${id} highscore`).textContent = `Highscore: ${highscore}\n`
    }

}
class Paddle {
    constructor({ w = 100, h = 10, x = 10, y = 10, color = { r: 255, g: 255, b: 255 } } = {}) {
        this.w = w
        this.h = h
        this.x = x
        this.y = y
        this.offsetW = 10
        this.offsetH = 50
        this.color = color
    }

    show(img) {
        if (img) image(GSimg, this.x, this.y + this.h / 2, this.w + this.offsetW, this.h + this.offsetH)
        else {
            fill(this.color)
            rect(this.x, this.y, this.w, this.h)
        }
    }
}
class Physics {
    constructor({ yForces = { gravity: 0.4 }, xForces = { airResistance: 0.9999 } } = {}) {
        this.yForces = yForces
        this.xForces = xForces
    }
}
class ScoreManager {
    constructor({ score = 0, highscore = 0 } = {}) {
        this.score = score
        this.highscore = highscore
    }

    resetScore() {
        this.#setScore(0)
    }

    incrementScore() {
        this.score++
        if (this.#isHighscore()) this.#setHighscore()
    }

    currentScore() { return this.score }

    currentHighscore() { return this.highscore }

    //#private
    
    #isHighscore() { return this.score > this.highscore }

    #setScore(score) { this.score = score }

    #setHighscore() { this.highscore = this.score }

    #resetHighscore() { this.highscore = 0 }

}