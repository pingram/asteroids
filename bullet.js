(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Bullet = Asteroids.Bullet = function(pos, vel, game){
    Asteroids.MovingObject.call(this, pos, vel, Bullet.RADIUS, Bullet.COLOR);
    this.game = game;
  };

  Bullet.inherits(Asteroids.MovingObject);

  Bullet.RADIUS = 4;
  Bullet.COLOR = 'red';

  Bullet.prototype.hitAsteroids = function() {
    var bullet = this;
    var game = this.game;
    debugger
    game.asteroids.forEach(function(asteroid){
      if (asteroid.isCollidedWith(bullet)) {
        game.removeAsteroid(asteroid);
        game.removeBullet(bullet);
      };
    });
  }

  Bullet.prototype.move = function(){
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    this.hitAsteroids();
  };

})(this);