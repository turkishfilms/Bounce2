class BrickHandler {
  constructor({
    bricks = [],
    boundingBox = new BoundingBox(),
    color = [0, 0, 255],
    image = [],
  } = {}) {
    this.bricks = bricks;
    this.boundingBox = boundingBox;
    this.image = image;
    this.color = color;

  }

  #addBrick(brick) {
    if (!brick instanceof Brick) {
      throw new Error("'brick' must be an instance of Brick");
    }
    // check if brick is in bounding box

    this.bricks.push(brick);
  }

  setupNextLevel(level){
    removeAllBricks()
    addNewBricks(level)
  }

  show() {
    fill(this.color)
    rect(this.pos.x, this.pos.y, this.size.width, this.size.height);
  }
  get brickList() {
    return this.bricks;
  }
}
