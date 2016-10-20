var config = require("../config");

/**
 * Game Class
 */
var method = Game.prototype;

function Game(context){
  this.context = context;
  this.gameState = {};
  this.loader = new Loader();
}

method.init = function(){
  // Set game starting states
}

method.unload = function(){
  // Unload the game
}

method.gameStep = function(dt){
  //Process game logic
}

method.render = function(dt) {
  var context = this.context;

  context.beginPath();
  context.clearRect(0, 0, canvas.width, canvas.height);

  //Render logic

  context.stroke();
  context.closePath();
}

method.update = function(dt){
  this.gameStep(dt);
  this.render(dt);
}

module.exports = Game;