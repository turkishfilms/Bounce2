class BounceGame {
    constructor({ balls = [], paddles = [], gravity = 0.4, points = 0, highscore = 0, boundingBox = new BoundingBox() } = {}) {
        this.balls = balls
        this.paddles = paddles
        this.gravity = gravity
        this.points = points
        this.highscore = highscore
        this.boundingBox = boundingBox
        this.scoreID = 'heyhey'
        this.HighscoreID = 'hoho'

        this.addPaddle(this.newPaddle())
        this.addBall(this.newBall())
        this.addDiv(this.scoreID, this.points)
        this.addDiv(this.highscoreID, this.highscore)
    }

    addDiv = (id) => { //FIXME
        const scoreDiv = document.createElement("p");
        scoreDiv.id = id
        scoreDiv.appendChild(document.createTextNode(`${this.points}`))
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

    newBall() { return new Ball({ xspeed: random(-5, 5), yspeed: random(-5, 0), game: this }) }

    addBall(ball) { this.balls.push(ball) }

    updateScoreDisplay() {
        document.getElementById(`${scoreID}`).innerHTML = `Points: ${points}`
        document.getElementById(`${HighscoreID}`).innerHTML = `Highscore: ${highscore}`
    }

    resetScore() { this.points = 0 }

    incrementScore() { this.points++ }

    ballsNext() {
        this.balls.forEach((b, i) => {
            b.move()
            b.showImg()
            if (this.isBallOffscreen(b)) this.ballFell(i)
        })
    }

    isBallOffscreen(ball) {
        return ball.y >= this.boundingBox.maxY
    }

    ballFell(index) {
        removeBall(index)
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