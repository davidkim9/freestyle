var util = require('util');

var Character = require('./Character');
var GlowEffect = require('../effects/GlowEffect');
/**
 * Player Class
 */

function Player() {
  Player.super_.apply(this, arguments);
}

//Player extends Character
util.inherits(Player, Character);
var method = Player.prototype;

method.setWorld = function(world) {
  this.world = world;
}

method.update = function(dt) {
  Character.prototype.update.apply(this, arguments);
  var effect = new GlowEffect();
  effect.point.x = this.point.x;
  effect.point.y = this.point.y;
  this.world.addEffect(effect);
}

module.exports = Player;
