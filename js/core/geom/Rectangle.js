var util = require('util');
var Body = require('./Body');
var Point = require('./Point');
var Vector = require('./Vector');

/**
 * Rectangle Class
 * Parameters: Point, Vector
 */

function Rectangle(p, v) {
  Rectangle.super_.apply(this, arguments);
  if (!p) p = new Point();
  if (!v) v = new Vector();

  this.p = p;
  this.v = v;
}

//Rectangle extends Body
util.inherits(Rectangle, Body);
var method = Rectangle.prototype;

/**
 * getPoint()
 * This method should return this Rectangle's location
 */
method.getPoint = function () {
  return this.p;
};

/**
 * getBoundPoints()
 * This method should return this Rectangle's location by Point
 */
method.getBoundPoints = function () {
  var minX = this.p.x;
  var minY = this.p.y;
  var maxX = this.p.x + this.v.x;
  var maxY = this.p.y + this.v.y;
  var t;
  if (minX > maxX) {
    t = minX;
    minX = maxX;
    maxX = t;
  }

  if (minY > maxY) {
    t = minY;
    minY = maxY;
    maxY = t;
  }

  return [new Point(minX, minY), new Point(maxX, maxY)];
};

/**
 * getBounds()
 * This method should return this Rectangle's outer square boundary
 */
method.getBounds = function () {
  return this;
};

module.exports = Rectangle;

// /**
//  * getBounds()
//  * This method should return this Vector's direction from the origin
//  */
// method.getBounds = function(){
//   return new Rectangle(new Point(0, 0), new Vector(this.x, this.y));
// }

// method.crossProductLength = function(v) {
//   return this.x * v.y - this.y * v.x;
// }

// method.crossProduct = function() {
//   return new Vector(-this.y, this.x);
// }

// module.exports = Vector;
