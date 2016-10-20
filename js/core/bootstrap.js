var config = require('../config');
var Core = require('./Core');

var instance;
var time = 0;
var unloaded = false;
var intervalTimer;

var main;

//Init
function init(main) {
  //Grab canvas object
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  context.imageSmoothingEnabled = true;

  canvas.width = global.width;
  canvas.height = global.height;

  window.addEventListener('resize', function () {
    canvas.width = global.width;
    canvas.height = global.height;
  });

  instance = new Core(context, main);
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
function unload() {
  //Kill timers and animationframe
  unloaded = true;
  if (intervalTimer) {
    clearInterval(intervalTimer);
    instance.unload();
  }
}

function animate() {
  if (unloaded) {
    instance.unload();
    return;
  }

  update();
  requestAnimationFrame(animate);
}

function startLoop() {
  unloaded = false;
  if (window.requestAnimationFrame) {
    requestAnimationFrame(animate);
  }else {
    intervalTimer = setInterval(update, 16);
  }
}

module.exports = {
  init: function (main) {
    init(main);
    startLoop();
  },
};
