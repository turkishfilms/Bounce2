class PaddleHandler {
  #paddles;
  constructor({ paddles = [], boundingBox = new BoundingBox(), image } = {}) {
    this.#paddles = paddles;
    this.boundingBox = boundingBox;
    this.image = image;

    this.#addPaddle.push(this.#newPaddle());
  }

  #addPaddle(newPaddle) {
    this.paddles.push(newPaddle);
  }

  #newPaddle() {
    const x = this.boundingBox.maxX / 2;
    const w = this.boundingBox.maxX / 4;
    const h = w / 4;
    const y = 0.9 * this.boundingBox.maxY - h;
    return new Paddle({
      position: { x: x, y: y },
      size: { width: w, height: h },
      image: this.image,
    });
  }

  nextframe() {
    this.paddles.forEach((p) => {
      p.position.x = mouseX - p.size.width / 2;
      p.show();
    });
  }
}
