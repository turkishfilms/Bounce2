class BounceGame {
    constructor({ balls = [], paddles = [], gravity = 0.4, points = 0, highscore = 0, boundingBox = new BoundingBox(), scoreManager = new ScoreManager() } = {}) {
        this.balls = balls
        this.paddles = paddles
        this.gravity = gravity
        this.points = points
        this.highscore = highscore
        this.boundingBox = boundingBox
        this.scoreManager = scoreManager

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
        scoreDiv.appendChild(document.createTextNode(`${this.points}`))
        document.body.appendChild(scoreDiv)
    }

    newPaddle() {
        const x = this.boundingBox.maxX / 2
        const w = this.boundingBox.maxX / 7
        const h = w / 5
        const y = (0.95 * this.boundingBox.maxY) - h
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
            gravity: this.gravity
        })
    }

    addBall(ball) { this.balls.push(ball) }

    updateScoreDisplay() {
        document.getElementById(`${this.scoreID}`).innerHTML = `Points: ${this.points}`
        document.getElementById(`${this.highscoreID}`).innerHTML = `Highscore: ${this.highscore}`
    }

    resetScore() { this.points = this.scoreManager.resetScore() }

    incrementScore() {
        this.points = this.scoreManager.incrementScore()
        this.highscore = this.currentHighscore()
    }

    ballsNext() {
        this.balls.forEach((b, i) => {
            b.move(0)
            b.show()
            if (this.isBallOffscreen(b)) this.ballFell(i)
        })
    }

    isBallOffscreen(ball) {
        return ball.y >= this.boundingBox.maxY
    }

    ballFell(index) {
        this.removeBall(index)
        this.resetScore()
    }

    removeBall(ballIndex) { this.balls.splice(ballIndex, 1) }

    paddlesNext() {
        this.paddles.forEach(p => {
            p.move()
            p.show()
        })
    }

    next() {
        this.ballsNext()
        this.paddlesNext()
        this.updateScoreDisplay()
    }

}