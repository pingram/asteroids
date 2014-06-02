(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var GameUI = Asteroids.GameUI = function () {
    this.$canvas = $('<canvas>');
    this.width = window.innerWidth - 8;
    this.height = window.innerHeight - 8;
    this.setUpDisplay();
  }

  GameUI.prototype.setUpDisplay = function () {
    this.$canvas.attr('height', this.height)
    this.$canvas.attr('width', this.width);
    $('body').append(this.$canvas);
  }

  GameUI.prototype.showDialog = function () {

  }

  GameUI.prototype.startGame = function () {
    new Asteroids.Game($canvas[0], width, height).start();
  }
})(this);