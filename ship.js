(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Ship = Asteroids.Ship = function(pos){
    Asteroids.MovingObject.call(this, pos, [0,0], Ship.RADIUS, Ship.COLOR);
  };

  Ship.inherits(Asteroids.MovingObject);

  Ship.RADIUS = 10;
  Ship.COLOR = 'green';

  Ship.prototype.power = function(impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  };

  Ship.prototype.fireBullet = function() {
    var ship = this;
    var bulletSpeed = 30;
    var vx = this.vel[0];
    var vy = this.vel[1];

    if (vx === 0 && vy === 0) {
      return false;
    }
    else{
      var speed = Math.sqrt(Math.pow(vx, 2) + Math.pow(vy, 2));
      var bulletSpeedX = Math.floor((vx / speed) * bulletSpeed);
      var bulletSpeedY = Math.floor((vy / speed) * bulletSpeed);
      var bulletVelocity = [bulletSpeedX, bulletSpeedY];
      return (new Asteroids.Bullet(ship.pos.slice(), bulletVelocity));
    }
  }

})(this);