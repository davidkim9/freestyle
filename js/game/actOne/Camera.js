var core = require('../../core');
var Point = core.geom.Point;

/**
 * Camera Class
 */
var method = Camera.prototype;

function Camera() {
  this.point = new Point(0, 0);
  this.zoom = 1;
}

//Camera extends Scene
var method = Camera.prototype;

module.exports = Camera;
