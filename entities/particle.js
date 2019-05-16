function Particle(pos, size, direction, speed) {
  this.lifespan = 2000;
  this.opacity = 1;
  this.direction = direction;
  this.speed = speed;
  this.time = millis();

  this.pos = pos;
  this.size = size;
  this.dead = false;

  this.draw = function() {
    noStroke();
    fill(255, 255, 204, this.opacity * 255);
    circle(this.pos.x, this.pos.y, this.size);
  }

  this.update = function() {
    if (millis() - this.time > this.lifespan) {
      this.dead = true;
    }

    this.opacity = (this.lifespan - (millis() - this.time)) / this.lifespan;
    var dir = this.direction.copy().mult(this.speed * this.opacity);
    this.pos.add(dir);
  }
}
