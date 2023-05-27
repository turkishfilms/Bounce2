class BounceGame {
    constructor({
        balls = [],
        paddles = [],
        gravity = 0.4,
        points = 0,
        highscore = 0,
        boundingBox = new BoundingBox(),
        scoreManager = new ScoreManager(),
    physics = new Physics() } = {}) {
        this.balls = balls
        this.paddles = paddles
        this.points = points
        this.highscore = highscore
        this.boundingBox = boundingBox
        this.scoreManager = scoreManager
        this.physics = physics

        this.scoreID = 'heyhey'
        this.highscoreID = 'hoho'

        this.addPaddle(this.newPaddle())
        this.addBall(this.newBall())
        this.addDiv(this.scoreID, this.points)
        this.addDiv(this.highscoreID, this.highscore)
    }

    addDiv = (id) => { //FIXME
        const scoreDiv = document.createElement("p");
        scoreDiv.id = id
        scoreDiv.appendChild(document.createTextNode(`${this.points}\n`))
        document.body.prepend(scoreDiv)
    }

    contains(pos) {
        return pos.x > this.boundingBox.minX && pos.x < this.boundingBox.maxX && pos.y > this.boundingBox.minY && pos.y < this.boundingBox.maxY
    }

    newPaddle() {
        const x = this.boundingBox.maxX / 2
        const w = this.boundingBox.maxX / 4
        const h = w / 4
        const y = (0.90 * this.boundingBox.maxY) - h
        return new Paddle({
            x: x, w: w, h: h, y: y
        })
    }

    addPaddle(paddle) { this.paddles.push(paddle) }

    newBall() {
        return new Ball({
            xspeed: random(-5, 5),
            yspeed: random(-5, 0),
            boundingBox: this.boundingBox,
            scoreManager: this.scoreManager,
            paddles: this.paddles,
            physics: this.physics
        })
    }

    addBall(ball) { this.balls.push(ball) }

    updateScoreDisplay() {
        document.getElementById(`${this.scoreID}`).innerHTML = `Points: ${this.points}\n`
        document.getElementById(`${this.highscoreID}`).innerHTML = `Highscore: ${this.highscore}\n`
    }

    resetScore() { this.points = this.scoreManager.resetScore() }

    incrementScore() {
        this.points = this.scoreManager.incrementScore()
    }

    ballsNext() {
        this.balls.forEach((b, i) => {
            b.move(0)
            b.showImg()
            if (this.isBallOffscreen(b)) this.ballFell(i)
        })
        this.updateScore()
    }
    updateScore() {
        this.points = this.scoreManager.currentScore()
        this.highscore = this.scoreManager.currentHighscore()
        this.updateScoreDisplay
    }
    isBallOffscreen(ball) {
        return ball.y >= this.boundingBox.maxY
    }

    ballFell(index) {
        this.removeBall(index)
        this.resetScore()
        this.addBall(this.newBall())
    }

    removeBall(ballIndex) { this.balls.splice(ballIndex, 1) }

    paddlesNext() {
        this.paddles.forEach(p => {
            p.x = mouseX
            p.showImg()
        })
    }

    next() {
        this.ballsNext()
        this.paddlesNext()
        this.updateScoreDisplay()
    }

}