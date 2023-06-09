class ScoreHandler {
  #score;
  #highscore;
  constructor({ score = 0, highscore = 0 } = {}) {
    this.#score = score;
    this.#highscore = highscore;
  }

  resetScore() {
    this.#setScore(0);
  }

  incrementScore() {
    this.#setScore(this.score + 1);
    if (this.#isHighscore()) this.#setHighscore();
  }

  get score() {
    return this.#score;
  }

  get highscore() {
    return this.#highscore;
  }

  //#private

  #isHighscore() {
    return this.#score > this.#highscore;
  }

  #setScore(score) {
    if (typeof score != "number") {
      throw new Error("Type Error: score must be of type 'number'");
    }
    if (score <= 0) {
      throw new Error("Range Error: score must be positive");
    }

    this.#score = Math.floor(score);
  }

  #setHighscore() {
    this.#highscore = this.#score;
  }

  #resetHighscore() {
    this.#highscore = 0;
  }
}
