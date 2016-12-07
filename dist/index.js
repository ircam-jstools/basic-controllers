'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setTheme = exports.create = exports.TriggerButtons = exports.Toggle = exports.Title = exports.Text = exports.Slider = exports.SelectList = exports.SelectButtons = exports.NumberBox = exports.Group = exports.BaseComponent = exports.styles = undefined;

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

var _factory = require('./factory');

Object.defineProperty(exports, 'create', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_factory).default;
  }
});

var _display = require('./mixins/display');

Object.defineProperty(exports, 'setTheme', {
  enumerable: true,
  get: function get() {
    return _display.setTheme;
  }
});
exports.disableStyles = disableStyles;

var _styles2 = require('./utils/styles');

var _styles = _interopRequireWildcard(_styles2);

var _BaseComponent2 = require('./components/BaseComponent');

var _BaseComponent3 = _interopRequireDefault(_BaseComponent2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = exports.styles = _styles;

/** @module basic-controllers */

// expose for plugins
var BaseComponent = exports.BaseComponent = _BaseComponent3.default;

// components


/**
 * Disable default styling (expect a broken ui)
 */
function disableStyles() {
  _styles.disable();
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbImRlZmF1bHQiLCJzZXRUaGVtZSIsImRpc2FibGVTdHlsZXMiLCJfc3R5bGVzIiwic3R5bGVzIiwiQmFzZUNvbXBvbmVudCIsImRpc2FibGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OzswQ0FVU0EsTzs7Ozs7Ozs7OzhDQUNBQSxPOzs7Ozs7Ozs7a0RBQ0FBLE87Ozs7Ozs7OzsrQ0FDQUEsTzs7Ozs7Ozs7OzJDQUNBQSxPOzs7Ozs7Ozs7eUNBQ0FBLE87Ozs7Ozs7OzswQ0FDQUEsTzs7Ozs7Ozs7OzJDQUNBQSxPOzs7Ozs7Ozs7bURBQ0FBLE87Ozs7Ozs7Ozs0Q0FHQUEsTzs7Ozs7Ozs7O29CQUVBQyxROzs7UUFLT0MsYSxHQUFBQSxhOztBQTVCaEI7O0lBQVlDLE87O0FBTVo7Ozs7Ozs7O0FBTE8sSUFBTUMsMEJBQVNELE9BQWY7O0FBRVA7O0FBRUE7QUFFTyxJQUFNRSwrREFBTjs7QUFFUDs7O0FBZ0JBOzs7QUFHTyxTQUFTSCxhQUFULEdBQXlCO0FBQzlCQyxVQUFRRyxPQUFSO0FBQ0QiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBfc3R5bGVzIGZyb20gJy4vdXRpbHMvc3R5bGVzJztcbmV4cG9ydCBjb25zdCBzdHlsZXMgPSBfc3R5bGVzO1xuXG4vKiogQG1vZHVsZSBiYXNpYy1jb250cm9sbGVycyAqL1xuXG4vLyBleHBvc2UgZm9yIHBsdWdpbnNcbmltcG9ydCBfQmFzZUNvbXBvbmVudCBmcm9tICcuL2NvbXBvbmVudHMvQmFzZUNvbXBvbmVudCc7XG5leHBvcnQgY29uc3QgQmFzZUNvbXBvbmVudCA9IF9CYXNlQ29tcG9uZW50O1xuXG4vLyBjb21wb25lbnRzXG5leHBvcnQgeyBkZWZhdWx0IGFzIEdyb3VwIH0gZnJvbSAnLi9jb21wb25lbnRzL0dyb3VwJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgTnVtYmVyQm94IH0gZnJvbSAnLi9jb21wb25lbnRzL051bWJlckJveCc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIFNlbGVjdEJ1dHRvbnMgfSBmcm9tICcuL2NvbXBvbmVudHMvU2VsZWN0QnV0dG9ucyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIFNlbGVjdExpc3QgfSBmcm9tICcuL2NvbXBvbmVudHMvU2VsZWN0TGlzdCc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIFNsaWRlciB9IGZyb20gJy4vY29tcG9uZW50cy9TbGlkZXInO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBUZXh0IH0gZnJvbSAnLi9jb21wb25lbnRzL1RleHQnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBUaXRsZSB9IGZyb20gJy4vY29tcG9uZW50cy9UaXRsZSc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIFRvZ2dsZSB9IGZyb20gJy4vY29tcG9uZW50cy9Ub2dnbGUnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBUcmlnZ2VyQnV0dG9ucyB9IGZyb20gJy4vY29tcG9uZW50cy9UcmlnZ2VyQnV0dG9ucyc7XG5cbi8vIGZhY3RvcnlcbmV4cG9ydCB7IGRlZmF1bHQgYXMgY3JlYXRlIH0gZnJvbSAnLi9mYWN0b3J5Jztcbi8vIGRpc3BsYXlcbmV4cG9ydCB7IHNldFRoZW1lICB9IGZyb20gJy4vbWl4aW5zL2Rpc3BsYXknO1xuXG4vKipcbiAqIERpc2FibGUgZGVmYXVsdCBzdHlsaW5nIChleHBlY3QgYSBicm9rZW4gdWkpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkaXNhYmxlU3R5bGVzKCkge1xuICBfc3R5bGVzLmRpc2FibGUoKTtcbn07XG4iXX0=