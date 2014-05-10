(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Asteroid = Asteroids.Asteroid = function (pos, vel){
    Asteroids.MovingObject.call(this, pos, vel, Asteroid.RADIUS, Asteroid.COLOR)
  };

  Asteroid.RADIUS = 15;
  Asteroid.COLOR = 'black';

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
    var vel = randomVec(10);
    return (new Asteroid(pos, vel));
  }

  function randomVec(maxVel){
    var vec = [];
    vec[0] = Math.floor(Math.random() * maxVel);
    vec[1] = Math.floor(Math.random() * maxVel);
    return vec;
  }
})(this);


