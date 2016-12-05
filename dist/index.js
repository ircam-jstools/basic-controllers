'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TriggerButtons = exports.Toggle = exports.Title = exports.Text = exports.Slider = exports.SelectList = exports.SelectButtons = exports.NumberBox = exports.Group = exports.BaseController = exports.styles = undefined;

var _Group = require('./components/Group');

Object.defineProperty(exports, 'Group', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Group).default;
  }
});

var _NumberBox = require('./components/NumberBox');

Object.defineProperty(exports, 'NumberBox', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_NumberBox).default;
  }
});

var _SelectButtons = require('./components/SelectButtons');

Object.defineProperty(exports, 'SelectButtons', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_SelectButtons).default;
  }
});

var _SelectList = require('./components/SelectList');

Object.defineProperty(exports, 'SelectList', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_SelectList).default;
  }
});

var _Slider = require('./components/Slider');

Object.defineProperty(exports, 'Slider', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Slider).default;
  }
});

var _Text = require('./components/Text');

Object.defineProperty(exports, 'Text', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Text).default;
  }
});

var _Title = require('./components/Title');

Object.defineProperty(exports, 'Title', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Title).default;
  }
});

var _Toggle = require('./components/Toggle');

Object.defineProperty(exports, 'Toggle', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Toggle).default;
  }
});

var _TriggerButtons = require('./components/TriggerButtons');

Object.defineProperty(exports, 'TriggerButtons', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_TriggerButtons).default;
  }
});
exports.setTheme = setTheme;
exports.disableStyles = disableStyles;

var _styles2 = require('./utils/styles');

var _styles = _interopRequireWildcard(_styles2);

var _BaseController2 = require('./components/BaseController');

var _BaseController3 = _interopRequireDefault(_BaseController2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = exports.styles = _styles;

/**
 * @module basic-controllers
 */

// expose for plugins
var BaseController = exports.BaseController = _BaseController3.default;

/**
 * Change the theme of the controllers, currently 3 themes are available:
 *  - 'light' (default)
 *  - 'grey'
 *  - 'dark'
 *
 * @param {String} theme - Name of the theme.
 */
function setTheme(theme) {
  _BaseController3.default.theme = theme;
};

/**
 * Disable default styling (expect a broken ui)
 */
function disableStyles() {
  _styles.disable();
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbImRlZmF1bHQiLCJzZXRUaGVtZSIsImRpc2FibGVTdHlsZXMiLCJfc3R5bGVzIiwic3R5bGVzIiwiQmFzZUNvbnRyb2xsZXIiLCJ0aGVtZSIsImRpc2FibGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OzswQ0FXU0EsTzs7Ozs7Ozs7OzhDQUNBQSxPOzs7Ozs7Ozs7a0RBQ0FBLE87Ozs7Ozs7OzsrQ0FDQUEsTzs7Ozs7Ozs7OzJDQUNBQSxPOzs7Ozs7Ozs7eUNBQ0FBLE87Ozs7Ozs7OzswQ0FDQUEsTzs7Ozs7Ozs7OzJDQUNBQSxPOzs7Ozs7Ozs7bURBQ0FBLE87OztRQVVPQyxRLEdBQUFBLFE7UUFPQUMsYSxHQUFBQSxhOztBQXBDaEI7O0lBQVlDLE87O0FBUVo7Ozs7Ozs7O0FBUE8sSUFBTUMsMEJBQVNELE9BQWY7O0FBRVA7Ozs7QUFJQTtBQUVPLElBQU1FLGtFQUFOOztBQVlQOzs7Ozs7OztBQVFPLFNBQVNKLFFBQVQsQ0FBa0JLLEtBQWxCLEVBQXlCO0FBQzlCLDJCQUFnQkEsS0FBaEIsR0FBd0JBLEtBQXhCO0FBQ0Q7O0FBRUQ7OztBQUdPLFNBQVNKLGFBQVQsR0FBeUI7QUFDOUJDLFVBQVFJLE9BQVI7QUFDRCIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIF9zdHlsZXMgZnJvbSAnLi91dGlscy9zdHlsZXMnO1xuZXhwb3J0IGNvbnN0IHN0eWxlcyA9IF9zdHlsZXM7XG5cbi8qKlxuICogQG1vZHVsZSBiYXNpYy1jb250cm9sbGVyc1xuICovXG5cbi8vIGV4cG9zZSBmb3IgcGx1Z2luc1xuaW1wb3J0IF9CYXNlQ29udHJvbGxlciBmcm9tICcuL2NvbXBvbmVudHMvQmFzZUNvbnRyb2xsZXInO1xuZXhwb3J0IGNvbnN0IEJhc2VDb250cm9sbGVyID0gX0Jhc2VDb250cm9sbGVyO1xuXG5leHBvcnQgeyBkZWZhdWx0IGFzIEdyb3VwIH0gZnJvbSAnLi9jb21wb25lbnRzL0dyb3VwJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgTnVtYmVyQm94IH0gZnJvbSAnLi9jb21wb25lbnRzL051bWJlckJveCc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIFNlbGVjdEJ1dHRvbnMgfSBmcm9tICcuL2NvbXBvbmVudHMvU2VsZWN0QnV0dG9ucyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIFNlbGVjdExpc3QgfSBmcm9tICcuL2NvbXBvbmVudHMvU2VsZWN0TGlzdCc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIFNsaWRlciB9IGZyb20gJy4vY29tcG9uZW50cy9TbGlkZXInO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBUZXh0IH0gZnJvbSAnLi9jb21wb25lbnRzL1RleHQnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBUaXRsZSB9IGZyb20gJy4vY29tcG9uZW50cy9UaXRsZSc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIFRvZ2dsZSB9IGZyb20gJy4vY29tcG9uZW50cy9Ub2dnbGUnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBUcmlnZ2VyQnV0dG9ucyB9IGZyb20gJy4vY29tcG9uZW50cy9UcmlnZ2VyQnV0dG9ucyc7XG5cbi8qKlxuICogQ2hhbmdlIHRoZSB0aGVtZSBvZiB0aGUgY29udHJvbGxlcnMsIGN1cnJlbnRseSAzIHRoZW1lcyBhcmUgYXZhaWxhYmxlOlxuICogIC0gJ2xpZ2h0JyAoZGVmYXVsdClcbiAqICAtICdncmV5J1xuICogIC0gJ2RhcmsnXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHRoZW1lIC0gTmFtZSBvZiB0aGUgdGhlbWUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRUaGVtZSh0aGVtZSkge1xuICBfQmFzZUNvbnRyb2xsZXIudGhlbWUgPSB0aGVtZTtcbn07XG5cbi8qKlxuICogRGlzYWJsZSBkZWZhdWx0IHN0eWxpbmcgKGV4cGVjdCBhIGJyb2tlbiB1aSlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRpc2FibGVTdHlsZXMoKSB7XG4gIF9zdHlsZXMuZGlzYWJsZSgpO1xufTtcblxuIl19