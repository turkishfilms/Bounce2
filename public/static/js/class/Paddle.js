class Paddle {
    constructor({ w = 100, h = 10, x = 10, y = 10, color = { r: 255, g: 255, b: 255 } } = {}) {
        this.w = w
        this.h = h
        this.x = x
        this.y = y
        this.offsetW = 10
        this.offsetH = 50
        this.color = color
    }

    show(img) {
        if (img) image(GSimg, this.x, this.y + this.h / 2, this.w + this.offsetW, this.h + this.offsetH)
        else {
            fill(this.color)
            rect(this.x, this.y, this.w, this.h)
        }
    }
}