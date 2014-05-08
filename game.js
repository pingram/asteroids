(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Game = Asteroids.Game = function(canvas){
    this.ctx = canvas.getContext("2d");
    this.asteroids = this.addAsteroids(10);
    this.ship = new Asteroids.Ship([(Game.DIM_X/2), (Game.DIM_Y/2)]);
    this.bullets = [];
    this.timerID = undefined;
  };

  Game.DIM_X = 800;
  Game.DIM_Y = 800;
  Game.FPS = 30;

  Game.prototype.addAsteroids = function(num){
    var asteroids = [];
    for(var i = 0; i < num; i++){
      var newAsteroid = Asteroids.Asteroid.randomAsteroid(Game.DIM_X, Game.DIM_Y);
      asteroids.push(newAsteroid);
    }
    return asteroids;
  };

  Game.prototype.checkCollisions = function(){
    that = this;
    this.asteroids.forEach(function(asteroid){
      if (asteroid.isCollidedWith(that.ship)) {
        alert('game over');
        that.stop();
      }
    });
  }

  Game.prototype.draw = function () {
    this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
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
    this.removeOOBAsteroids();
    this.draw();
    this.checkCollisions();
  };

  Game.prototype.removeOOBAsteroids = function() {
    this.asteroids = this.asteroids.filter(function(asteroid) {
      var x = asteroid.pos[0];
      var y = asteroid.pos[1];
      return !(x < 0 || y < 0 || x > Game.DIM_X || y > Game.DIM_Y);
    });
  };

  Game.prototype.fireBullet = function(){
    var bullet = this.ship.fireBullet();
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









