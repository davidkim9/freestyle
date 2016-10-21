var util = require('util');
var core = require('../../core');
var Scene = require('../Scene');
var World = require('./World');
var Camera = require('./Camera');
var Player = require('./entities/Player');
var Point = core.geom.Point;
var Sprite = core.graphics.Sprite;

/**
 * ActOne Class
 */
var method = ActOne.prototype;

function ActOne(game, loader) {
  this.game = game;
  this.loader = loader;

  this.camera = new Camera();

  this.container = new Sprite();
  this.player = new Player();

  this.world = new World(game, loader);

  this.player.setWorld(this.world);
  
  this.container.addChild(this.world.getSprite());
  this.container.addChild(this.player.getSprite());
}

//ActOne extends Scene
util.inherits(ActOne, Scene);
var method = ActOne.prototype;

method.update = function (dt) {
  this.container.scale = this.camera.zoom;
  this.container.point.x = -this.camera.point.x;
  this.container.point.y = -this.camera.point.y;
  
  //Process logic
  this.player.update(dt);
  this.world.update(dt);
};

method.getSprite = function () {
  return this.container;
};

module.exports = ActOne;
