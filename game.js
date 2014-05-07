(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Game = Asteroids.Game = function(canvas){
    this.ctx = canvas.getContext("2d");
    this.asteroids = this.addAsteroids(10)
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

  Game.prototype.draw = function () {
    this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx = this.ctx;

    this.asteroids.forEach(function (asteroid) {
      asteroid.draw(ctx);
    });
  };

  Game.prototype.step = function() {
    this.asteroids.forEach(function(asteroid) {
      asteroid.move();
    });
    this.draw();
  };

  Game.prototype.start = function() {
    game = this;
    window.setInterval(function() {
        game.step();
      }, 30
    );
  };
})(this);