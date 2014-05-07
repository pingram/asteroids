(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Game = Asteroids.Game = function(canvas){
    this.ctx = canvas.getContext("2d");
    this.asteroids = this.addAsteroids(10);
    this.ship = new Asteroids.Ship([(Game.DIM_X/2), (Game.DIM_Y/2)]);
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

    this.ship.draw(ctx);
  };

  Game.prototype.step = function() {
    this.move();
    this.draw();
    this.checkCollisions();
  };

  Game.prototype.move = function() {
    this.asteroids.forEach(function(asteroid) {
      asteroid.move();
    });
    this.ship.move();
  }

  Game.prototype.start = function() {
    game = this;
    game.timerID = window.setInterval(function() {
        game.step();
      }, 30
    );
  };

  Game.prototype.stop = function() {
    window.clearInterval(this.timerID);
  }
})(this);