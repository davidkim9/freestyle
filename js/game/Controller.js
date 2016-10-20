/**
 * Controller Class
 */

function Controller() {
  this.keysPressed = {};
  document.addEventListener('keydown', this.keydown.bind(this));
  document.addEventListener('keyup', this.keyup.bind(this));
}

var method = Controller.prototype;
method.keydown = function (e) {
  // console.log(e.keyCode);
  this.keysPressed[e.keyCode] = true;
};

method.keyup = function (e) {
  delete this.keysPressed[e.keyCode];
};

method.update = function (dt) {

};

module.exports = Controller;
