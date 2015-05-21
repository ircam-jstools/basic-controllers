'use strict';

const styles = require('./dist/utils/styles');
// insert styles
window.addEventListener('DOMContentLoaded', function() {
  styles.insertStyleSheet();
});

var basicControllers = {
  Title: require('./dist/title'),
  Buttons: require('./dist/buttons'),
  Toggle: require('./dist/toggle'),
  Slider: require('./dist/slider')
};

module.exports = basicControllers;