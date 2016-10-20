/**
 * Scene Class
 */
var method = Scene.prototype;

function Scene() {
  this.container = new Sprite();
}

method.update = function (dt) {
};

method.getSprite = function () {
  return this.container;
};

module.exports = Scene;
