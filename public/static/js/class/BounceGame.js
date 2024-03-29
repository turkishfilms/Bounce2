class BounceGame {
    constructor({
        balls = [],
        paddles = [],
        bricks = bricks = [],
        name,
        boundingBox = new BoundingBox(),
        scoreManager = new ScoreManager2(),
        physics = new Physics(),
        domManager = new DOMManager()
    } = {}) {

        if (!(boundingBox instanceof BoundingBox)) {
            throw new Error("'boundingBox' must be an instance of BoundingBox")
        }
        if (!(scoreManager instanceof ScoreManager2)) {
            throw new Error("'scoreManager' must be an instance of ScoreManager")
        }
        if (!(physics instanceof Physics)) {
            throw new Error("'physics' must be an instance of Physics")
        }
        if (!(domManager instanceof DOMManager)) {
            throw new Error("'domManager' must be an instance of DOMManager")
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

    #_addPaddle(newPaddle) {
        this.paddles.push(newPaddle)
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
    #_addBall(ball) {
        this.balls.push(ball)
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