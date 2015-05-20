'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _get = require('babel-runtime/helpers/get')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var events = require('events');
var styles = require('./utils/styles');

var Slider = (function (_events$EventEmitter) {
  function Slider(legend) {
    var min = arguments[1] === undefined ? 0 : arguments[1];
    var max = arguments[2] === undefined ? 1 : arguments[2];
    var step = arguments[3] === undefined ? 0.01 : arguments[3];
    var defaultValue = arguments[4] === undefined ? 0 : arguments[4];
    var unit = arguments[5] === undefined ? '' : arguments[5];
    var size = arguments[6] === undefined ? 'default' : arguments[6];
    var $container = arguments[7] === undefined ? null : arguments[7];
    var callback = arguments[8] === undefined ? null : arguments[8];

    _classCallCheck(this, Slider);

    _get(Object.getPrototypeOf(Slider.prototype), 'constructor', this).call(this);

    this.legend = legend;
    this.min = min;
    this.max = max;
    this.step = step;
    this.unit = unit;
    this.size = size;
    this._value = defaultValue;

    if ($container) {
      if (typeof $container === 'string') {
        $container = document.querySelector($container);
      }

      $container.appendChild(this.render());
    }

    if (callback) {
      this.on('change', callback);
    }
  }

  _inherits(Slider, _events$EventEmitter);

  _createClass(Slider, [{
    key: 'value',
    set: function (value) {
      this._value = value;

      if (this.$number && this.$range) {
        this.$number.value = this.value;
        this.$range.value = this.value;
      }
    },
    get: function () {
      return this._value;
    }
  }, {
    key: 'render',
    value: function render() {
      var content = '<span class="legend">' + this.legend + '</span>\n      <div class="inner-wrapper ' + this.size + '">\n        <input class="range" type="range" min="' + this.min + '" max="' + this.max + '" step="' + this.step + '" value="' + this.value + '" />\n\n        <div class="number-controller">\n          <input type="number" class="number" min="' + this.min + '" max="' + this.max + '" step="' + this.step + '" value="' + this.value + '" />\n          <span class="unit">' + this.unit + '</span>\n        </div>\n      </div>';

      this.$el = document.createElement('label');
      this.$el.classList.add(styles.ns, 'slider');
      this.$el.innerHTML = content;

      this.$legend = this.$el.querySelector('.legend');
      this.$range = this.$el.querySelector('input[type="range"]');
      this.$number = this.$el.querySelector('input[type="number"]');
      this.$unit = this.$el.querySelector('.unit');

      this.bindEvents();
      this.addStyles();

      return this.$el;
    }
  }, {
    key: 'addStyles',
    value: function addStyles() {
      styles.insertRules('.slider', styles.containerStyles);
      styles.insertRules('.slider .legend', styles.legendStyles);

      styles.insertRules('.slider .inner-wrapper', styles.innerWrapper);
      // styles.insertRules('.slider .inner-wrapper', styles.sliderInnerWrapper);

      styles.insertRules('.slider .inner-wrapper .range', styles.rangeDefaultStyles);
      styles.insertRules('.slider .inner-wrapper.large .range', styles.rangeLargeStyles);
      styles.insertRules('.slider .inner-wrapper.small .range', styles.rangeSmallStyles);

      styles.insertRules('.slider .inner-wrapper .number-controller', styles.numberDefaultController);
      styles.insertRules('.slider .inner-wrapper.large .number-controller', styles.numberController);
      styles.insertRules('.slider .inner-wrapper.small .number-controller', styles.numberController);

      styles.insertRules('.slider .inner-wrapper .number-controller .number', styles.numberStyles);
      styles.insertRules('.slider .inner-wrapper .number-controller .unit', styles.unitStyles);
    }
  }, {
    key: 'bindEvents',
    value: function bindEvents() {
      var _this = this;

      this.$range.addEventListener('input', function () {
        var value = parseFloat(_this.$range.value);
        _this.$number.value = value;
        _this.value = value;

        _this.emit('change', value);
      }, false);

      this.$number.addEventListener('change', function () {
        var value = parseFloat(_this.$number.value);
        _this.$range.value = value;
        _this.value = value;

        _this.emit('change', value);
      }, false);
    }
  }]);

  return Slider;
})(events.EventEmitter);

module.exports = Slider;
//# sourceMappingURL=data:application/json;base64,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Q0FBQyxZQUFZLENBQUMsQ0FBQztBQUM3RixZQUFNLENBQUMsV0FBVyxDQUFDLGlEQUFpRCxFQUFFLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztLQUMxRjs7O1dBRVMsc0JBQUc7OztBQUNYLFVBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQU07QUFDMUMsWUFBSSxLQUFLLEdBQUcsVUFBVSxDQUFDLE1BQUssTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzFDLGNBQUssT0FBTyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7QUFDM0IsY0FBSyxLQUFLLEdBQUcsS0FBSyxDQUFDOztBQUVuQixjQUFLLElBQUksQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7T0FDNUIsRUFBRSxLQUFLLENBQUMsQ0FBQzs7QUFFVixVQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxZQUFNO0FBQzVDLFlBQUksS0FBSyxHQUFHLFVBQVUsQ0FBQyxNQUFLLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUMzQyxjQUFLLE1BQU0sQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0FBQzFCLGNBQUssS0FBSyxHQUFHLEtBQUssQ0FBQzs7QUFFbkIsY0FBSyxJQUFJLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO09BQzVCLEVBQUUsS0FBSyxDQUFDLENBQUM7S0FDWDs7O1NBakdHLE1BQU07R0FBUyxNQUFNLENBQUMsWUFBWTs7QUFvR3hDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDIiwiZmlsZSI6ImVzNi91dGlscy9zdHlsZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBldmVudHMgPSByZXF1aXJlKCdldmVudHMnKTtcbmNvbnN0IHN0eWxlcyA9IHJlcXVpcmUoJy4vdXRpbHMvc3R5bGVzJyk7XG5cbmNsYXNzIFNsaWRlciBleHRlbmRzIGV2ZW50cy5FdmVudEVtaXR0ZXIge1xuICBjb25zdHJ1Y3RvcihsZWdlbmQsIG1pbiA9IDAsIG1heCA9IDEsIHN0ZXAgPSAwLjAxLCBkZWZhdWx0VmFsdWUgPSAwLCB1bml0ID0gJycsIHNpemUgPSAnZGVmYXVsdCcsICRjb250YWluZXIgPSBudWxsLCBjYWxsYmFjayA9IG51bGwpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5sZWdlbmQgPSBsZWdlbmQ7XG4gICAgdGhpcy5taW4gPSBtaW47XG4gICAgdGhpcy5tYXggPSBtYXg7XG4gICAgdGhpcy5zdGVwID0gc3RlcDtcbiAgICB0aGlzLnVuaXQgPSB1bml0O1xuICAgIHRoaXMuc2l6ZSA9IHNpemU7XG4gICAgdGhpcy5fdmFsdWUgPSBkZWZhdWx0VmFsdWU7XG5cbiAgICBpZiAoJGNvbnRhaW5lcikge1xuICAgICAgaWYgKHR5cGVvZiAkY29udGFpbmVyID09PSAnc3RyaW5nJykge1xuICAgICAgICAkY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcigkY29udGFpbmVyKTtcbiAgICAgIH1cblxuICAgICAgJGNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLnJlbmRlcigpKTtcbiAgICB9XG5cbiAgICBpZiAoY2FsbGJhY2spIHsgdGhpcy5vbignY2hhbmdlJywgY2FsbGJhY2spOyB9XG4gIH1cblxuICBzZXQgdmFsdWUodmFsdWUpIHtcbiAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuXG4gICAgaWYgKHRoaXMuJG51bWJlciAmJiB0aGlzLiRyYW5nZSkge1xuICAgICAgdGhpcy4kbnVtYmVyLnZhbHVlID0gdGhpcy52YWx1ZTtcbiAgICAgIHRoaXMuJHJhbmdlLnZhbHVlID0gdGhpcy52YWx1ZTtcbiAgICB9XG4gIH1cblxuICBnZXQgdmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGxldCBjb250ZW50ID0gYDxzcGFuIGNsYXNzPVwibGVnZW5kXCI+JHt0aGlzLmxlZ2VuZH08L3NwYW4+XG4gICAgICA8ZGl2IGNsYXNzPVwiaW5uZXItd3JhcHBlciAke3RoaXMuc2l6ZX1cIj5cbiAgICAgICAgPGlucHV0IGNsYXNzPVwicmFuZ2VcIiB0eXBlPVwicmFuZ2VcIiBtaW49XCIke3RoaXMubWlufVwiIG1heD1cIiR7dGhpcy5tYXh9XCIgc3RlcD1cIiR7dGhpcy5zdGVwfVwiIHZhbHVlPVwiJHt0aGlzLnZhbHVlfVwiIC8+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm51bWJlci1jb250cm9sbGVyXCI+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJudW1iZXJcIiBjbGFzcz1cIm51bWJlclwiIG1pbj1cIiR7dGhpcy5taW59XCIgbWF4PVwiJHt0aGlzLm1heH1cIiBzdGVwPVwiJHt0aGlzLnN0ZXB9XCIgdmFsdWU9XCIke3RoaXMudmFsdWV9XCIgLz5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cInVuaXRcIj4ke3RoaXMudW5pdH08L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+YDtcblxuICAgIHRoaXMuJGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICB0aGlzLiRlbC5jbGFzc0xpc3QuYWRkKHN0eWxlcy5ucywgJ3NsaWRlcicpO1xuICAgIHRoaXMuJGVsLmlubmVySFRNTCA9IGNvbnRlbnQ7XG5cbiAgICB0aGlzLiRsZWdlbmQgID0gdGhpcy4kZWwucXVlcnlTZWxlY3RvcignLmxlZ2VuZCcpO1xuICAgIHRoaXMuJHJhbmdlICA9IHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoYGlucHV0W3R5cGU9XCJyYW5nZVwiXWApO1xuICAgIHRoaXMuJG51bWJlciA9IHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoYGlucHV0W3R5cGU9XCJudW1iZXJcIl1gKTtcbiAgICB0aGlzLiR1bml0ICAgPSB0aGlzLiRlbC5xdWVyeVNlbGVjdG9yKCcudW5pdCcpO1xuXG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XG4gICAgdGhpcy5hZGRTdHlsZXMoKTtcblxuICAgIHJldHVybiB0aGlzLiRlbDtcbiAgfVxuXG4gIGFkZFN0eWxlcygpIHtcbiAgICBzdHlsZXMuaW5zZXJ0UnVsZXMoJy5zbGlkZXInLCBzdHlsZXMuY29udGFpbmVyU3R5bGVzKTtcbiAgICBzdHlsZXMuaW5zZXJ0UnVsZXMoJy5zbGlkZXIgLmxlZ2VuZCcsIHN0eWxlcy5sZWdlbmRTdHlsZXMpO1xuXG4gICAgc3R5bGVzLmluc2VydFJ1bGVzKCcuc2xpZGVyIC5pbm5lci13cmFwcGVyJywgc3R5bGVzLmlubmVyV3JhcHBlcik7XG4gICAgLy8gc3R5bGVzLmluc2VydFJ1bGVzKCcuc2xpZGVyIC5pbm5lci13cmFwcGVyJywgc3R5bGVzLnNsaWRlcklubmVyV3JhcHBlcik7XG5cbiAgICBzdHlsZXMuaW5zZXJ0UnVsZXMoJy5zbGlkZXIgLmlubmVyLXdyYXBwZXIgLnJhbmdlJywgc3R5bGVzLnJhbmdlRGVmYXVsdFN0eWxlcyk7XG4gICAgc3R5bGVzLmluc2VydFJ1bGVzKCcuc2xpZGVyIC5pbm5lci13cmFwcGVyLmxhcmdlIC5yYW5nZScsIHN0eWxlcy5yYW5nZUxhcmdlU3R5bGVzKTtcbiAgICBzdHlsZXMuaW5zZXJ0UnVsZXMoJy5zbGlkZXIgLmlubmVyLXdyYXBwZXIuc21hbGwgLnJhbmdlJywgc3R5bGVzLnJhbmdlU21hbGxTdHlsZXMpO1xuXG4gICAgc3R5bGVzLmluc2VydFJ1bGVzKCcuc2xpZGVyIC5pbm5lci13cmFwcGVyIC5udW1iZXItY29udHJvbGxlcicsIHN0eWxlcy5udW1iZXJEZWZhdWx0Q29udHJvbGxlcik7XG4gICAgc3R5bGVzLmluc2VydFJ1bGVzKCcuc2xpZGVyIC5pbm5lci13cmFwcGVyLmxhcmdlIC5udW1iZXItY29udHJvbGxlcicsIHN0eWxlcy5udW1iZXJDb250cm9sbGVyKTtcbiAgICBzdHlsZXMuaW5zZXJ0UnVsZXMoJy5zbGlkZXIgLmlubmVyLXdyYXBwZXIuc21hbGwgLm51bWJlci1jb250cm9sbGVyJywgc3R5bGVzLm51bWJlckNvbnRyb2xsZXIpO1xuXG4gICAgc3R5bGVzLmluc2VydFJ1bGVzKCcuc2xpZGVyIC5pbm5lci13cmFwcGVyIC5udW1iZXItY29udHJvbGxlciAubnVtYmVyJywgc3R5bGVzLm51bWJlclN0eWxlcyk7XG4gICAgc3R5bGVzLmluc2VydFJ1bGVzKCcuc2xpZGVyIC5pbm5lci13cmFwcGVyIC5udW1iZXItY29udHJvbGxlciAudW5pdCcsIHN0eWxlcy51bml0U3R5bGVzKTtcbiAgfVxuXG4gIGJpbmRFdmVudHMoKSB7XG4gICAgdGhpcy4kcmFuZ2UuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoKSA9PiB7XG4gICAgICBsZXQgdmFsdWUgPSBwYXJzZUZsb2F0KHRoaXMuJHJhbmdlLnZhbHVlKTtcbiAgICAgIHRoaXMuJG51bWJlci52YWx1ZSA9IHZhbHVlO1xuICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuXG4gICAgICB0aGlzLmVtaXQoJ2NoYW5nZScsIHZhbHVlKTtcbiAgICB9LCBmYWxzZSk7XG5cbiAgICB0aGlzLiRudW1iZXIuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICAgICAgbGV0IHZhbHVlID0gcGFyc2VGbG9hdCh0aGlzLiRudW1iZXIudmFsdWUpO1xuICAgICAgdGhpcy4kcmFuZ2UudmFsdWUgPSB2YWx1ZTtcbiAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcblxuICAgICAgdGhpcy5lbWl0KCdjaGFuZ2UnLCB2YWx1ZSk7XG4gICAgfSwgZmFsc2UpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gU2xpZGVyO1xuIl19