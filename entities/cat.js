function Cat(x, y, size, engine) {
  this.pos = createVector(x, y);
  this.delayedPos = createVector(x, y);
  this.size = size;
  this.engine = engine;
  this.speed = 3;
  this.direction = createVector(0, 0);
  this.time = millis();

  this.draw = function() {
    fill(56, 192, 255);
    rect(this.pos.x, this.pos.y, this.size, this.size);
  }

  this.move = function() {
    if (millis() - this.time > 100) {
      this.delayedPos = this.pos.copy();
      this.time = millis();
    }
    var moveVector = this.direction.copy();
    moveVector.mult(this.speed);

    var tempPos = this.pos.copy();
    tempPos.add(moveVector);

    if (this.engine.isInside(tempPos)) {
      this.pos = tempPos;
    }
  }

  this.changeDirection = function(vector) {
    this.direction = vector;
  }

  this.eatFish = function() {
    this.speed += 1;
  }

  this.getPos = function() {
    return this.delayedPos;
  }
}
