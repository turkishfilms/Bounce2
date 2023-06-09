class GameHandler {
  constructor({
    ballHandler = new BallHandler(),
    paddleHandler = new PaddleHandler(),
    brickHandler = new BrickHandler(),
    scoreHandler = new ScoreHandler(),
    domHandler = new DOMHandler(),
    boundingBox = new BoundingBox(),
    physics = new Physics(),
    name,
  } = {}) {
    if (!(scoreHandler instanceof ScoreHandler)) {
      throw new Error("'scoreHandler' must be an instance of ScoreHandler");
    }
    if (!(domHandler instanceof DOMHandler)) {
      throw new Error("'domHandler' must be an instance of DOMHandler");
    }
    if (!(ballHandler instanceof BallHandler)) {
      throw new Error("'ballHandler' must bee an instance od BallHandler");
    }
    if (!(paddleHandler instanceof PaddleHandler)) {
      throw new Error("'paddleHandler' must bee an instance od PaddleHandler");
    }
    if (!(brickHandler instanceof BrickHandler)) {
      throw new Error("'brickHandler' must bee an instance od BrickHandler");
    }
    if (!(boundingBox instanceof BoundingBox)) {
      throw new Error("'boundingBox' must be an instance of BoundingBox");
    }
    if (!(physics instanceof Physics)) {
      throw new Error("'physics' must be an instance of Physics");
    }

    this.boundingBox = boundingBox;
    this.physics = physics;

    this.scoreManager = scorehandler;
    this.domManager = domHandler;
    this.ballHandler = ballHandler;
    this.paddleHandler = paddleHandler;

    this.name = name || random(10); // more than one game can exist

    this.paddleHandler();
    this.ballHandler();

    this.domManager.addDiv(
      `Game ${this.name} score`,
      this.scoreManager.currentScore()
    );
    this.domManager.addDiv(
      `Game ${this.name} highscore`,
      this.scoreManager.currentHighscore()
    );
  }

  nextFrame() {
    this.ballHandler.nextFrame();
    this.paddleHandler.nextFrame();
    this.brickHandler.nextFrame();

    this.domManager.updateScoreDisplay(
      this.name,
      this.scoreManager.currentScore(),
      this.scoreManager.currentHighscore()
    );
  }

  receiveBall(pos) {
    if (this.#contains(pos)) this.ballHandler.addNewBall();
  }

  //#private

  //conditional

  #contains(pos) {
    return (
      pos.x > this.boundingBox.minX &&
      pos.x < this.boundingBox.maxX &&
      pos.y > this.boundingBox.minY &&
      pos.y < this.boundingBox.maxY
    );
  }
}
