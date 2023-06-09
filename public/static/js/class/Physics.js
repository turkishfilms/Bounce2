class Physics {
  constructor({
    yForces = { gravity: 0.4 },
    xForces = { airResistance: 0.9999 },
    collidables = {
        
    }
  } = {}) {
    this.yForces = yForces;
    this.xForces = xForces;
  }
}
