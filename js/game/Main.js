var loadAssets = require('./assets.json');
var Game = require('./Game');

/**
 * Main Class
 */

function Main() {
}

var method = Main.prototype;

method.init = function (stage, loader) {
  //Called when core is ready
  this.stage = stage;
  this.loader = loader;
  window.stage = this.stage;

  var _this = this;
  loader.load(loadAssets, function (err, loaded) {
    _this.assets = loaded;
    _this.loaded = true;
    _this.onLoad();
  });
};

method.onLoad = function () {
  this.game = new Game(this.stage, this.loader);
  window.game = this.game;
};

method.update = function (dt) {
  if (this.loaded && this.game.isActive()) {
    this.game.update(dt);
  }
};

module.exports = Main;
