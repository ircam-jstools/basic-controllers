'use strict';

var styles = require('./dist/utils/styles');
var BaseController = require('./dist/base-controller');

var basicControllers = {
  Title: require('./dist/title'),
  Buttons: require('./dist/buttons'),
  Toggle: require('./dist/toggle'),
  Slider: require('./dist/slider'),
  Breakpoint: require('./dist/breakpoint'),
  setTheme: function(theme) {
    BaseController.theme = theme;
  }
};

module.exports = basicControllers;