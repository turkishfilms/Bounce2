class BounceGame {
    constructor({
        balls = [],
        paddles = [],
        name = games.length + 1, // obvious violation
        boundingBox = new BoundingBox(),
        scoreManager = new ScoreManager(),
        physics = new Physics() } = {}) {
        this.balls = balls
        this.paddles = paddles
        this.boundingBox = boundingBox
        this.scoreManager = scoreManager
        this.physics = physics

        this.name = name

        this.#addPaddle(this.#newPaddle())
        this.#addBall(this.#newBall())
        this.#addDiv(`Game ${this.name} score`, this.scoreManager.currentScore())
        this.#addDiv(`Game ${this.name} highscore`, this.scoreManager.currentHighscore())
    }

    next() {
        this.#ballsNext()
        this.#paddlesNext()
        this.#updateScoreDisplay()
    }

    receiveBall(pos) {
        if (this.#contains(pos)) this.#addBall(this.#newBall())
    }

    //#private

    #addPaddle(paddle) { this.paddles.push(paddle) }
    #addBall(ball) { this.balls.push(ball) }

    #newPaddle() {
        const x = this.boundingBox.maxX / 2
        const w = this.boundingBox.maxX / 4
        const h = w / 4
        const y = (0.90 * this.boundingBox.maxY) - h
        return new Paddle({
            x: x, w: w, h: h, y: y
        })
    }

    #newBall() {
        return new Ball({
            xspeed: random(-5, 5),
            yspeed: random(-5, 0),
            boundingBox: this.boundingBox,
            scoreManager: this.scoreManager,
            paddles: this.paddles,
            physics: this.physics
        })
    }

    #paddlesNext() {
        this.paddles.forEach(p => {
            p.x = mouseX - p.w / 2
            p.show(Fimg)
        })
    }

    #ballsNext() {
        this.balls.forEach((b, i) => {
            b.move(0)
            b.show(CJimg)
            if (this.#isBallOffscreen(b)) this.#ballFell(i)
        })
    }

    #ballFell(index) {
        this.#removeBall(index)
        this.scoreManager.resetScore()
        this.#addBall(this.#newBall())
    }

    #removeBall(ballIndex) { this.balls.splice(ballIndex, 1) }

    //DOM

    #addDiv = (id) => { //FIXME
        const scoreDiv = document.createElement("p");
        scoreDiv.id = id
        scoreDiv.appendChild(document.createTextNode(`0\n`))
        document.body.prepend(scoreDiv)
    }

    #updateScoreDisplay() {
        document.getElementById(`Game ${this.name} score`).innerHTML = `Points: ${this.scoreManager.currentScore()}\n`
        document.getElementById(`Game ${this.name} highscore`).innerHTML = `Highscore: ${this.scoreManager.currentHighscore()}\n`
    }

    //conditional

    #isBallOffscreen(ball) {
        return ball.y >= this.boundingBox.maxY
    }

    #contains(pos) {
        return pos.x > this.boundingBox.minX && pos.x < this.boundingBox.maxX && pos.y > this.boundingBox.minY && pos.y < this.boundingBox.maxY
    }


}