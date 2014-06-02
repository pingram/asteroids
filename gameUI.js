(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var GameUI = Asteroids.GameUI = function () {
    this.setUpDisplay();
    this.showDialog();
    this.installClickHandlers();
    // this.startGame();
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
      gameUI.hideDialog();
      gameUI.startGame();
      $('canvas').css({cursor: 'none'});
    });
    $('body').on('click', '#dialog #exit', function () {
      gameUI.hideDialog();
      gameUI.startGame();
      $('canvas').css({cursor: 'none'});
    });
  }

  GameUI.prototype.startGame = function () {
    new Asteroids.Game(this, this.$canvas[0], this.width, this.height).start();
  }

  GameUI.prototype.stopGame = function () {
    $('canvas').css({cursor: 'auto'});
    this.showDialog();
  }
})(this);