class BallHandler {
  constructor({
    balls = [],
    paddleHandler = new PaddleHandler(),
    scoreHandler = new ScoreHandler(),
  } = {}) {
    this.balls = balls;
    if (!(paddleHandler instanceof PaddleHandler)) {
      throw new Error("'paddleHandler' must bee an instance od PaddleHandler");
    }
    if (!(scoreHandler instanceof ScoreHandler)) {
      throw new Error("'scoreHandler' must be an instance of ScoreHandler");
    }
    this.paddleHandler = paddleHandler;
    this.scoreHandler = scoreHandler;

    this.#addBall(this.#newBall());
  }

  #addBall(ball) {
    if (!ball instanceof Ball) {
      throw new Error("'ball' must be an instance of Ball");
    }
    this.balls.push(ball);
  }

  #newBall() {
    return new Ball({
      xSpeed: random(-5, 5),
      ySpeed: random(-5, 0),
      boundingBox: this.boundingBox,
      scoreManager: this.scoreManager,
      paddles: this.paddles,
      physics: this.physics,
    });
  }

  #nextFrame() {
    this.balls.forEach((b, i) => {
      this.paddleHandler.paddles.forEach((paddle) => {
        b.move(paddle);
      });
      b.show();
      if (b.isBallOffscreen()) this.#ballFell(i);
    });
  }

  #ballFell(index) {
    this.#removeBall(index);
    this.scoreManager.resetScore();
    this.#addBall(this.#newBall());
  }

  #removeBall(ballIndex) {
    this.balls.splice(ballIndex, 1);
  }

  //conditional

  #isBallOffscreen(ball) {
    return ball.y >= this.boundingBox.maxY;
  }
}
