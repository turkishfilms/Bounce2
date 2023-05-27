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
        // rect(this.x + 29, this.y - 29, this.w - 29, this.h + 29)
        // paddle.y -this.r
        // paddle.y + paddle.h + this.r
        // paddle.x + this.r
        // paddle.x + paddle.w - this.r
        rect(this.x, this.y, this.w, this.h)
        // ellipse(this.x,this.y,this.h)
    }

    showImg() {
        image(GSimg, this.x-this.w/2, this.y+this.h/2, this.w + this.offsetW, this.h + this.offsetH)
    }
}