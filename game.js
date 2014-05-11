(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Game = Asteroids.Game = function(canvas, DIM_X, DIM_Y){
    this.ctx = canvas.getContext("2d");
    this.DIM_X = DIM_X;
    this.DIM_Y = DIM_Y;

    this.asteroids = [];
    this.addAsteroids(10);
    this.ship = new Asteroids.Ship([(this.DIM_X/2), (this.DIM_Y/2)]);
    this.bullets = [];

    this.timerID = undefined;
    this.img = new Image();
    this.img.src = 'stars-night.jpg';
  };

  Game.FPS = 30;

  Game.prototype.isOutOfBounds = function(pos) {
    return (pos[0] < 0 ||
      pos[0] > this.DIM_X ||
      pos[1] < 0 ||
      pos[1] > this.DIM_Y)
  }

  Game.prototype.checkOutOfBounds = function() {
    var game = this;
    this.asteroids.forEach( function(asteroid) {
      if (game.isOutOfBounds(asteroid.pos)) { game.removeAsteroid(asteroid) };
    });

    this.bullets.forEach( function(bullet) {
      if (game.isOutOfBounds(bullet.pos)) { game.removeBullet(bullet) };
    });
    if (game.isOutOfBounds(game.ship.pos)) {
      game.warpObject(game.ship);
    };
  };

  Game.prototype.warpObject = function (obj) {
    if (obj.pos[0] > this.DIM_X) { obj.pos[0] = this.DIM_X; }
    if (obj.pos[0] < 0) { obj.pos[0] = 0; }
    if (obj.pos[1] > this.DIM_Y) { obj.pos[1] = this.DIM_Y; }
    if (obj.pos[1] < 0) { obj.pos[1] = 0; }
    obj.pos = [this.DIM_X - obj.pos[0], this.DIM_Y - obj.pos[1]];
  }


  Game.prototype.addAsteroids = function(num){
    var asteroids = [];
    for(var i = 0; i < num; i++){
      var newAsteroid = Asteroids.Asteroid.randomAsteroid(this.DIM_X, this.DIM_Y);
      asteroids.push(newAsteroid);
    }
    this.asteroids = this.asteroids.concat(asteroids);
    return asteroids;
  };

  Game.prototype.checkCollisions = function(){
    game = this;
    this.asteroids.forEach(function(asteroid){
      if (asteroid.isCollidedWith(game.ship)) {
        alert('game over');
        game.stop();
      }
    });
  }

  Game.prototype.removeAsteroid = function(asteroidToRemove){
    this.asteroids = this.asteroids.filter(function(asteroid) {
      return (asteroid !== asteroidToRemove);
    });
  }

  Game.prototype.removeBullet = function(bulletToRemove){
    this.bullets = this.bullets.filter(function(bullet) {
      return (bullet !== bulletToRemove);
    });
  }

  Game.prototype.draw = function () {
    this.ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    game.ctx.drawImage(this.img, 0, 0);
    ctx = this.ctx;

    this.asteroids.forEach(function (asteroid) {
      asteroid.draw(ctx);
    });

    this.bullets.forEach(function (bullet) {
      bullet.draw(ctx);
    });

    this.ship.draw(ctx);
  };

  Game.prototype.step = function() {
    this.move();

    var numAsteroidsRemoved = this.removeOOBAsteroids();
    this.addAsteroids(numAsteroidsRemoved);

    this.draw();

    this.checkCollisions();
    this.checkOutOfBounds();
  };

  // returns the number of asteroids removed
  Game.prototype.removeOOBAsteroids = function() {
    var game = this;
    var prevACount = this.asteroids.length;
    this.asteroids = this.asteroids.filter(function(asteroid) {
      var x = asteroid.pos[0];
      var y = asteroid.pos[1];
      return !(x < 0 || y < 0 || x > game.DIM_X || y > game.DIM_Y);
    });
    return (prevACount - this.asteroids.length);
  };

  Game.prototype.fireBullet = function(){
    var bullet = this.ship.fireBullet(this);
    if(bullet !== false){
      this.bullets.push(bullet);
    }
  }

  Game.prototype.move = function() {
    this.asteroids.forEach(function(asteroid) {
      asteroid.move();
    });
    this.bullets.forEach(function(bullet) {
      bullet.move();
    });
    this.ship.move();
  }

  Game.prototype.start = function() {
    game = this;
    this.bindKeyHandlers();
    game.ctx.drawImage(this.img, 0, 0);

    game.timerID = window.setInterval(function() {
        game.step();
      }, 30
    );
  };

  Game.prototype.stop = function() {
    window.clearInterval(this.timerID);
  }

  Game.prototype.bindKeyHandlers = function(){
    game = this;
    mag = 3;
    key('up', function() {
      game.ship.power([0, -mag]);
    });
    key('down', function() {
      game.ship.power([0, mag]);
    });
    key('left', function() {
      game.ship.power([-mag, 0]);
    });
    key('right', function() {
      game.ship.power([mag, 0]);
    });
    key('space', function() {
      game.fireBullet();
    });
  };
})(this);









