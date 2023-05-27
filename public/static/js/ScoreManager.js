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