class Physics {
    constructor({ gravity = 0.4, airResistance = 0.9999 } = {}) {
        this.yForces = { gravity: gravity }
        this.xForces = { airResistance: airResistance }
    }
}