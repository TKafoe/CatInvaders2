function Engine(currentBest) {
    this.running = true;
    this.particlesOn = false;
    this.time = millis();
    this.scoreTimer = millis();
    this.score = 0;
    this.currentBest = currentBest;
    this.scl = 20;
    this.cat = new Cat(width/2, height/2, this.scl, this);
    this.fish = new Fish(this, 10);

    this.dogs = []
    this.dogDebug = 0;

    this.particles = [];

    this.draw = function() {
      this.drawScore();
      this.cat.draw();
      this.fish.draw();

      noStroke();
      for (var i = 0; i < this.particles.length; i++) {
        this.particles[i].draw();
      }
      stroke(0);

      for (var i = 0; i < this.dogs.length; i++) {
        this.dogs[i].draw();
      }
    }

    this.drawScore = function() {
      if (millis() - this.scoreTimer > 10) {
        this.score++;
        this.scoreTimer = millis();
      }

      textSize(16);
      fill(255);
      text("Score: " + this.score, 30, 30);

      textSize(16);
      fill(255);
      text("Current best: " + this.currentBest, 30, 30 + 20);
    }

    this.update = function() {
      var elapsed = millis() - this.time;
      if (elapsed > 2000) {
        this.time = millis();
        this.dogs.push(new Dog(this.scl, this));
      }

      this.checkCatEatFish();
      this.checkCatCollision();
      this.checkDogMorph();
      this.updateLocations();
    }

    this.updateLocations = function() {
      this.cat.move();

      for (var i = 0; i < this.dogs.length; i++) {
        this.dogs[i].chase();
      }

      var newparticles = [];
      for (var i = 0; i < this.particles.length; i++) {
        if (!this.particles[i].dead) {
          this.particles[i].update();
          newparticles.push(this.particles[i]);
        }
      }

      this.particles = newparticles;
    }

    this.processKey = function(keyCode) {
      switch(keyCode) {
        case UP_ARROW:
          this.cat.changeDirection(createVector(0, -1));
          break;
        case DOWN_ARROW:
          this.cat.changeDirection(createVector(0, 1));
          break;
        case LEFT_ARROW:
          this.cat.changeDirection(createVector(-1, 0));
          break;
        case RIGHT_ARROW:
          this.cat.changeDirection(createVector(1, 0));
          break;
        case ENTER:
          console.log("WORKS");
          this.debugToggleSlow();
          break;

        default:
          break;
      }
    }

    this.isInside = function(vector) {
      return (vector.x < width - this.scl && vector.x >= 0) &&
             (vector.y < height - this.scl && vector.y >= 0);
    }

    this.checkCatEatFish = function() {
      var l1 = this.fish.pos.copy();
      var r1 = l1.copy().add(this.fish.size, this.fish.size);
      var l2 = this.cat.pos.copy();
      var r2 = l2.copy().add(this.cat.size, this.cat.size);

      if (rectangleOverlap(r1, l1, r2, l2)) {
        this.cat.eatFish();
        this.fish.getEaten();
      }
    }

    this.checkCatCollision = function() {
      var l2 = this.cat.pos.copy();
      var r2 = l2.copy().add(this.cat.size, this.cat.size);
      for (var i = 0; i < this.dogs.length; i++) {
        var l1 = this.dogs[i].pos.copy();
        var r1 = l1.copy().add(this.dogs[i].size, this.dogs[i].size);

        if (rectangleOverlap(r1, l1, r2, l2)) {
          this.running = false;
        }
      }
    }

    this.checkDogMorph = function() {
      for (var i = 0; i < this.dogs.length; i++) {
        for (var j = 0; j < this.dogs.length; j++) {
          if (i == j || this.dogs[i].delete || this.dogs[j].delete) {
            continue;
          }

          var l1 = this.dogs[i].pos.copy();
          var l2 = this.dogs[j].pos.copy();
          var r1 = l1.copy().add(this.dogs[i].size, this.dogs[i].size);
          var r2 = l2.copy().add(this.dogs[j].size, this.dogs[j].size);
          var bool = rectangleOverlap(r1, l1, r2, l2);
          if (bool && this.dogs[i].size == this.dogs[j].size) {
            this.dogs[j].delete = true;
            this.dogs[i].size += 5;
            this.dogs[i].speed += 0.1 * pow(this.dogs[i].stage, 2);
            this.dogs[i].stage++;
          }
        }
      }

      var dogsTemp = []
      for (var i = 0; i < this.dogs.length; i++) {
        if (this.dogs[i].delete) {
          continue;
        }
        dogsTemp.push(this.dogs[i]);
      }

      this.dogs = dogsTemp;
    }

    this.debugToggleSlow = function() {
      for (var i = 0; i < this.dogs.length; i++) {
        this.dogs[i].debuffs.SLOW.enabled = true;
      }
    }
}
