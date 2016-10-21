var core = require('../../../core');
var Sprite = core.graphics.Sprite;

/**
 * Effect Class
 */

function Effect() {
  this.sprite = new Sprite();
  this.point = this.sprite.point;
}

var method = Effect.prototype;

method.completed = function () {
  return false;
};

method.getSprite = function () {
  return this.sprite;
};

method.update = function (dt) {

};

module.exports = Effect;
