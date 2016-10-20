var Controller = require('./Controller');

var Demo = require('./demo/Demo');
var World = require('./world/World');

/**
 * Game Class
 */

function Game(stage, loader) {
  //Called when core is ready
  this.stage = stage;
  this.loader = loader;

  this.active = false;

  this.scenes = {
    "start": new Demo()
  };

  this.currentScene = null;

  this.controller = new Controller();
  
  this.startGame();
}

var method = Game.prototype;

method.showScene = function(k) {
  if(this.currentScene){
    this.stage.removeChild(this.currentScene.getSprite());
  }
  var scene = this.scenes[k];
  this.currentScene = scene;
  this.stage.addChild(scene.getSprite());
}

method.isActive = function () {
  return this.active;
}

method.startGame = function () {
  console.log("Start Game");
  //Initialize Game
  this.showScene("start");
  this.active = true;
};

method.update = function (dt) {
  if(this.active){
    if(this.controlsActive)
      this.controller.update(dt);
    if(this.currentScene)
      this.currentScene.update(dt);
  }
};

module.exports = Game;
