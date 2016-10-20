/**
 * Loader Class
 */
var method = Loader.prototype;

function Loader() {
  this.allLoaded = {};
  this.allLoadedKey = {};

  this.totalLoaded = 0;
  this.maxTotal = 0;
}

method.get = function (key) {
  return this.allLoadedKey[key];
};

method.loaded = function () {
  return this.totalLoaded == this.maxTotal;
};

method.loadProgress = function () {
  return this.totalLoaded / this.maxTotal;
};

//TODO: handle loading same assets at the same time
method.load = function (assets, cb) {
  var loaded = {};

  var maxLoad = 0;

  if (assets.constructor == Array) {
    maxLoad = assets.length;
  }else if (assets.constructor == String) {
    assets = [assets];
    maxLoad = 1;
  }else if (assets.constructor == Object && Object.keys(assets).length >= 0) {
    maxLoad = Object.keys(assets).length;
  }else {
    //Wtf is this?
    console.log('%cWtf is this even: ' + assets, 'font-size:20px; color: #f00');
    return;
  }

  this.maxTotal += maxLoad;

  var failedLoading = '';
  var error = false;

  var loadCounter = 0;
  var _this = this;
  function addLoaded() {
    loadCounter++;
    _this.totalLoaded++;

    if (loadCounter == maxLoad) {
      cb(error ? failedLoading : null, loaded);
    }
  }

  for (var key in assets) {
    var asset = assets[key];

    if (this.allLoaded[asset]) {
      loaded[key] = this.allLoaded[asset];
      addLoaded();
    }else {
      //TODO: Add check to see if image
      (function (key) {
        _this.loadImage(asset, function (err, res) {
          if (err) {
            error = true;
            failedLoading += err + '\n';
            loaded[key] = null;
          }else {
            loaded[key] = res;
            _this.allLoaded[asset] = res;
            _this.allLoadedKey[key] = res;
          }

          addLoaded();
        });
      })(key);
    }
  }
};

method.loadImage = function (src, cb) {
  var imageResource = new Image();
  imageResource.onload = function () {
    cb(null, imageResource);
    imageResource = null;
  };

  imageResource.onerror = function () {
    console.log('%cFailed to load: ' + src, 'color: #f00');
    cb('Failed to load: ' + src);
    imageResource = null;
  };

  imageResource.src = src;
};

module.exports = Loader;
