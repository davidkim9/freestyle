var util = require('util');

var core = require('../../../core');
var geom = core.geom;
var Point = core.geom.Point;
var Vector = core.geom.Vector;
var Sprite = core.graphics.Sprite;

var graphics = core.graphics;
var ShapeSprite = core.graphics.ShapeSprite;

/**
 * Character Class
 */
var maxWidth = window.innerWidth;
var maxHeight = window.innerHeight;

function Character() {
  this.spriteWidth = 150;
  this.point = new Point(75, 130);
  this.velocity = new Vector(1, 0);

  var rect = new geom.Rectangle(new geom.Point(0, 0), new geom.Vector(50, 100));
  var rectangleSprite = new graphics.ShapeSprite(rect, null, '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16), null);
  rectangleSprite.origin.x = 5;
  rectangleSprite.origin.y = 5;
  rectangleSprite.point = this.point;

  this.sprite = rectangleSprite;
}

var method = Character.prototype;

method.setWorld = function (world) {
  this.world = world;
};

method.getSprite = function(){
  return this.sprite;
}

method.update = function (dt) {
	// Check if player can move there
	this.point.add(this.velocity);
};

module.exports = Character;
