class BoundingBox {
    constructor({
        maxX = 100,
        maxY = 100,
        minX = -100,
        minY = -100,
    } = {}) {
        this.maxX = maxX
        this.maxY = maxY
        this.minX = minX
        this.minY = minY
    }
}