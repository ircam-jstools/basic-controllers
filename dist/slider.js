"use strict";

var _classCallCheck = require("babel-runtime/helpers/class-call-check")["default"];

var _inherits = require("babel-runtime/helpers/inherits")["default"];

var _get = require("babel-runtime/helpers/get")["default"];

var _createClass = require("babel-runtime/helpers/create-class")["default"];

var _core = require("babel-runtime/core-js")["default"];

var events = require("events");
var styles = require("./utils/styles");

var Slider = (function (_events$EventEmitter) {
  function Slider(legend) {
    var min = arguments[1] === undefined ? 0 : arguments[1];
    var max = arguments[2] === undefined ? 1 : arguments[2];
    var step = arguments[3] === undefined ? 0.01 : arguments[3];
    var defaultValue = arguments[4] === undefined ? 0 : arguments[4];
    var unit = arguments[5] === undefined ? "" : arguments[5];
    var size = arguments[6] === undefined ? "default" : arguments[6];
    var $container = arguments[7] === undefined ? null : arguments[7];
    var callback = arguments[8] === undefined ? null : arguments[8];

    _classCallCheck(this, Slider);

    _get(_core.Object.getPrototypeOf(Slider.prototype), "constructor", this).call(this);

    this.legend = legend;
    this.min = min;
    this.max = max;
    this.step = step;
    this.unit = unit;
    this.size = size;
    this._value = defaultValue;

    if ($container) {
      if (typeof $container === "string") {
        $container = document.querySelector($container);
      }

      $container.appendChild(this.render());
    }

    if (callback) {
      this.on("change", callback);
    }
  }

  _inherits(Slider, _events$EventEmitter);

  _createClass(Slider, {
    value: {
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
    },
    render: {
      value: function render() {
        var content = "<span class=\"legend\">" + this.legend + "</span>" + ("<input type=\"range\" min=\"" + this.min + "\" max=\"" + this.max + "\" step=\"" + this.step + "\" value=\"" + this.value + "\" /> ") + ("<input type=\"number\" min=\"" + this.min + "\" max=\"" + this.max + "\" step=\"" + this.step + "\" value=\"" + this.value + "\" /> ") + ("<span class=\"unit\">" + this.unit + "</span>");

        this.$el = document.createElement("label");
        this.$el.innerHTML = content;

        this.$legend = this.$el.querySelector(".legend");
        this.$range = this.$el.querySelector("input[type=\"range\"]");
        this.$number = this.$el.querySelector("input[type=\"number\"]");
        this.$unit = this.$el.querySelector(".unit");

        this.bindEvents();
        this.addStyles();

        return this.$el;
      }
    },
    addStyles: {
      value: function addStyles() {
        var containerStyles = this.size === "large" ? styles.containerStyles : styles.containerStyles;

        for (var attr in containerStyles) {
          this.$el.style[attr] = containerStyles[attr];
        }

        for (var attr in styles.legendStyles) {
          this.$legend.style[attr] = styles.legendStyles[attr];
        }

        var rangeStyles = this.size === "large" ? styles.rangeStyles : styles.rangeDefaultStyles;

        for (var attr in rangeStyles) {
          this.$range.style[attr] = rangeStyles[attr];
        }

        for (var attr in styles.numberStyles) {
          this.$number.style[attr] = styles.numberStyles[attr];
        }

        for (var attr in styles.unitStyles) {
          this.$unit.style[attr] = styles.unitStyles[attr];
        }
      }
    },
    bindEvents: {
      value: function bindEvents() {
        var _this = this;

        this.$range.addEventListener("input", function () {
          var value = parseFloat(_this.$range.value);
          _this.$number.value = value;
          _this.value = value;

          _this.emit("change", value);
        }, false);

        this.$number.addEventListener("input", function () {
          var value = parseFloat(_this.$number.value);
          _this.$range.value = value;
          _this.value = value;

          _this.emit("change", value);
        }, false);
      }
    }
  });

  return Slider;
})(events.EventEmitter);

module.exports = Slider;
//# sourceMappingURL=data:application/json;base64,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WSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3REOztBQUVELGFBQUssSUFBSSxJQUFJLElBQUksTUFBTSxDQUFDLFVBQVUsRUFBRTtBQUNsQyxjQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2xEO09BQ0Y7O0FBRUQsY0FBVTthQUFBLHNCQUFHOzs7QUFDWCxZQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxZQUFNO0FBQzFDLGNBQUksS0FBSyxHQUFHLFVBQVUsQ0FBQyxNQUFLLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUMxQyxnQkFBSyxPQUFPLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztBQUMzQixnQkFBSyxLQUFLLEdBQUcsS0FBSyxDQUFDOztBQUVuQixnQkFBSyxJQUFJLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQzVCLEVBQUUsS0FBSyxDQUFDLENBQUM7O0FBRVYsWUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBTTtBQUMzQyxjQUFJLEtBQUssR0FBRyxVQUFVLENBQUMsTUFBSyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDM0MsZ0JBQUssTUFBTSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7QUFDMUIsZ0JBQUssS0FBSyxHQUFHLEtBQUssQ0FBQzs7QUFFbkIsZ0JBQUssSUFBSSxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztTQUM1QixFQUFFLEtBQUssQ0FBQyxDQUFDO09BQ1g7Ozs7U0FwR0csTUFBTTtHQUFTLE1BQU0sQ0FBQyxZQUFZOztBQXVHeEMsTUFBTSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMiLCJmaWxlIjoiZXM2L3V0aWxzL3N0eWxlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGV2ZW50cyA9IHJlcXVpcmUoJ2V2ZW50cycpO1xuY29uc3Qgc3R5bGVzID0gcmVxdWlyZSgnLi91dGlscy9zdHlsZXMnKTtcblxuY2xhc3MgU2xpZGVyIGV4dGVuZHMgZXZlbnRzLkV2ZW50RW1pdHRlciB7XG4gIGNvbnN0cnVjdG9yKGxlZ2VuZCwgbWluID0gMCwgbWF4ID0gMSwgc3RlcCA9IDAuMDEsIGRlZmF1bHRWYWx1ZSA9IDAsIHVuaXQgPSAnJywgc2l6ZSA9ICdkZWZhdWx0JywgJGNvbnRhaW5lciA9IG51bGwsIGNhbGxiYWNrID0gbnVsbCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLmxlZ2VuZCA9IGxlZ2VuZDtcbiAgICB0aGlzLm1pbiA9IG1pbjtcbiAgICB0aGlzLm1heCA9IG1heDtcbiAgICB0aGlzLnN0ZXAgPSBzdGVwO1xuICAgIHRoaXMudW5pdCA9IHVuaXQ7XG4gICAgdGhpcy5zaXplID0gc2l6ZTtcbiAgICB0aGlzLl92YWx1ZSA9IGRlZmF1bHRWYWx1ZTtcblxuICAgIGlmICgkY29udGFpbmVyKSB7XG4gICAgICBpZiAodHlwZW9mICRjb250YWluZXIgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICRjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCRjb250YWluZXIpO1xuICAgICAgfVxuXG4gICAgICAkY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMucmVuZGVyKCkpO1xuICAgIH1cblxuICAgIGlmIChjYWxsYmFjaykgeyB0aGlzLm9uKCdjaGFuZ2UnLCBjYWxsYmFjayk7IH1cbiAgfVxuXG4gIHNldCB2YWx1ZSh2YWx1ZSkge1xuICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG5cbiAgICBpZiAodGhpcy4kbnVtYmVyICYmIHRoaXMuJHJhbmdlKSB7XG4gICAgICB0aGlzLiRudW1iZXIudmFsdWUgPSB0aGlzLnZhbHVlO1xuICAgICAgdGhpcy4kcmFuZ2UudmFsdWUgPSB0aGlzLnZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIGdldCB2YWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgbGV0IGNvbnRlbnQgPSBgPHNwYW4gY2xhc3M9XCJsZWdlbmRcIj4ke3RoaXMubGVnZW5kfTwvc3Bhbj5gICtcbiAgICAgIGA8aW5wdXQgdHlwZT1cInJhbmdlXCIgbWluPVwiJHt0aGlzLm1pbn1cIiBtYXg9XCIke3RoaXMubWF4fVwiIHN0ZXA9XCIke3RoaXMuc3RlcH1cIiB2YWx1ZT1cIiR7dGhpcy52YWx1ZX1cIiAvPiBgICtcbiAgICAgIGA8aW5wdXQgdHlwZT1cIm51bWJlclwiIG1pbj1cIiR7dGhpcy5taW59XCIgbWF4PVwiJHt0aGlzLm1heH1cIiBzdGVwPVwiJHt0aGlzLnN0ZXB9XCIgdmFsdWU9XCIke3RoaXMudmFsdWV9XCIgLz4gYCArXG4gICAgICBgPHNwYW4gY2xhc3M9XCJ1bml0XCI+JHt0aGlzLnVuaXR9PC9zcGFuPmA7XG5cbiAgICB0aGlzLiRlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgdGhpcy4kZWwuaW5uZXJIVE1MID0gY29udGVudDtcblxuICAgIHRoaXMuJGxlZ2VuZCAgPSB0aGlzLiRlbC5xdWVyeVNlbGVjdG9yKCcubGVnZW5kJyk7XG4gICAgdGhpcy4kcmFuZ2UgID0gdGhpcy4kZWwucXVlcnlTZWxlY3RvcihgaW5wdXRbdHlwZT1cInJhbmdlXCJdYCk7XG4gICAgdGhpcy4kbnVtYmVyID0gdGhpcy4kZWwucXVlcnlTZWxlY3RvcihgaW5wdXRbdHlwZT1cIm51bWJlclwiXWApO1xuICAgIHRoaXMuJHVuaXQgICA9IHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoJy51bml0Jyk7XG5cbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgICB0aGlzLmFkZFN0eWxlcygpO1xuXG4gICAgcmV0dXJuIHRoaXMuJGVsO1xuICB9XG5cbiAgYWRkU3R5bGVzKCkge1xuICAgIGNvbnN0IGNvbnRhaW5lclN0eWxlcyA9ICh0aGlzLnNpemUgPT09ICdsYXJnZScpID9cbiAgICAgIHN0eWxlcy5jb250YWluZXJTdHlsZXMgOiBzdHlsZXMuY29udGFpbmVyU3R5bGVzO1xuXG4gICAgZm9yIChsZXQgYXR0ciBpbiBjb250YWluZXJTdHlsZXMpIHtcbiAgICAgIHRoaXMuJGVsLnN0eWxlW2F0dHJdID0gY29udGFpbmVyU3R5bGVzW2F0dHJdO1xuICAgIH1cblxuICAgIGZvciAobGV0IGF0dHIgaW4gc3R5bGVzLmxlZ2VuZFN0eWxlcykge1xuICAgICAgdGhpcy4kbGVnZW5kLnN0eWxlW2F0dHJdID0gc3R5bGVzLmxlZ2VuZFN0eWxlc1thdHRyXTtcbiAgICB9XG5cbiAgICBjb25zdCByYW5nZVN0eWxlcyA9ICh0aGlzLnNpemUgPT09ICdsYXJnZScpID9cbiAgICAgIHN0eWxlcy5yYW5nZVN0eWxlcyA6IHN0eWxlcy5yYW5nZURlZmF1bHRTdHlsZXM7XG5cbiAgICBmb3IgKGxldCBhdHRyIGluIHJhbmdlU3R5bGVzKSB7XG4gICAgICB0aGlzLiRyYW5nZS5zdHlsZVthdHRyXSA9IHJhbmdlU3R5bGVzW2F0dHJdO1xuICAgIH1cblxuICAgIGZvciAobGV0IGF0dHIgaW4gc3R5bGVzLm51bWJlclN0eWxlcykge1xuICAgICAgdGhpcy4kbnVtYmVyLnN0eWxlW2F0dHJdID0gc3R5bGVzLm51bWJlclN0eWxlc1thdHRyXTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBhdHRyIGluIHN0eWxlcy51bml0U3R5bGVzKSB7XG4gICAgICB0aGlzLiR1bml0LnN0eWxlW2F0dHJdID0gc3R5bGVzLnVuaXRTdHlsZXNbYXR0cl07XG4gICAgfVxuICB9XG5cbiAgYmluZEV2ZW50cygpIHtcbiAgICB0aGlzLiRyYW5nZS5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsICgpID0+IHtcbiAgICAgIGxldCB2YWx1ZSA9IHBhcnNlRmxvYXQodGhpcy4kcmFuZ2UudmFsdWUpO1xuICAgICAgdGhpcy4kbnVtYmVyLnZhbHVlID0gdmFsdWU7XG4gICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG5cbiAgICAgIHRoaXMuZW1pdCgnY2hhbmdlJywgdmFsdWUpO1xuICAgIH0sIGZhbHNlKTtcblxuICAgIHRoaXMuJG51bWJlci5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsICgpID0+IHtcbiAgICAgIGxldCB2YWx1ZSA9IHBhcnNlRmxvYXQodGhpcy4kbnVtYmVyLnZhbHVlKTtcbiAgICAgIHRoaXMuJHJhbmdlLnZhbHVlID0gdmFsdWU7XG4gICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG5cbiAgICAgIHRoaXMuZW1pdCgnY2hhbmdlJywgdmFsdWUpO1xuICAgIH0sIGZhbHNlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFNsaWRlcjtcbiJdfQ==