(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Ship = Asteroids.Ship = function(pos){
    Asteroids.MovingObject.call(this, pos, [0,0], Ship.RADIUS, Ship.COLOR);
  };

  Ship.inherits(Asteroids.MovingObject);

  Ship.RADIUS = 15;
  Ship.COLOR = 'green';

  Ship.prototype.power = function(impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  };

  Ship.prototype.fireBullet = function(game) {
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
      return (new Asteroids.Bullet(ship.pos.slice(), bulletVelocity, game));
    }
  }

  Ship.prototype.draw = function (ctx,cx,cy,r,c,offset,d,a) {
    // debugger
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