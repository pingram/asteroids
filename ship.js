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
    this.vel[0] += impulse[1];
  }

})(this);