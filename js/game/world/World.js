var util = require('util');
var core = require('../../core');
var Scene = require('../Scene');
var Point = core.geom.Point;
var Sprite = core.graphics.Sprite;
var GraphicSprite = core.graphics.GraphicSprite;
var YSortContainer = core.graphics.YSortContainer;
var TileSheetSprite = core.graphics.TileSheetSprite;

/**
 * World Class
 */
var method = World.prototype;

function World(game, loader) {
  this.game = game;
  this.loader = loader;

  this.tileWidth = 50;
  this.tileHeight = 50;

  this.layers = [
    new Sprite(),
    new Sprite(),
    new YSortContainer(),
    new Sprite(),
  ];

  this.container = new Sprite();
  for (var i in this.layers) {
    this.container.addChild(this.layers[i]);
  }

  // var args = {
  //   spriteWidth: 50,
  //   spriteHeight: 50,
  //   tiles: grass,
  //   tileWidth: this.tileWidth,
  //   tileHeight: this.tileHeight,
  // };

  // var tileContainer = new TileSheetSprite(this.loader.get('grassTile'), args);
  // this.layers[World.FLOOR].addChild(tileContainer);

  this.effects = [];
}

//World extends Scene
util.inherits(World, Scene);
var method = World.prototype;

method.addEffect = function(effect){
  this.effects.push(effect);
  this.layers[World.EFFECTS_OVER].addChild(effect.getSprite());
}

method.add = function (sprite, layer) {
  this.layers[layer].addChild(sprite);
};

method.update = function (dt) {
  //Process World logic
  for (var k = 0; k < this.effects.length; k++) {
    var e = this.effects[k];
    if(e.completed()){
      this.effects.splice(k, 1);
      this.layers[World.EFFECTS_OVER].removeChild(e.getSprite());
      k--;
    }else{
      e.update(dt);
    }
  }
};

method.getSprite = function () {
  return this.container;
};

module.exports = World;
