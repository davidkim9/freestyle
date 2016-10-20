var util = require("util");
var Body = require("./Body");

/**
 * Rectangle Class
 * Parameters: Point, Vector
 */
var method = Rectangle.prototype;

function Rectangle(p, v){
  Body.call(this);
  this.p = p;
  this.v = v;
}

//Rectangle extends Body
util.inherits(Rectangle, Body);

/**
 * getPoint()
 * This method should return this Rectangle's location by Rectangle
 */
method.getPoint = function(){
  return this.p;
}

/**
 * getBounds()
 * This method should return this Rectangle's outer square boundary
 */
method.getBounds = function(){
  return this;
}

module.exports = Rectangle;