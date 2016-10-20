/**
 * Main Start!
 */
var Main = require('./game/Main');
var bootstrap = require('./core/bootstrap');

var main = new Main();
bootstrap.init(main);