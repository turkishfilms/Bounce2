class BounceGame {
    constructor({ balls = [], paddles = [], gravity = 0.4, points = 0, highscore = 0, boundingBox = new boundingBox() } = {}) {
        this.balls = balls
        this.paddles = paddles
        this.gravity = gravity
        this.points = points
        this.highscore = highscore
        this.boundingBox = boundingBox
        this.scoreID = 'heyhey'
        this.HighscoreID = 'hoho'
    }

    newBall() { return new Ball({ xspeed: random(-5, 5), yspeed: random(-5, 0) }) }

    addBall(ball) {
        this.balls.push(ball)
    }

    updateScores() {
        document.getElementById(`${scoreID}`).innerHTML = `Points: ${points}`
        document.getElementById(`${HighscoreID}`).innerHTML = `Highscore: ${highscore}`
    }
    
    next() {
        this.balls.forEach((b, i) => {
            b.move()
            b.showImg()
            if (b.x >= this.boundingBox.maxY) {
                this.balls.splice(i, 1)
                this.points = 0
            }
        })

        this.paddles.forEach(p => {
            p.move()
            p.show()
        })
    }
}