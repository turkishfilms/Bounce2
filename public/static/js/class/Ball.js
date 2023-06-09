class Ball {
  constructor({
    boundingBox = new BoundingBox(),
    scoreManager = new ScoreManager(),
    physics = new Physics(),
    paddles = [],
    x = boundingBox.maxX / 2,
    y = boundingBox.maxY / 2,
    r = 0.04 * boundingBox.maxX,
    xSpeed = 5,
    ySpeed = 5,
    minYSpeed = -5,
    maxYSpeed = -20,
    minXSpeed = -boundingBox.maxX / 40,
    maxXSpeed = boundingBox.maxX / 40,
    color = { r: 255, g: 255, b: 255 },
  } = {}) {
    if (!(boundingBox instanceof BoundingBox)) {
      throw new Error("'boundingBox' must be an instance of BoundingBox");
    }
    if (!(physics instanceof Physics)) {
      throw new Error("'physics' must be an instance of Physics");
    }
    if (!(scoreManager instanceof ScoreManager2)) {
      throw new Error("'scoreManager' must be an instance of ScoreManager");
    }

    this.boundingBox = boundingBox;
    this.physics = physics;
    this.scoreManager = scoreManager;

    this.x = x;
    this.y = y;
    this.r = r;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.paddles = paddles;
    this.bricks = bricks;
    this.minYSpeed = minYSpeed;
    this.maxYSpeed = maxYSpeed;
    this.minXSpeed = minXSpeed;
    this.maxXSpeed = maxXSpeed;
    this.color = color;
  }

  move(paddleIndex) {
    this.#experienceForce();
    this.#updatePos();

    if (this.#isCollideWall()) this.#reverseXSpeed();

    if (this.#isCollidePaddle(this.paddles[paddleIndex])) {
      this.#setYSpeed(this.#bounceYSpeed());
      this.#setXSpeed(this.#bounceXSpeed());
      this.scoreManager.incrementScore();
    }
  }

  move2(paddle) {
    this.#experienceForce();
    this.#updatePos();

    if (this.#isCollideWall()) this.#reverseXSpeed();

    if (this.#isCollidePaddle2(paddle)) {
      this.#setYSpeed(this.#bounceYSpeed());
      this.#setXSpeed(this.#bounceXSpeed());
      this.scoreManager.incrementScore();
    }
  }

  show() {
    image(this.img, this.x, this.y, 2 * this.r, 2 * this.r);
  }

  isBallOffScreen() {
    return this.y >= this.boundingBox.maxY;
  }

  //#private

  #experienceForce() {
    const forces = this.physics;
    for (let force in forces.yForces) this.ySpeed += forces.yForces[force];
    for (let [type, Force] of Object.entries(forces.xForces))
      this.xSpeed *= Force;
  }

  #updatePos() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }

  #reverseXSpeed() {
    this.xSpeed *= -1;
  }

  #bounceXSpeed() {
    const randomXSpeedForce = random(
      -this.boundingBox.maxX / 20,
      this.boundingBox.maxX / 20
    );

    return min(
      max(this.xSpeed + randomXSpeedForce, this.minXSpeed),
      this.maxXSpeed
    );
  }

  #bounceYSpeed() {
    return random(this.maxYSpeed, this.minYSpeed);
  }

  #setXSpeed(speed) {
    this.xSpeed = speed;
  }

  #setYSpeed(speed) {
    this.ySpeed = speed;
  }

  //conditionals

  #isCollideWall() {
    return (
      this.x + this.r >= this.boundingBox.maxX ||
      this.x - this.r <= this.boundingBox.minX
    );
  }

  #isCollidePaddle(paddle) {
    return (
      this.y >= paddle.y &&
      this.y <= paddle.y + paddle.h &&
      this.x >= paddle.x &&
      this.x <= paddle.x + paddle.w
    );
  }

  #isCollidePaddle2(paddle) {
    return (
      this.y >= paddle.position.y &&
      this.y <= paddle.position.y + paddle.size.height &&
      this.x >= paddle.position.x &&
      this.x <= paddle.position.x + paddle.size.weight
    );
  }

  #isCollideBrick(brick) {
    return (
      this.y >= brick.position.y &&
      this.y <= brick.position.y + brick.size.height &&
      this.x >= brick.position.x &&
      this.x <= brick.position.x + brick.size.weight
    );
  }
}
