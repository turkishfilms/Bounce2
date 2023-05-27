// 
// 
// 
// 
let balls = [],
  gravity = 0.4,
  ball, points, highscore,
  boardX, boardW, boardH, boardY,
  Fimg, CJimg, GSimg

function preload() {
  Fimg = loadImage('FN.png')
  CJimg = loadImage('chug-jug.png')
  GSimg = loadImage('GoldenScar.png')
}

function setup() {
  // createCanvas(500, 700)
  createCanvas(windowWidth, windowHeight)
  boardX = width / 2
  boardW = width / 7;
  boardH = boardW / 5
  boardY = (0.95 * height) - boardH
  points = 0;
  highscore = 0
  ball = new Ball(random(-5, 5), random(-5, 0))
  balls.push(ball)
  p = document.getElementById('p')
  hs = document.getElementById('hs')
}

function mousePressed() {
  balls.push(new Ball(random(-5, 5), random(-5, 0)))
}
function draw() {
  imageMode(CORNER)
  background(Fimg);
  boardX = mouseX
  
  imageMode(CENTER)
  image(GSimg, boardX, boardY, boardW + 10, boardH + 50)
let bl = balls.length
  for (let i = 0; i < bl; i++) {
    if (bl > 0) {
      balls[i].show()
      balls[i].move()
      if (balls[i].y >= height) {
        balls.splice(i, 1)
        points = 0
      }
    }
  }
  p.innerHTML = `Points: ${points}`
  hs.innerHTML = `Highscore: ${highscore}`
}

class Ball {
  constructor(xspeed, yspeed) {
    this.x = width / 2
    this.y = height / 2
    this.xspeed = xspeed
    this.yspeed = yspeed
    this.r = 0.04 * width;
  }

  show() {
    //  fill(200,50,100)
    //   ellipse(this.x, this.y, this.r);
    imageMode(CENTER)
    image(CJimg, this.x, this.y, 2 * this.r, 2 * this.r)
  }

  move() {
    if (this.x > width - this.r || this.x < this.r) {
      this.xspeed *= -1
      this.x = this.x > width - this.r ? width - this.r : this.r
    }
    this.x += this.xspeed
    if (this.y >= height - (height - boardY) - this.r &&
      (this.x > boardX - boardW / 2 && this.x < boardX + boardW / 2)) {
      this.yspeed = random(-height / 40, -height / 100)
      this.xspeed = constrain(this.xspeed + random(-width / 20, -width / 20), -width / 40, width / 40)
      points += 1
      if (points > highscore) highscore = points
    }
    this.yspeed += gravity
    this.y += this.yspeed
  }
}