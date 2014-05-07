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


