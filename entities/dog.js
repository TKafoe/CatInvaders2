function Dog(size, engine) {
  this.pos = createVector(random(0, width - 20), random(0, height - 20));

  while (dist(this.pos.x, this.pos.y, engine.cat.pos.x, engine.cat.pos.y) < 200) {
    this.pos = createVector(random(0, width - 20), random(0, height - 20));
  }

  this.stage = 1;
  this.size = size;
  this.engine = engine;
  this.delete = false;
  this.speed = 1;
  this.time = millis();

  this.debuffs = {SLOW : { enabled : false,
                           apply : function(moveVector) {moveVector.mult(0.1)}}
          };

  this.draw = function() {
    fill(255, 58, 58);
    rect(this.pos.x, this.pos.y, this.size, this.size);
  }

  this.chase = function() {
    var catPos = this.engine.cat.getPos().copy();
    catPos.sub(this.pos);
    catPos.normalize();
    catPos.mult(this.speed);

    this.pos.add(catPos);

    if ((millis() - this.time) > 100/(this.speed) && this.engine.particlesOn) {
      this.createParticle(catPos);
    }
  }

  this.createParticle = function(catPos) {
    var pDir = catPos.copy().mult(-1).normalize();
    pDir.rotate(random(-0.5, 0.5));
    this.engine.particles.push(new Particle(this.pos.copy().add(this.size/2, this.size/2), 0.6 * this.size, pDir, this.speed));
    this.time = millis();
  }
}
