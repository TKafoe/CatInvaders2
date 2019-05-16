
function setup() {
  createCanvas(1080, 720);
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
