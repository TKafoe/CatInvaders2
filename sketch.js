
function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = new Engine(0);
}

function draw() {
  if (engine.running) {
    engine.update();
    background(100);
    engine.draw();
  } else {
    engine = new Engine(engine.score);
  }
}

function keyPressed() {
  engine.processKey(keyCode);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
