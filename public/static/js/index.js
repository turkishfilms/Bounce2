// 
const games = []
let Fimg, CJimg, GSimg

function preload() {
  Fimg = loadImage('resources/FN.png')
  CJimg = loadImage('resources/chug-jug.png')
  GSimg = loadImage('resources/GoldenScar.png')
}

function setup() {
  createCanvas(windowWidth, windowHeight)

  games.push(new BounceGame({
    boundingBox: {
      minX: 0,
      maxX: windowWidth,
      minY: 0,
      maxY: windowHeight
    }
  }))

  imageMode(CORNER)
}

function mousePressed() {
  games.forEach(g => g.receiveBall({ x: mouseX, y: mouseY }))
}

function draw() {
  background(Fimg)
  games.forEach(g => g.next())
}