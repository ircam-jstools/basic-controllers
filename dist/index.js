'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Toggle = exports.Title = exports.Slider = exports.SelectList = exports.SelectButtons = exports.NumberBox = exports.Text = exports.Buttons = exports.BaseController = exports.styles = undefined;

var _buttons = require('./components/buttons');

Object.defineProperty(exports, 'Buttons', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_buttons).default;
  }
});

var _text = require('./components/text');

Object.defineProperty(exports, 'Text', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_text).default;
  }
});

var _numberBox = require('./components/number-box');

Object.defineProperty(exports, 'NumberBox', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_numberBox).default;
  }
});

var _selectButtons = require('./components/select-buttons');

Object.defineProperty(exports, 'SelectButtons', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_selectButtons).default;
  }
});

var _selectList = require('./components/select-list');

Object.defineProperty(exports, 'SelectList', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_selectList).default;
  }
});

var _slider = require('./components/slider');

Object.defineProperty(exports, 'Slider', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_slider).default;
  }
});

var _title = require('./components/title');

Object.defineProperty(exports, 'Title', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_title).default;
  }
});

var _toggle = require('./components/toggle');

Object.defineProperty(exports, 'Toggle', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_toggle).default;
  }
});
exports.setTheme = setTheme;
exports.disableStyles = disableStyles;

var _styles2 = require('./utils/styles');

var _styles = _interopRequireWildcard(_styles2);

var _baseController = require('./components/base-controller');

var _baseController2 = _interopRequireDefault(_baseController);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = exports.styles = _styles;
// expose for plugins
var BaseController = exports.BaseController = _baseController2.default;

// Breakpoint: require('./dist/breakpoint'),
function setTheme(theme) {
  _baseController2.default.theme = theme;
};

function disableStyles() {
  _styles.disable();
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs0Q0FNUzs7Ozs7Ozs7O3lDQUNBOzs7Ozs7Ozs7OENBQ0E7Ozs7Ozs7OztrREFDQTs7Ozs7Ozs7OytDQUNBOzs7Ozs7Ozs7MkNBQ0E7Ozs7Ozs7OzswQ0FDQTs7Ozs7Ozs7OzJDQUNBOzs7UUFFTztRQUlBOztBQW5CaEI7O0lBQVk7O0FBR1o7Ozs7Ozs7O0FBRk8sSUFBTSwwQkFBUyxPQUFUOztBQUdOLElBQU0sa0VBQU47OztBQVdBLFNBQVMsUUFBVCxDQUFrQixLQUFsQixFQUF5QjtBQUM5QiwyQkFBZ0IsS0FBaEIsR0FBd0IsS0FBeEIsQ0FEOEI7Q0FBekI7O0FBSUEsU0FBUyxhQUFULEdBQXlCO0FBQzlCLFVBQVEsT0FBUixHQUQ4QjtDQUF6QiIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIF9zdHlsZXMgZnJvbSAnLi91dGlscy9zdHlsZXMnO1xuZXhwb3J0IGNvbnN0IHN0eWxlcyA9IF9zdHlsZXM7XG4vLyBleHBvc2UgZm9yIHBsdWdpbnNcbmltcG9ydCBfQmFzZUNvbnRyb2xsZXIgZnJvbSAnLi9jb21wb25lbnRzL2Jhc2UtY29udHJvbGxlcic7XG5leHBvcnQgY29uc3QgQmFzZUNvbnRyb2xsZXIgPSBfQmFzZUNvbnRyb2xsZXI7XG5cbmV4cG9ydCB7IGRlZmF1bHQgYXMgQnV0dG9ucyB9IGZyb20gJy4vY29tcG9uZW50cy9idXR0b25zJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgVGV4dCB9IGZyb20gJy4vY29tcG9uZW50cy90ZXh0JztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgTnVtYmVyQm94IH0gZnJvbSAnLi9jb21wb25lbnRzL251bWJlci1ib3gnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBTZWxlY3RCdXR0b25zIH0gZnJvbSAnLi9jb21wb25lbnRzL3NlbGVjdC1idXR0b25zJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgU2VsZWN0TGlzdCB9IGZyb20gJy4vY29tcG9uZW50cy9zZWxlY3QtbGlzdCc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIFNsaWRlciB9IGZyb20gJy4vY29tcG9uZW50cy9zbGlkZXInO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBUaXRsZSB9IGZyb20gJy4vY29tcG9uZW50cy90aXRsZSc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIFRvZ2dsZSB9IGZyb20gJy4vY29tcG9uZW50cy90b2dnbGUnO1xuLy8gQnJlYWtwb2ludDogcmVxdWlyZSgnLi9kaXN0L2JyZWFrcG9pbnQnKSxcbmV4cG9ydCBmdW5jdGlvbiBzZXRUaGVtZSh0aGVtZSkge1xuICBfQmFzZUNvbnRyb2xsZXIudGhlbWUgPSB0aGVtZTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBkaXNhYmxlU3R5bGVzKCkge1xuICBfc3R5bGVzLmRpc2FibGUoKTtcbn07XG5cbiJdfQ==