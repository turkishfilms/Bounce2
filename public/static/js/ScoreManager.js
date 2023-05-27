class ScoreManager {
    constructor({ score = 0, highscore = 0 } = {}) {
        this.score = score
        this.highscore = highscore
    }

    resetScore() {
        this.score = 0
        return this.score
    }

    incrementScore() {
        console.log("ya")
        this.score++
        if (this.isHighscore()) this.setHighscore()
        return this.score
    }

    isHighscore() { return this.score > this.highscore }

    setScore(score) { this.score = score }

    setHighscore() { this.highscore = this.score }

    resetHighscore() { this.highscore = 0 }

    currentScore() { return this.score }

    currentHighscore() { return this.highscore }
}