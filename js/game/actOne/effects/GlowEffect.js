var util = require('util');
var Effect = require('./Effect');
var core = require('../../../core');
var Point = core.geom.Point;
var Circle = core.geom.Circle;
var ShapeSprite = core.graphics.ShapeSprite;
var Sprite = core.graphics.Sprite;

/**
 * GlowEffect Class
 */

function GlowEffect() {
  GlowEffect.super_.apply(this, arguments);
  this.particles = [];
  var maxSpeed = 5;
  for(var i = 0; i < 5; i++){
    var shape = new ShapeSprite(new Circle(new Point(0, 0), 10), null, "#fff", 0);
    this.particles.push({
      sprite: shape,
      vX: Math.random() * maxSpeed * 2 - maxSpeed,
      vY: Math.random() * maxSpeed * 2 - maxSpeed,
    });
    this.sprite.addChild(shape);
  }

  this.duration = 1;
  this.timer = 0;
}

util.inherits(GlowEffect, Effect);
var method = GlowEffect.prototype;

method.completed = function () {
  return this.timer >= this.duration;
};

method.update = function (dt) {
  var animationRatio = this.timer / this.duration;
  var friction = 1 - animationRatio;
  for(var i = 0; i < this.particles.length; i++){
    var p = this.particles[i];
    p.sprite.fillStyle = "rgba(255, 255, 255, " + friction + ")";
    p.sprite.point.x += p.vX * friction* 0.3;
    p.sprite.point.y += p.vY * friction* 0.3;
  }
  this.timer += dt;
};

module.exports = GlowEffect;
