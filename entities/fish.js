function Fish(engine, size) {
  this.engine = engine;
  this.pos = createVector(random(0, width - this.engine.scl), random(0, height - this.engine.scl));
  this.size = size;

  this.getEaten = function() {
    this.pos = createVector(random(0, width - this.engine.scl), random(0, height - this.engine.scl));
  }

  this.draw = function() {
    fill(255, 252, 107);
    rect(this.pos.x, this.pos.y, this.size, this.size);
  }
}
