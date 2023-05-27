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
  games.push(new BounceGame({ boundingBox: { minX: 0, maxX: windowWidth, minY: 0, maxY: windowHeight } }))
  // frameRate(4)
  imageMode(CORNER)
}

function mousePressed() {
  games.forEach(g => { if (g.contains({ x: mouseX, y: mouseY })) g.addBall(g.newBall()) })
}

function draw() {
  background(Fimg)
  const g = games[0]
  g.paddles[0].x = mouseX - g.paddles[0].w / 2
  g.next()
}

