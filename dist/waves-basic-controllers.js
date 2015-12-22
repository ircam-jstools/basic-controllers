'use strict';

var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _utilsStyles = require('./utils/styles');

var styles = _interopRequireWildcard(_utilsStyles);

// expose for plugins

var _componentsBaseController = require('./components/base-controller');

var _componentsBaseController2 = _interopRequireDefault(_componentsBaseController);

var _componentsButtons = require('./components/buttons');

var _componentsButtons2 = _interopRequireDefault(_componentsButtons);

var _componentsSelectButtons = require('./components/select-buttons');

var _componentsSelectButtons2 = _interopRequireDefault(_componentsSelectButtons);

var _componentsSelectList = require('./components/select-list');

var _componentsSelectList2 = _interopRequireDefault(_componentsSelectList);

var _componentsSlider = require('./components/slider');

var _componentsSlider2 = _interopRequireDefault(_componentsSlider);

var _componentsTitle = require('./components/title');

var _componentsTitle2 = _interopRequireDefault(_componentsTitle);

var _componentsToggle = require('./components/toggle');

var _componentsToggle2 = _interopRequireDefault(_componentsToggle);

var _componentsNumberBox = require('./components/number-box');

var _componentsNumberBox2 = _interopRequireDefault(_componentsNumberBox);

// Breakpoint: require('./dist/breakpoint'),

exports['default'] = {
  BaseController: _componentsBaseController2['default'],
  Buttons: _componentsButtons2['default'],
  NumberBox: _componentsNumberBox2['default'],
  SelectButtons: _componentsSelectButtons2['default'],
  SelectList: _componentsSelectList2['default'],
  Slider: _componentsSlider2['default'],
  Title: _componentsTitle2['default'],
  Toggle: _componentsToggle2['default'],

  // global configuration
  setTheme: function setTheme(theme) {
    _componentsBaseController2['default'].theme = theme;
  },
  disableStyleSheet: function disableStyleSheet() {
    styles.disable();
  }
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVzNi93YXZlcy1iYXNpYy1jb250cm9sbGVycy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OzJCQUF3QixnQkFBZ0I7O0lBQTVCLE1BQU07Ozs7d0NBR1MsOEJBQThCOzs7O2lDQUNyQyxzQkFBc0I7Ozs7dUNBQ2hCLDZCQUE2Qjs7OztvQ0FDaEMsMEJBQTBCOzs7O2dDQUM5QixxQkFBcUI7Ozs7K0JBQ3RCLG9CQUFvQjs7OztnQ0FDbkIscUJBQXFCOzs7O21DQUNsQix5QkFBeUI7Ozs7OztxQkFHaEM7QUFDYixnQkFBYyx1Q0FBQTtBQUNkLFNBQU8sZ0NBQUE7QUFDUCxXQUFTLGtDQUFBO0FBQ1QsZUFBYSxzQ0FBQTtBQUNiLFlBQVUsbUNBQUE7QUFDVixRQUFNLCtCQUFBO0FBQ04sT0FBSyw4QkFBQTtBQUNMLFFBQU0sK0JBQUE7OztBQUdOLFVBQVEsRUFBQSxrQkFBQyxLQUFLLEVBQUU7QUFDZCwwQ0FBZSxLQUFLLEdBQUcsS0FBSyxDQUFDO0dBQzlCO0FBQ0QsbUJBQWlCLEVBQUEsNkJBQUc7QUFDbEIsVUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO0dBQ2xCO0NBQ0YiLCJmaWxlIjoiZXM2L3dhdmVzLWJhc2ljLWNvbnRyb2xsZXJzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgc3R5bGVzIGZyb20gJy4vdXRpbHMvc3R5bGVzJztcblxuLy8gZXhwb3NlIGZvciBwbHVnaW5zXG5pbXBvcnQgQmFzZUNvbnRyb2xsZXIgZnJvbSAnLi9jb21wb25lbnRzL2Jhc2UtY29udHJvbGxlcic7XG5pbXBvcnQgQnV0dG9ucyBmcm9tICcuL2NvbXBvbmVudHMvYnV0dG9ucyc7XG5pbXBvcnQgU2VsZWN0QnV0dG9ucyBmcm9tICcuL2NvbXBvbmVudHMvc2VsZWN0LWJ1dHRvbnMnO1xuaW1wb3J0IFNlbGVjdExpc3QgZnJvbSAnLi9jb21wb25lbnRzL3NlbGVjdC1saXN0JztcbmltcG9ydCBTbGlkZXIgZnJvbSAnLi9jb21wb25lbnRzL3NsaWRlcic7XG5pbXBvcnQgVGl0bGUgZnJvbSAnLi9jb21wb25lbnRzL3RpdGxlJztcbmltcG9ydCBUb2dnbGUgZnJvbSAnLi9jb21wb25lbnRzL3RvZ2dsZSc7XG5pbXBvcnQgTnVtYmVyQm94IGZyb20gJy4vY29tcG9uZW50cy9udW1iZXItYm94Jztcbi8vIEJyZWFrcG9pbnQ6IHJlcXVpcmUoJy4vZGlzdC9icmVha3BvaW50JyksXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgQmFzZUNvbnRyb2xsZXIsXG4gIEJ1dHRvbnMsXG4gIE51bWJlckJveCxcbiAgU2VsZWN0QnV0dG9ucyxcbiAgU2VsZWN0TGlzdCxcbiAgU2xpZGVyLFxuICBUaXRsZSxcbiAgVG9nZ2xlLFxuXG4gIC8vIGdsb2JhbCBjb25maWd1cmF0aW9uXG4gIHNldFRoZW1lKHRoZW1lKSB7XG4gICAgQmFzZUNvbnRyb2xsZXIudGhlbWUgPSB0aGVtZTtcbiAgfSxcbiAgZGlzYWJsZVN0eWxlU2hlZXQoKSB7XG4gICAgc3R5bGVzLmRpc2FibGUoKTtcbiAgfSxcbn07Il19