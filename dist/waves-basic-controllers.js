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

var _componentsText = require('./components/text');

var _componentsText2 = _interopRequireDefault(_componentsText);

var _componentsNumberBox = require('./components/number-box');

var _componentsNumberBox2 = _interopRequireDefault(_componentsNumberBox);

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

// Breakpoint: require('./dist/breakpoint'),

exports['default'] = {
  BaseController: _componentsBaseController2['default'],
  Buttons: _componentsButtons2['default'],
  Text: _componentsText2['default'],
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
  disableStyles: function disableStyles() {
    styles.disable();
  }
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVzNi93YXZlcy1iYXNpYy1jb250cm9sbGVycy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OzJCQUF3QixnQkFBZ0I7O0lBQTVCLE1BQU07Ozs7d0NBR1MsOEJBQThCOzs7O2lDQUNyQyxzQkFBc0I7Ozs7OEJBQ3pCLG1CQUFtQjs7OzttQ0FDZCx5QkFBeUI7Ozs7dUNBQ3JCLDZCQUE2Qjs7OztvQ0FDaEMsMEJBQTBCOzs7O2dDQUM5QixxQkFBcUI7Ozs7K0JBQ3RCLG9CQUFvQjs7OztnQ0FDbkIscUJBQXFCOzs7Ozs7cUJBR3pCO0FBQ2IsZ0JBQWMsdUNBQUE7QUFDZCxTQUFPLGdDQUFBO0FBQ1AsTUFBSSw2QkFBQTtBQUNKLFdBQVMsa0NBQUE7QUFDVCxlQUFhLHNDQUFBO0FBQ2IsWUFBVSxtQ0FBQTtBQUNWLFFBQU0sK0JBQUE7QUFDTixPQUFLLDhCQUFBO0FBQ0wsUUFBTSwrQkFBQTs7O0FBR04sVUFBUSxFQUFBLGtCQUFDLEtBQUssRUFBRTtBQUNkLDBDQUFlLEtBQUssR0FBRyxLQUFLLENBQUM7R0FDOUI7QUFDRCxlQUFhLEVBQUEseUJBQUc7QUFDZCxVQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7R0FDbEI7Q0FDRiIsImZpbGUiOiJlczYvd2F2ZXMtYmFzaWMtY29udHJvbGxlcnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBzdHlsZXMgZnJvbSAnLi91dGlscy9zdHlsZXMnO1xuXG4vLyBleHBvc2UgZm9yIHBsdWdpbnNcbmltcG9ydCBCYXNlQ29udHJvbGxlciBmcm9tICcuL2NvbXBvbmVudHMvYmFzZS1jb250cm9sbGVyJztcbmltcG9ydCBCdXR0b25zIGZyb20gJy4vY29tcG9uZW50cy9idXR0b25zJztcbmltcG9ydCBUZXh0IGZyb20gJy4vY29tcG9uZW50cy90ZXh0JztcbmltcG9ydCBOdW1iZXJCb3ggZnJvbSAnLi9jb21wb25lbnRzL251bWJlci1ib3gnO1xuaW1wb3J0IFNlbGVjdEJ1dHRvbnMgZnJvbSAnLi9jb21wb25lbnRzL3NlbGVjdC1idXR0b25zJztcbmltcG9ydCBTZWxlY3RMaXN0IGZyb20gJy4vY29tcG9uZW50cy9zZWxlY3QtbGlzdCc7XG5pbXBvcnQgU2xpZGVyIGZyb20gJy4vY29tcG9uZW50cy9zbGlkZXInO1xuaW1wb3J0IFRpdGxlIGZyb20gJy4vY29tcG9uZW50cy90aXRsZSc7XG5pbXBvcnQgVG9nZ2xlIGZyb20gJy4vY29tcG9uZW50cy90b2dnbGUnO1xuLy8gQnJlYWtwb2ludDogcmVxdWlyZSgnLi9kaXN0L2JyZWFrcG9pbnQnKSxcblxuZXhwb3J0IGRlZmF1bHQge1xuICBCYXNlQ29udHJvbGxlcixcbiAgQnV0dG9ucyxcbiAgVGV4dCxcbiAgTnVtYmVyQm94LFxuICBTZWxlY3RCdXR0b25zLFxuICBTZWxlY3RMaXN0LFxuICBTbGlkZXIsXG4gIFRpdGxlLFxuICBUb2dnbGUsXG5cbiAgLy8gZ2xvYmFsIGNvbmZpZ3VyYXRpb25cbiAgc2V0VGhlbWUodGhlbWUpIHtcbiAgICBCYXNlQ29udHJvbGxlci50aGVtZSA9IHRoZW1lO1xuICB9LFxuICBkaXNhYmxlU3R5bGVzKCkge1xuICAgIHN0eWxlcy5kaXNhYmxlKCk7XG4gIH0sXG59O1xuIl19