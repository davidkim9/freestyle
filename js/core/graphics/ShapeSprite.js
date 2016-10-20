var util = require('util');
var Sprite = require('./Sprite');
var geom = require('../geom');

/**
 * ShapeSprite Class
 */
function ShapeSprite(body, strokeStyle, fillStyle, lineWidth) {
  ShapeSprite.super_.apply(this, arguments);
  this.body = body;
  this.strokeStyle = strokeStyle;// ? strokeStyle : '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
  this.fillStyle = fillStyle ? fillStyle : '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
  this.lineWidth = lineWidth ? lineWidth : 1;
  this.origin = new geom.Point();
}

//ShapeSprite extends Sprite
util.inherits(ShapeSprite, Sprite);
var method = ShapeSprite.prototype;

method.render = function (context) {
  context.beginPath();

  if (this.body instanceof geom.Point || this.body instanceof geom.Vector) {
    context.arc(this.body.x - this.origin.x, this.body.y - this.origin.y, 1, 0, 2 * Math.PI);
  }else if (this.body instanceof geom.Rectangle) {
    context.rect(this.body.p.x - this.origin.x, this.body.p.y - this.origin.y, this.body.v.x, this.body.v.y);
  }else if (this.body instanceof geom.Circle) {
    context.arc(this.body.p.x - this.origin.x, this.body.p.y - this.origin.y, this.body.r, 0, 2 * Math.PI);
  }

  context.strokeStyle = this.strokeStyle;
  context.lineWidth = this.lineWidth;

  if (this.strokeStyle && this.lineWidth) {
    context.stroke();
  }

  context.fillStyle = this.fillStyle;

  if (this.fillStyle)
    context.fill();

  context.closePath();
};

method.getSpriteBounds = function () {
  var rect = this.body.getBounds();
  var p = rect.p.clonePoint();
  p.add(this.point);
  var v = rect.v.cloneVector();
  return new geom.Rectangle(p, v);
};

module.exports = ShapeSprite;
