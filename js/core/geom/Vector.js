var util = require('util');
var Point = require('./Point');
var Rectangle = require('./Rectangle');

/**
 * Vector Class
 */
function Vector(x, y) {
  Vector.super_.apply(this, arguments);
}

//Vector extends Point
util.inherits(Vector, Point);
var method = Vector.prototype;

/**
 * getBounds()
 * This method should return this Vector's direction from the origin
 */
method.getBounds = function () {
  return new Rectangle(new Point(0, 0), new Vector(this.x, this.y));
};

method.crossProductLength = function (v) {
  return this.x * v.y - this.y * v.x;
};

method.crossProduct = function () {
  return new Vector(-this.y, this.x);
};

module.exports = Vector;
