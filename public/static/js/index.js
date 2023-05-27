// 
// 
// 
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
  games.push(new BounceGame({boundingBox:{minX:0,maxX:windowWidth,minY:0,maxY:windowHeight}}))
}

function mousePressed() {
  games[0].addBall(newBall())
}

function draw() {
  imageMode(CORNER)
  background(Fimg)
  games[0].paddles[0].x = mouseX
}

