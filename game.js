(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Game = Asteroids.Game = function(gameUI, canvas, DIM_X, DIM_Y){
    this.gameUI = gameUI;
    this.ctx = canvas.getContext("2d");
    this.DIM_X = DIM_X;
    this.DIM_Y = DIM_Y;

    this.asteroids = [];
    this.addAsteroids(Math.floor(DIM_X * DIM_Y / 45000));
    this.ship = new Asteroids.Ship([(this.DIM_X/2), (this.DIM_Y/2)]);
    this.bullets = [];

    this.timerID = undefined;
    this.img = new Image();
    this.img.src = 'stars-night.jpg';
    this.playTime = 0;

    this.offset = 0;
  };

  Game.FPS = 30;

  Game.prototype.isOutOfBounds = function(pos) {
    return (pos[0] < 0 ||
      pos[0] > this.DIM_X ||
      pos[1] < 0 ||
      pos[1] > this.DIM_Y)
  }

  Game.prototype.checkOutOfBounds = function() {
    var game = this;
    this.asteroids.forEach( function(asteroid) {
      if (game.isOutOfBounds(asteroid.pos)) { game.removeAsteroid(asteroid) };
    });

    this.bullets.forEach( function(bullet) {
      if (game.isOutOfBounds(bullet.pos)) { game.removeBullet(bullet) };
    });
    if (game.isOutOfBounds(game.ship.pos)) {
      game.warpObject(game.ship);
    };
  };

  Game.prototype.warpObject = function (obj) {
    if (obj.pos[0] > this.DIM_X) { obj.pos[0] = this.DIM_X; }
    if (obj.pos[0] < 0) { obj.pos[0] = 0; }
    if (obj.pos[1] > this.DIM_Y) { obj.pos[1] = this.DIM_Y; }
    if (obj.pos[1] < 0) { obj.pos[1] = 0; }
    obj.pos = [this.DIM_X - obj.pos[0], this.DIM_Y - obj.pos[1]];
  }


  Game.prototype.addAsteroids = function(num){
    var asteroids = [];
    for(var i = 0; i < num; i++){
      var newAsteroid = Asteroids.Asteroid.randomAsteroid(this.DIM_X, this.DIM_Y);
      asteroids.push(newAsteroid);
    }
    this.asteroids = this.asteroids.concat(asteroids);
    return asteroids;
  };

  Game.prototype.checkCollisions = function(){
    game = this;
    this.asteroids.forEach(function(asteroid){
      if (asteroid.isCollidedWith(game.ship)) {
        game.stop();
      }
    });
  }

  Game.prototype.removeAsteroid = function(asteroidToRemove){
    this.asteroids = this.asteroids.filter(function(asteroid) {
      return (asteroid !== asteroidToRemove);
    });
  }

  Game.prototype.removeBullet = function(bulletToRemove){
    this.bullets = this.bullets.filter(function(bullet) {
      return (bullet !== bulletToRemove);
    });
  }

  Game.prototype.draw = function () {
    this.ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    game.ctx.drawImage(this.img, 0, 0, this.DIM_X, this.DIM_Y);
    ctx = this.ctx;

    this.asteroids.forEach(function (asteroid) {
      asteroid.draw(ctx);
    });

    this.bullets.forEach(function (bullet) {
      bullet.draw(ctx);
    });

    this.ship.draw(ctx);

    this.offset += 1;

    this.drawPoly(ctx, 300, 300, 20, 0, 0, false, this.offset, 0);

    // pts = drawPoly (ctx,cx,cy,60,7,false,0,n); 
    // ctx.fillStyle = 'rgba(1,1,1,1)';  
    // $.each(pts, function(i, value) { 
    // ctx.fillText(i + 1, value[0] - 2,value[1] + 2); // super basic text: .fillText("string",x,y)
    // });
    // debugger




  };

  Game.prototype.drawPoly = function (ctx,cx,cy,r,c,offset,d,a) {
    var w      = (w)? w : 1,
        c      = (c)? Math.max(3,c) : 3,  
        a      = (a)? a : 0,
        cx     = (cx)? cx : 0,
        cy     = (cy)? cy : 0,
        PI2    = Math.PI * 2,
        pts    = [],
        deg    = (d)? 0 : c / 2 * 1.5,   
        offset = (offset)? Math.round(offset) : 0, 
        x,y;
        deg += a * Math.PI / 180; 

        ctx.fillStyle = '#ccddff';
        ctx.beginPath();
        for (var i = 0; i < c; i++ ) {
          x = cx + Math.cos( ( PI2 / c ) * ( i + ( deg + offset ) ) ) * r ;
          y = cy + Math.sin( ( PI2 / c ) * ( i + ( deg + offset ) ) ) * r ; 
          if (i === 0){ ctx.moveTo(x,y); }
          else             { ctx.lineTo(x,y); }
          pts.push([x,y]);
        };
           
        ctx.lineTo(pts[0][0],pts[0][1]); // drawing final line after loop ! 
        ctx.closePath(); 


        ctx.fill();

        // c.fillStyle = '#ccddff';
// c.beginPath();
// c.moveTo(50,20);
// c.lineTo(200,50);
// c.lineTo(150,80);
// c.closePath();
// c.fill();
// c.strokeStyle = 'rgb(0,128,0)';
// c.lineWidth = 5;
// c.stroke();

    return pts; // still returning points for more fun
    }

  Game.prototype.step = function() {
    this.move();

    var numAsteroidsRemoved = this.removeOOBAsteroids();
    this.addAsteroids(numAsteroidsRemoved);

    this.draw();

    this.ctx.font = "20px Arial";
    this.playTime = Math.round(this.playTime * 100) / 100;
    // if (playTime >= 2) {
      // debugger
    // }
    var mod = Math.round((this.playTime % 4) * 100) / 100;
    if (mod < 0.03 && this.playTime !== 0) {
      this.addAsteroids(1);
    }
    // debugger
    this.ctx.fillText("Time: " + this.playTime, 20, 25);
    this.ctx.fillText("Asteroids: " + this.asteroids.length, 20, 50);

    this.checkCollisions();
    this.checkOutOfBounds();
  };

  // returns the number of asteroids removed
  Game.prototype.removeOOBAsteroids = function() {
    var game = this;
    var prevACount = this.asteroids.length;
    this.asteroids = this.asteroids.filter(function(asteroid) {
      var x = asteroid.pos[0];
      var y = asteroid.pos[1];
      return !(x < 0 || y < 0 || x > game.DIM_X || y > game.DIM_Y);
    });
    return (prevACount - this.asteroids.length);
  };

  Game.prototype.fireBullet = function(){
    var bullet = this.ship.fireBullet(this);
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
    game.ctx.drawImage(this.img, 0, 0);

    game.timerID = window.setInterval(function() {
        game.step();
        game.playTime += 0.03
      }, 30
    );
  };

  Game.prototype.stop = function() {
    this.ctx.font = "50px Arial";
    this.ctx.fillText("Game Over", this.DIM_X / 2 - 140, this.DIM_Y / 2 + 100);

    window.clearInterval(this.timerID);
    this.gameUI.stopGame();
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









