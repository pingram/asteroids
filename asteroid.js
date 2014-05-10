(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Asteroid = Asteroids.Asteroid = function (pos, vel){
    var radius = Math.floor(Math.random() * (Asteroid.RADIUS - 10)) + 10;
    Asteroids.MovingObject.call(this, pos, vel, radius, Asteroid.COLOR)
  };

  Asteroid.RADIUS = 25;
  Asteroid.COLOR = '#888888';
  Asteroid.MAXVEL = 8;

  Asteroid.inherits(Asteroids.MovingObject);

  Asteroid.randomAsteroid = function(dimX, dimY) {
    var pos = [];
    pos[0] = Math.floor(Math.random() * dimX);
    pos[1] = Math.floor(Math.random() * dimY);
    var whichIndex = Math.floor(Math.random() * 2);
    var whichVal = Math.floor(Math.random() * 2);
    if (whichVal === 0) {
      pos[whichIndex] = 0;
    } else {
      pos[whichIndex] = Asteroids.Game.DIM_X;
    }
    var vel = randomVec(Asteroid.MAXVEL);
    return (new Asteroid(pos, vel));
  }

  function randomVec(maxVel){
    var vec = [];
    vec[0] = Math.floor(Math.random() * (maxVel - 2)) + 2;
    vec[1] = Math.floor(Math.random() * (maxVel - 2)) + 2;
    return vec;
  }
})(this);


