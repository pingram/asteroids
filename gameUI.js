(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var GameUI = Asteroids.GameUI = function () {
    this.setUpDisplay();
    this.showDialog();
    this.installClickHandlers();
    this.addKeyBindings();
  }

  GameUI.prototype.setUpDisplay = function () {
    this.$canvas = $('<canvas>');
    this.width = window.innerWidth - 8;
    this.height = window.innerHeight - 8;

    this.$canvas.attr('height', this.height)
    this.$canvas.attr('width', this.width);
    $('body').append(this.$canvas);
  }

  GameUI.prototype.showDialog = function () {
    $('body').find('#dialog').show();
  }

  GameUI.prototype.hideDialog = function () {
    $('body').find('#dialog').hide();
  }

  GameUI.prototype.installClickHandlers = function () {
    var gameUI = this;
    $('body').on('click', '#dialog #play', function () {
      gameUI.startGame();
    });
  }

  GameUI.prototype.startGame = function () {
    var sound = new Audio("sounds/strong.mp3");
    sound.play();

    this.hideDialog();
    this.$canvas.removeClass('over');
    $('canvas').css({cursor: 'none'});
    this.removeKeyBindings();
    new Asteroids.Game(this, this.$canvas[0], this.width, this.height).start();
  }

  GameUI.prototype.removeKeyBindings = function () {
    key.unbind('p');
    key.unbind('e');
  }

  GameUI.prototype.addKeyBindings = function () {
    var gameUI = this;
    key('p', function () { gameUI.startGame(); });
    key('e', function () { window.location.href = 'http://pingram.co/'; });
  }

  GameUI.prototype.stopGame = function () {
    var sound = new Audio("sounds/Chewbacca Wookie Noise-SoundBible.com-1201859158.mp3");
    sound.play();

    $('canvas').addClass('over');
    $('canvas').css({cursor: 'auto'});
    this.showDialog();
    this.addKeyBindings();
  }
})(this);