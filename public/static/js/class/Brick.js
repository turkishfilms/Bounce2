class Brick {
  constructor({
    pos = { x: 0, y: 0 },
    size = { width: 0, height: 0 },
    color = [255, 0, 0],
    image = [],
  } = {}) {
    this.pos = pos;
    this.size = size;
    this.color = color;
    this.image = image;
  }

  move() {
    this.pos.x += 1;
    this.pos.y += 1;
  }

  show() {
    fill(this.color);
    rect(this.pos.x, this.pos.y, this.size.width, this.size.height);
  }
}
