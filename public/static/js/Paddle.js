class Paddle {
    constructor({ w = 100, h = 10, x = 10, y = 10 } = {}) {
        this.w = w
        this.h = h
        this.x = x
        this.y = y
        this.offsetW = 10
        this.offsetH = 50
    }

    move() {

    }

    show() {
        imageMode(CENTER)
        image(GSimg, this.x, this.y, this.w + this.offsetW, this.h + this.offsetH)
    }
}