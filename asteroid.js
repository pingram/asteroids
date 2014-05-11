(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Asteroid = Asteroids.Asteroid = function (pos, vel){
    var radius = Math.floor(Math.random() * (Asteroid.RADIUS - 10)) + 10;
    Asteroids.MovingObject.call(this, pos, vel, radius, Asteroid.COLOR)
  };

  Asteroid.RADIUS = 25;
  Asteroid.COLOR = '#888888';
  Asteroid.MAXVEL = 7;

  Asteroid.inherits(Asteroids.MovingObject);

  Asteroid.randomAsteroid = function(DIM_X, DIM_Y) {
    var pos = [];
    pos[0] = Math.floor(Math.random() * DIM_X);
    pos[1] = Math.floor(Math.random() * DIM_Y);
    var whichIndex = Math.floor(Math.random() * 2);
    var whichVal = Math.floor(Math.random() * 2);
    if (whichVal === 0) {
      pos[whichIndex] = 0;
    } else {
      pos[whichIndex] = DIM_X;
    }
    pos = Asteroid.randomPos(DIM_X, DIM_Y);
    var vel = ensureVelOffWall(pos, Asteroid.MAXVEL);
    return (new Asteroid(pos, vel));
  }

  Asteroid.randomPos = function(DIM_X, DIM_Y) {
    var pos = []
    pos[0] = Math.floor(Math.random() * DIM_X);
    pos[1] = Math.floor(Math.random() * DIM_Y);
    randn = Math.floor(Math.random() * 4);
    switch (randn) {
      case 0:
        pos[0] = 0;
        break;
      case 1:
        pos[1] = 0;
        break;
      case 2:
        pos[0] = DIM_X;
        break;
      case 3:
        pos[1] = DIM_Y;
        break;
    }
    return pos;
  }

  function randomVec(maxVel){
    var vel = [0, 0];
    while (vel[0] < 2 && vel[1] < 2) {
      vel[0] = randomVelScalar(maxVel);
      vel[1] = randomVelScalar(maxVel);
    }
    return vel;
  }

  function randomVelScalar(maxVel) {
    return (Math.floor(Math.random() * (maxVel * 2)) - maxVel);
  }

  function ensureVelOffWall(pos, maxVel, DIM_X, DIM_Y) {
    var velIntoWall = true;
    var vel = [];
    while (velIntoWall) {
      velIntoWall = false;
      vel = randomVec(maxVel);
      if ((pos[0] === 0 && vel[0] < 0) ||
          (pos[0] === DIM_X && vel[0] > 0) ||
          (pos[1] === 0 && vel[1] < 0) ||
          (pos[1] === DIM_X && vel[0] > 0)) {
        velIntoWall = true;
      }
    }
    return vel;
  }
})(this);