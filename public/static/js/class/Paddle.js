class Paddle {
  constructor({
    size = { width: 100, height: 10 },
    position = { x: 10, y: 10 },
    color = { r: 255, g: 255, b: 255 },
  } = {}) {
    this.position = position;
    this.size = size;
    this.offsetW = 10;
    this.offsetH = 50;
    this.color = color;
    this.image = image;
  }

  show() {
    image(
      image,
      this.position.x,
      this.position.y + this.size.height / 2,
      this.size.width + this.offsetW,
      this.size.height + this.offsetH
    );
  }
}
