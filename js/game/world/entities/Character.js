var util = require('util');

var core = require('../../core');
var Point = core.geom.Point;
var Vector = core.geom.Vector;
var AnimatedSpriteSheet = core.graphics.AnimatedSpriteSheet;
var Sprite = core.graphics.Sprite;

// var ShapeSprite = core.graphics.ShapeSprite;

/**
 * Character Class
 */
var maxWidth = window.innerWidth;
var maxHeight = window.innerHeight;

function Character(spriteImage) {
  this.spriteWidth = 150;
  var animations = {
    runDown: {
      startFrame: 0,
      endFrame: 3,
      column: 0,
      loop: true,
    },
    runSide: {
      startFrame: 0,
      endFrame: 3,
      column: 1,
      loop: true,
    },
    runUp: {
      startFrame: 0,
      endFrame: 3,
      column: 2,
      loop: true,
    }
  };
  var spritesheetArgs = {
    fps: 10,
    spriteWidth: this.spriteWidth,
    spriteHeight: 150,
    origin: new Point(75, 130),
    animations: animations
  };

  this.sprite = new AnimatedSpriteSheet(spriteImage, spritesheetArgs);
  this.sprite.scale = 0.75;

  // this.pointSprite = new ShapeSprite(new Point());
  this.moving = false;

  this.setDirection(0);
  this.point = this.getSprite().point;
  this.goPoint = this.point;

  this.movespeed = 300;
}

var method = Character.prototype;

method.setWorld = function (world) {
  this.world = world;
};

method.setDirection = function (d) {
  this.direction = d;
  if (d == 1) {
    this.sprite.scaleX = -1;
  }else {
    this.sprite.scaleX = 1;
  }

  var playLabel;
  switch (this.direction){
    case 0:
      playLabel = "runDown";
    break;
    case 1:
      playLabel = "runSide";
    break;
    case 2:
      playLabel = "runUp";
    break;
    case 3:
      playLabel = "runSide";
    break;
  }

  if(this.sprite.animationPlaying() != playLabel){
    this.sprite.playAnimation(playLabel);
  }
  
  this.direction = d;
};

method.teleportCheck = function () {
  var tile = this.getTile();
  var newTile = this.world.getTile(tile);
  if(tile.x != newTile.x || tile.y != newTile.y){
    console.log("PORT!");
    var p = this.world.getTileCenterPixel(newTile.x, newTile.y);
    this.point.x = p.x;
    this.point.y = p.y;
    this.reset();
  }
};

method.getTile = function () {
  return this.world.getTileAtPixel(this.point);
};

method.moveDirection = function (direction) {
  this.setDirection(direction);
  this.moving = true;
};

method.getSprite = function () {
  return this.sprite;
};

method.move = function (dt) {
  var speed = this.movespeed * dt;
  var velocity = new Vector();
  if (this.direction == 0) {
    // Down
    velocity.y += speed;
  } else if (this.direction == 3) {
    // Left
    velocity.x -= speed;
  } else if (this.direction == 2) {
    // Up
    velocity.y -= speed;
  } else if (this.direction == 1) {
    // Right
    velocity.x += speed;
  }

  var targetPoint = this.point.clonePoint();
  var veloPadding = velocity.cloneVector();
  veloPadding.normalize();
  veloPadding.scalar(10);
  veloPadding.add(velocity);
  targetPoint.add(veloPadding);
  if (this.world.canEnterPixel(targetPoint)) {
    this.point.add(velocity);
  }
};

method.run = function (dt) {
};

method.update = function (dt) {
  this.run(dt);
  this.teleportCheck();
  if (this.moving) {
    this.move(dt);
    this.sprite.play(dt);
    this.moving = false;
  }else {
    // this.sprite.setFrame(0);
  }
};

module.exports = Character;
