var config = require("./config");
var Game = require("./game/Game");

var instance;
var time = 0;
var unloaded = false;
var intervalTimer;

//Init
function init(){
  //Grab canvas object
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");
  context.imageSmoothingEnabled = true;

  canvas.width = config.width;
  canvas.height = config.height;

  instance = new Game(context);
  instance.init();
}

/**
 * Loop logic
 */
function update() {
  var now = new Date().getTime(),
  dt = (now - (time || now)) / 1000;
  time = now;

  // Ensure framedrop isn't too significant
  // This should be disabled on networked games
  dt = Math.min(0.1, dt);

  instance.update(dt);
}

/**
 * IE9 Polyfill
 */
function unload(){
  //Kill timers and animationframe
  unloaded = true;
  if(intervalTimer){
    clearInterval(intervalTimer);
    instance.unload();
  }
}

function animate(){
  if(unloaded) {
    instance.unload();
    return;
  }
  update();
  requestAnimationFrame(animate);
}

function startLoop(){
  unloaded = false;
  if(window.requestAnimationFrame){
    requestAnimationFrame(animate);
  }else{
    intervalTimer = setInterval(update, 16);
  }
}

init();
startLoop();