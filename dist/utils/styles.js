'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ns = undefined;
exports.disable = disable;
exports.insertStyleSheet = insertStyleSheet;

var _package = require('../../package.json');

var _package2 = _interopRequireDefault(_package);

var _styles = require('../css/styles.js');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ns = exports.ns = _package2.default.name;

var nsClass = '.' + ns;
var _disable = false;

function disable() {
  _disable = true;
}

function insertStyleSheet() {
  if (_disable) {
    return;
  }
  var $style = document.createElement('style');

  $style.setAttribute('data-namespace', ns);
  $style.innerHTML = _styles2.default;

  document.body.appendChild($style);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0eWxlcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7UUFRZ0I7UUFJQTs7QUFaaEI7Ozs7QUFDQTs7Ozs7O0FBRU8sSUFBTSxrQkFBSyxrQkFBSSxJQUFKOztBQUVsQixJQUFNLGdCQUFjLEVBQWQ7QUFDTixJQUFJLFdBQVcsS0FBWDs7QUFFRyxTQUFTLE9BQVQsR0FBbUI7QUFDeEIsYUFBVyxJQUFYLENBRHdCO0NBQW5COztBQUlBLFNBQVMsZ0JBQVQsR0FBNEI7QUFDakMsTUFBSSxRQUFKLEVBQWM7QUFBRSxXQUFGO0dBQWQ7QUFDQSxNQUFNLFNBQVMsU0FBUyxhQUFULENBQXVCLE9BQXZCLENBQVQsQ0FGMkI7O0FBSWpDLFNBQU8sWUFBUCxDQUFvQixnQkFBcEIsRUFBc0MsRUFBdEMsRUFKaUM7QUFLakMsU0FBTyxTQUFQLG9CQUxpQzs7QUFPakMsV0FBUyxJQUFULENBQWMsV0FBZCxDQUEwQixNQUExQixFQVBpQztDQUE1QiIsImZpbGUiOiJzdHlsZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcGtnIGZyb20gJy4uLy4uL3BhY2thZ2UuanNvbic7XG5pbXBvcnQgc3R5bGVzIGZyb20gJy4uL2Nzcy9zdHlsZXMuanMnO1xuXG5leHBvcnQgY29uc3QgbnMgPSBwa2cubmFtZTtcblxuY29uc3QgbnNDbGFzcyA9IGAuJHtuc31gO1xubGV0IF9kaXNhYmxlID0gZmFsc2U7XG5cbmV4cG9ydCBmdW5jdGlvbiBkaXNhYmxlKCkge1xuICBfZGlzYWJsZSA9IHRydWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbnNlcnRTdHlsZVNoZWV0KCkge1xuICBpZiAoX2Rpc2FibGUpIHsgcmV0dXJuOyB9XG4gIGNvbnN0ICRzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG5cbiAgJHN0eWxlLnNldEF0dHJpYnV0ZSgnZGF0YS1uYW1lc3BhY2UnLCBucyk7XG4gICRzdHlsZS5pbm5lckhUTUwgPSBzdHlsZXM7XG5cbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCgkc3R5bGUpO1xufVxuXG4iXX0=