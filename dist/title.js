'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _get = require('babel-runtime/helpers/get')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var events = require('events');
var styles = require('./utils/styles');

var Title = (function (_events$EventEmitter) {
  function Title(legend) {
    var $container = arguments[1] === undefined ? null : arguments[1];

    _classCallCheck(this, Title);

    _get(Object.getPrototypeOf(Title.prototype), 'constructor', this).call(this);

    this.legend = legend;

    if ($container) {
      if (typeof $container === 'string') {
        $container = document.querySelector($container);
      }

      $container.appendChild(this.render());
    }
  }

  _inherits(Title, _events$EventEmitter);

  _createClass(Title, [{
    key: 'render',
    value: function render() {
      var content = '<span class="legend">' + this.legend + '</span>';

      this.$el = document.createElement('label');
      this.$el.classList.add(styles.ns, 'title');
      this.$el.innerHTML = content;

      return this.$el;
    }
  }]);

  return Title;
})(events.EventEmitter);

module.exports = Title;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNzcy9zdHlsZXMuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxJQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDakMsSUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUM7O0lBRW5DLEtBQUs7QUFDRSxXQURQLEtBQUssQ0FDRyxNQUFNLEVBQXFCO1FBQW5CLFVBQVUsZ0NBQUcsSUFBSTs7MEJBRGpDLEtBQUs7O0FBRVAsK0JBRkUsS0FBSyw2Q0FFQzs7QUFFUixRQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQzs7QUFFckIsUUFBSSxVQUFVLEVBQUU7QUFDZCxVQUFJLE9BQU8sVUFBVSxLQUFLLFFBQVEsRUFBRTtBQUNsQyxrQkFBVSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7T0FDakQ7O0FBRUQsZ0JBQVUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7S0FDdkM7R0FDRjs7WUFiRyxLQUFLOztlQUFMLEtBQUs7O1dBZUgsa0JBQUc7QUFDUCxVQUFJLE9BQU8sNkJBQTJCLElBQUksQ0FBQyxNQUFNLFlBQVMsQ0FBQzs7QUFFM0QsVUFBSSxDQUFDLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzNDLFVBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQzNDLFVBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQzs7QUFFN0IsYUFBTyxJQUFJLENBQUMsR0FBRyxDQUFDO0tBQ2pCOzs7U0F2QkcsS0FBSztHQUFTLE1BQU0sQ0FBQyxZQUFZOztBQTBCdkMsTUFBTSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMiLCJmaWxlIjoiY3NzL3N0eWxlcy5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBldmVudHMgPSByZXF1aXJlKCdldmVudHMnKTtcbmNvbnN0IHN0eWxlcyA9IHJlcXVpcmUoJy4vdXRpbHMvc3R5bGVzJyk7XG5cbmNsYXNzIFRpdGxlIGV4dGVuZHMgZXZlbnRzLkV2ZW50RW1pdHRlciB7XG4gIGNvbnN0cnVjdG9yKGxlZ2VuZCwgJGNvbnRhaW5lciA9IG51bGwpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5sZWdlbmQgPSBsZWdlbmQ7XG5cbiAgICBpZiAoJGNvbnRhaW5lcikge1xuICAgICAgaWYgKHR5cGVvZiAkY29udGFpbmVyID09PSAnc3RyaW5nJykge1xuICAgICAgICAkY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcigkY29udGFpbmVyKTtcbiAgICAgIH1cblxuICAgICAgJGNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLnJlbmRlcigpKTtcbiAgICB9XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgbGV0IGNvbnRlbnQgPSBgPHNwYW4gY2xhc3M9XCJsZWdlbmRcIj4ke3RoaXMubGVnZW5kfTwvc3Bhbj5gO1xuXG4gICAgdGhpcy4kZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgIHRoaXMuJGVsLmNsYXNzTGlzdC5hZGQoc3R5bGVzLm5zLCAndGl0bGUnKTtcbiAgICB0aGlzLiRlbC5pbm5lckhUTUwgPSBjb250ZW50O1xuXG4gICAgcmV0dXJuIHRoaXMuJGVsO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gVGl0bGU7XG4iXX0=