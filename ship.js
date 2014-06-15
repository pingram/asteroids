(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Ship = Asteroids.Ship = function(pos){
    Asteroids.MovingObject.call(this, pos, [0,0], Ship.RADIUS, Ship.COLOR);
    this.degrees = 0;  // 0 points up, and it is in degrees
  };

  Ship.inherits(Asteroids.MovingObject);

  Ship.RADIUS = 15;
  Ship.COLOR = 'green';

  Ship.prototype.power = function(impulse) {
    var max_vel = 5;
    // this.vel[0] += impulse[0];
    // this.vel[1] += impulse[1];

    this.vel[0] += impulse * Math.sin(this.degrees / 90 * Math.PI);
    this.vel[1] += -impulse * Math.cos(this.degrees / 90 * Math.PI);

    this.vel[0] = Math.min(this.vel[0], max_vel);
    this.vel[0] = Math.max(this.vel[0], -max_vel);
    this.vel[1] = Math.min(this.vel[1], max_vel);
    this.vel[1] = Math.max(this.vel[1], -max_vel);
  };

  Ship.prototype.turn = function (degrees) {
    this.degrees += degrees;
    
    if (this.degrees >= 180) {
      this.degrees -= 180;
    } else if (this.degrees <= -180) {
      this.degrees += 180; 
    }
  }

  Ship.prototype.fireBullet = function(game) {
    var bullet_sound = new Audio("sounds/science_fiction_laser_002.mp3");
    bullet_sound.volume = 0.2;
    bullet_sound.play();

    var ship = this;
    var bulletSpeed = 15;

    var bulletSpeedX = Math.floor(bulletSpeed * Math.sin(this.degrees / 90 * Math.PI));
    var bulletSpeedY = Math.floor(bulletSpeed * -Math.cos(this.degrees / 90 * Math.PI));
    var bulletVelocity = [bulletSpeedX, bulletSpeedY];
    return (new Asteroids.Bullet(ship.pos.slice(), bulletVelocity, game));
  }

  Ship.prototype.draw = function (ctx,cx,cy,r,c,offset,d,a) {
    a = this.degrees;
    r = Ship.RADIUS + 2;
    cx = this.pos[0];
    cy = this.pos[1];

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

        ctx.fillStyle = Ship.COLOR;
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
    }

})(this);