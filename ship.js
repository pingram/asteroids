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
  }

  Ship.prototype.fireBullet = function(game) {
    var ship = this;
    var bulletSpeed = 30;
    // var vx = this.vel[0];
    // var vy = this.vel[1];

    // if (vx === 0 && vy === 0) {
    //   return false;
    // }
    // else{
      // var speed = Math.sqrt(Math.pow(vx, 2) + Math.pow(vy, 2));
      // var bulletSpeedX = Math.floor((vx / speed) * bulletSpeed);
      var bulletSpeedX = Math.floor(bulletSpeed * Math.sin(this.degrees / 90 * Math.PI));
      // var bulletSpeedY = Math.floor((vy / speed) * bulletSpeed);
      var bulletSpeedY = Math.floor(bulletSpeed * -Math.cos(this.degrees / 90 * Math.PI));
      var bulletVelocity = [bulletSpeedX, bulletSpeedY];
      return (new Asteroids.Bullet(ship.pos.slice(), bulletVelocity, game));
    // }
  }

  Ship.prototype.draw = function (ctx,cx,cy,r,c,offset,d,a) {
    // debugger
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