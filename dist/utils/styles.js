'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.disable = disable;
exports.insertStyleSheet = insertStyleSheet;

var _packageJson = require('../../package.json');

var _packageJson2 = _interopRequireDefault(_packageJson);

var _cssStylesJs = require('../css/styles.js');

var _cssStylesJs2 = _interopRequireDefault(_cssStylesJs);

var ns = _packageJson2['default'].name;

exports.ns = ns;
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
  $style.innerHTML = _cssStylesJs2['default'];

  document.body.appendChild($style);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVzNi91dGlscy9zdHlsZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OzsyQkFBZ0Isb0JBQW9COzs7OzJCQUNqQixrQkFBa0I7Ozs7QUFFOUIsSUFBTSxFQUFFLEdBQUcseUJBQUksSUFBSSxDQUFDOzs7QUFFM0IsSUFBTSxPQUFPLFNBQU8sRUFBRSxBQUFFLENBQUM7QUFDekIsSUFBSSxRQUFRLEdBQUcsS0FBSyxDQUFDOztBQUVkLFNBQVMsT0FBTyxHQUFHO0FBQ3hCLFVBQVEsR0FBRyxJQUFJLENBQUM7Q0FDakI7O0FBRU0sU0FBUyxnQkFBZ0IsR0FBRztBQUNqQyxNQUFJLFFBQVEsRUFBRTtBQUFFLFdBQU87R0FBRTtBQUN6QixNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDOztBQUUvQyxRQUFNLENBQUMsWUFBWSxDQUFDLGdCQUFnQixFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQzFDLFFBQU0sQ0FBQyxTQUFTLDJCQUFTLENBQUM7O0FBRTFCLFVBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0NBQ25DIiwiZmlsZSI6ImVzNi91dGlscy9zdHlsZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcGtnIGZyb20gJy4uLy4uL3BhY2thZ2UuanNvbic7XG5pbXBvcnQgc3R5bGVzIGZyb20gJy4uL2Nzcy9zdHlsZXMuanMnO1xuXG5leHBvcnQgY29uc3QgbnMgPSBwa2cubmFtZTtcblxuY29uc3QgbnNDbGFzcyA9IGAuJHtuc31gO1xubGV0IF9kaXNhYmxlID0gZmFsc2U7XG5cbmV4cG9ydCBmdW5jdGlvbiBkaXNhYmxlKCkge1xuICBfZGlzYWJsZSA9IHRydWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbnNlcnRTdHlsZVNoZWV0KCkge1xuICBpZiAoX2Rpc2FibGUpIHsgcmV0dXJuOyB9XG4gIGNvbnN0ICRzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG5cbiAgJHN0eWxlLnNldEF0dHJpYnV0ZSgnZGF0YS1uYW1lc3BhY2UnLCBucyk7XG4gICRzdHlsZS5pbm5lckhUTUwgPSBzdHlsZXM7XG5cbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCgkc3R5bGUpO1xufVxuXG4iXX0=