var util = require('util');
var Body = require('./Body');

var Rectangle;
var Vector;

/**
 * Point Class
 */
function Point(x, y) {
  Body.call(this);
  if (!x) x = 0;
  if (!y) y = 0;

  this.x = x;
  this.y = y;

  // These must be loaded here because of a circular dependency
  Vector = Vector ? Vector : require('./Vector');
  Rectangle = Rectangle ? Rectangle : require('./Rectangle');
}

//Point extends Body
util.inherits(Point, Body);
var method = Point.prototype;

/**
 * getPoint()
 * This method should return this Point's location by point
 */
method.getPoint = function () {
  return this;
};

/**
 * getBounds()
 * This method should return this Point's outer square boundary
 */
method.getBounds = function () {
  return new Rectangle(new Point(this.x, this.y), new Vector(0, 0));
};

method.getBoundPoints = function () {
  return [new Point(this.x, this.y), new Point(this.x, this.y)];
};

method.add = function (p) {
  this.x += p.x;
  this.y += p.y;
};

method.subtract = function (p) {
  this.x -= p.x;
  this.y -= p.y;
};

method.scalar = function (n) {
  this.x *= n;
  this.y *= n;
};

method.multiply = function (p) {
  this.x *= p.x;
  this.y *= p.y;
};

method.dot = function (v) {
  return this.x * v.x + this.y * v.y;
};

method.distanceSquared = function (p) {
  return Math.pow(p.x - this.x, 2) + Math.pow(p.y - this.y, 2);
};

method.distance = function (p) {
  return Math.sqrt(Math.pow(p.x - this.x, 2) + Math.pow(p.y - this.y, 2));
};

method.magnitudeSquared = function () {
  return this.x * this.x + this.y * this.y;
};

method.magnitude = function () {
  return Math.sqrt(this.x * this.x + this.y * this.y);
};

method.normalize = function () {
  var l = this.magnitude();
  this.x = this.x / l;
  this.y = this.y / l;
};

method.clonePoint = function ()
{
  return new Point(this.x, this.y);
};

method.cloneVector = function ()
{
  var Vector = require('./Vector');
  return new Vector(this.x, this.y);
};

module.exports = Point;
