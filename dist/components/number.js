'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _baseController = require('./base-controller');

var _baseController2 = _interopRequireDefault(_baseController);

var Number = (function (_BaseController) {
  _inherits(Number, _BaseController);

  function Number(legend) {
    var min = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
    var max = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];
    var step = arguments.length <= 3 || arguments[3] === undefined ? 0.01 : arguments[3];
    var defaultValue = arguments.length <= 4 || arguments[4] === undefined ? 0 : arguments[4];
    var $container = arguments.length <= 5 || arguments[5] === undefined ? null : arguments[5];
    var callback = arguments.length <= 6 || arguments[6] === undefined ? null : arguments[6];

    _classCallCheck(this, Number);

    _get(Object.getPrototypeOf(Number.prototype), 'constructor', this).call(this);

    this.type = 'number';
    this.legend = legend;
    this.min = 0;
    this.max = max;
    this.step = step;
    this._defaultValue = defaultValue;

    _get(Object.getPrototypeOf(Number.prototype), '_applyOptionnalParameters', this).call(this, $container, callback);
  }

  _createClass(Number, [{
    key: 'render',
    value: function render() {
      var content = '\n      <span class="legend">' + this.legend + '</span>\n      <div class="inner-wrapper">\n        <button class="prev">&lt;</button>\n        <input type="number" min="' + this.min + '" max="' + this.max + '" step="' + this.step + '" value="' + this._value + '" />\n        <button class="next">&gt;</button>\n      </div>\n    ';

      this.$el = _get(Object.getPrototypeOf(Number.prototype), 'render', this).call(this);
      this.$el.classList.add(this.type);
      this.$el.innerHTML = content;

      return this.$el;
    }
  }, {
    key: 'bindEvents',
    value: function bindEvents() {}
  }, {
    key: 'value',
    get: function get() {
      return this._value;
    },
    set: function set(value) {
      this._value = value;
    }
  }]);

  return Number;
})(_baseController2['default']);

exports['default'] = Number;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVzNi9jb21wb25lbnRzL251bWJlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OzhCQUEyQixtQkFBbUI7Ozs7SUFFekIsTUFBTTtZQUFOLE1BQU07O0FBQ2QsV0FEUSxNQUFNLENBQ2IsTUFBTSxFQUF1RjtRQUFyRixHQUFHLHlEQUFHLENBQUM7UUFBRSxHQUFHLHlEQUFHLENBQUM7UUFBRSxJQUFJLHlEQUFHLElBQUk7UUFBRSxZQUFZLHlEQUFHLENBQUM7UUFBRSxVQUFVLHlEQUFHLElBQUk7UUFBRSxRQUFRLHlEQUFHLElBQUk7OzBCQURwRixNQUFNOztBQUV2QiwrQkFGaUIsTUFBTSw2Q0FFZjs7QUFFUixRQUFJLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQztBQUNyQixRQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztBQUNyQixRQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztBQUNiLFFBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0FBQ2YsUUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7QUFDakIsUUFBSSxDQUFDLGFBQWEsR0FBRyxZQUFZLENBQUM7O0FBRWxDLCtCQVhpQixNQUFNLDJEQVdTLFVBQVUsRUFBRSxRQUFRLEVBQUU7R0FDdkQ7O2VBWmtCLE1BQU07O1dBc0JuQixrQkFBRztBQUNQLFVBQU0sT0FBTyxxQ0FDWSxJQUFJLENBQUMsTUFBTSxrSUFHSixJQUFJLENBQUMsR0FBRyxlQUFVLElBQUksQ0FBQyxHQUFHLGdCQUFXLElBQUksQ0FBQyxJQUFJLGlCQUFZLElBQUksQ0FBQyxNQUFNLHlFQUdwRyxDQUFDOztBQUVGLFVBQUksQ0FBQyxHQUFHLDhCQWhDUyxNQUFNLHVDQWdDRSxDQUFDO0FBQzFCLFVBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDbEMsVUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDOztBQUU3QixhQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7S0FDakI7OztXQUVTLHNCQUFHLEVBRVo7OztTQTNCUSxlQUFHO0FBQ1YsYUFBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0tBQ3BCO1NBRVEsYUFBQyxLQUFLLEVBQUU7QUFDZixVQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztLQUNyQjs7O1NBcEJrQixNQUFNOzs7cUJBQU4sTUFBTSIsImZpbGUiOiJlczYvY29tcG9uZW50cy9udW1iZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFzZUNvbnRyb2xsZXIgZnJvbSAnLi9iYXNlLWNvbnRyb2xsZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOdW1iZXIgZXh0ZW5kcyBCYXNlQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKGxlZ2VuZCwgbWluID0gMCwgbWF4ID0gMSwgc3RlcCA9IDAuMDEsIGRlZmF1bHRWYWx1ZSA9IDAsICRjb250YWluZXIgPSBudWxsLCBjYWxsYmFjayA9IG51bGwpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy50eXBlID0gJ251bWJlcic7XG4gICAgdGhpcy5sZWdlbmQgPSBsZWdlbmQ7XG4gICAgdGhpcy5taW4gPSAwO1xuICAgIHRoaXMubWF4ID0gbWF4O1xuICAgIHRoaXMuc3RlcCA9IHN0ZXA7XG4gICAgdGhpcy5fZGVmYXVsdFZhbHVlID0gZGVmYXVsdFZhbHVlO1xuXG4gICAgc3VwZXIuX2FwcGx5T3B0aW9ubmFsUGFyYW1ldGVycygkY29udGFpbmVyLCBjYWxsYmFjayk7XG4gIH1cblxuICBnZXQgdmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICB9XG5cbiAgc2V0IHZhbHVlKHZhbHVlKSB7XG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBjb250ZW50ID0gYFxuICAgICAgPHNwYW4gY2xhc3M9XCJsZWdlbmRcIj4ke3RoaXMubGVnZW5kfTwvc3Bhbj5cbiAgICAgIDxkaXYgY2xhc3M9XCJpbm5lci13cmFwcGVyXCI+XG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJwcmV2XCI+Jmx0OzwvYnV0dG9uPlxuICAgICAgICA8aW5wdXQgdHlwZT1cIm51bWJlclwiIG1pbj1cIiR7dGhpcy5taW59XCIgbWF4PVwiJHt0aGlzLm1heH1cIiBzdGVwPVwiJHt0aGlzLnN0ZXB9XCIgdmFsdWU9XCIke3RoaXMuX3ZhbHVlfVwiIC8+XG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJuZXh0XCI+Jmd0OzwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgYDtcblxuICAgIHRoaXMuJGVsID0gc3VwZXIucmVuZGVyKCk7XG4gICAgdGhpcy4kZWwuY2xhc3NMaXN0LmFkZCh0aGlzLnR5cGUpO1xuICAgIHRoaXMuJGVsLmlubmVySFRNTCA9IGNvbnRlbnQ7XG5cbiAgICByZXR1cm4gdGhpcy4kZWw7XG4gIH1cblxuICBiaW5kRXZlbnRzKCkge1xuXG4gIH1cbn0iXX0=