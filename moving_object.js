(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var MovingObject = Asteroids.MovingObject = function (pos, vel, radius, color){
    this.pos = pos;
    this.vel = vel;
    this.radius = radius;
    this.color = color;
  };

  MovingObject.prototype.move = function(){
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
  };

  MovingObject.prototype.draw = function(ctx){
    ctx.fillStyle = this.color;
    ctx.beginPath();

    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();

//     c.fillStyle = '#ccddff';
// c.beginPath();
// c.moveTo(50,20);
// c.lineTo(200,50);
// c.lineTo(150,80);
// c.closePath();
// c.fill();
// c.strokeStyle = 'rgb(0,128,0)';
// c.lineWidth = 5;
// c.stroke();
  };

  MovingObject.prototype.isCollidedWith = function(otherObject){
    var x1 = this.pos[0];
    var y1 = this.pos[1];
    var x2 = otherObject.pos[0];
    var y2 = otherObject.pos[1];

    var center_dist = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    var radii_sum = this.radius + otherObject.radius;

    return (center_dist > radii_sum ? false : true);
  }
})(this);