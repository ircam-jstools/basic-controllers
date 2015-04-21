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
        var containerStyles = this.size === "large" ? styles.containerLargeStyles : styles.containerStyles;

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
//# sourceMappingURL=data:application/json;base64,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QUFZLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDdEQ7O0FBRUQsYUFBSyxJQUFJLElBQUksSUFBSSxNQUFNLENBQUMsVUFBVSxFQUFFO0FBQ2xDLGNBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDbEQ7T0FDRjs7QUFFRCxjQUFVO2FBQUEsc0JBQUc7OztBQUNYLFlBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQU07QUFDMUMsY0FBSSxLQUFLLEdBQUcsVUFBVSxDQUFDLE1BQUssTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzFDLGdCQUFLLE9BQU8sQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0FBQzNCLGdCQUFLLEtBQUssR0FBRyxLQUFLLENBQUM7O0FBRW5CLGdCQUFLLElBQUksQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDNUIsRUFBRSxLQUFLLENBQUMsQ0FBQzs7QUFFVixZQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxZQUFNO0FBQzNDLGNBQUksS0FBSyxHQUFHLFVBQVUsQ0FBQyxNQUFLLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUMzQyxnQkFBSyxNQUFNLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztBQUMxQixnQkFBSyxLQUFLLEdBQUcsS0FBSyxDQUFDOztBQUVuQixnQkFBSyxJQUFJLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQzVCLEVBQUUsS0FBSyxDQUFDLENBQUM7T0FDWDs7OztTQXBHRyxNQUFNO0dBQVMsTUFBTSxDQUFDLFlBQVk7O0FBdUd4QyxNQUFNLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyIsImZpbGUiOiJlczYvdXRpbHMvc3R5bGVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZXZlbnRzID0gcmVxdWlyZSgnZXZlbnRzJyk7XG5jb25zdCBzdHlsZXMgPSByZXF1aXJlKCcuL3V0aWxzL3N0eWxlcycpO1xuXG5jbGFzcyBTbGlkZXIgZXh0ZW5kcyBldmVudHMuRXZlbnRFbWl0dGVyIHtcbiAgY29uc3RydWN0b3IobGVnZW5kLCBtaW4gPSAwLCBtYXggPSAxLCBzdGVwID0gMC4wMSwgZGVmYXVsdFZhbHVlID0gMCwgdW5pdCA9ICcnLCBzaXplID0gJ2RlZmF1bHQnLCAkY29udGFpbmVyID0gbnVsbCwgY2FsbGJhY2sgPSBudWxsKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMubGVnZW5kID0gbGVnZW5kO1xuICAgIHRoaXMubWluID0gbWluO1xuICAgIHRoaXMubWF4ID0gbWF4O1xuICAgIHRoaXMuc3RlcCA9IHN0ZXA7XG4gICAgdGhpcy51bml0ID0gdW5pdDtcbiAgICB0aGlzLnNpemUgPSBzaXplO1xuICAgIHRoaXMuX3ZhbHVlID0gZGVmYXVsdFZhbHVlO1xuXG4gICAgaWYgKCRjb250YWluZXIpIHtcbiAgICAgIGlmICh0eXBlb2YgJGNvbnRhaW5lciA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgJGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJGNvbnRhaW5lcik7XG4gICAgICB9XG5cbiAgICAgICRjb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5yZW5kZXIoKSk7XG4gICAgfVxuXG4gICAgaWYgKGNhbGxiYWNrKSB7IHRoaXMub24oJ2NoYW5nZScsIGNhbGxiYWNrKTsgfVxuICB9XG5cbiAgc2V0IHZhbHVlKHZhbHVlKSB7XG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcblxuICAgIGlmICh0aGlzLiRudW1iZXIgJiYgdGhpcy4kcmFuZ2UpIHtcbiAgICAgIHRoaXMuJG51bWJlci52YWx1ZSA9IHRoaXMudmFsdWU7XG4gICAgICB0aGlzLiRyYW5nZS52YWx1ZSA9IHRoaXMudmFsdWU7XG4gICAgfVxuICB9XG5cbiAgZ2V0IHZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBsZXQgY29udGVudCA9IGA8c3BhbiBjbGFzcz1cImxlZ2VuZFwiPiR7dGhpcy5sZWdlbmR9PC9zcGFuPmAgK1xuICAgICAgYDxpbnB1dCB0eXBlPVwicmFuZ2VcIiBtaW49XCIke3RoaXMubWlufVwiIG1heD1cIiR7dGhpcy5tYXh9XCIgc3RlcD1cIiR7dGhpcy5zdGVwfVwiIHZhbHVlPVwiJHt0aGlzLnZhbHVlfVwiIC8+IGAgK1xuICAgICAgYDxpbnB1dCB0eXBlPVwibnVtYmVyXCIgbWluPVwiJHt0aGlzLm1pbn1cIiBtYXg9XCIke3RoaXMubWF4fVwiIHN0ZXA9XCIke3RoaXMuc3RlcH1cIiB2YWx1ZT1cIiR7dGhpcy52YWx1ZX1cIiAvPiBgICtcbiAgICAgIGA8c3BhbiBjbGFzcz1cInVuaXRcIj4ke3RoaXMudW5pdH08L3NwYW4+YDtcblxuICAgIHRoaXMuJGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICB0aGlzLiRlbC5pbm5lckhUTUwgPSBjb250ZW50O1xuXG4gICAgdGhpcy4kbGVnZW5kICA9IHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoJy5sZWdlbmQnKTtcbiAgICB0aGlzLiRyYW5nZSAgPSB0aGlzLiRlbC5xdWVyeVNlbGVjdG9yKGBpbnB1dFt0eXBlPVwicmFuZ2VcIl1gKTtcbiAgICB0aGlzLiRudW1iZXIgPSB0aGlzLiRlbC5xdWVyeVNlbGVjdG9yKGBpbnB1dFt0eXBlPVwibnVtYmVyXCJdYCk7XG4gICAgdGhpcy4kdW5pdCAgID0gdGhpcy4kZWwucXVlcnlTZWxlY3RvcignLnVuaXQnKTtcblxuICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICAgIHRoaXMuYWRkU3R5bGVzKCk7XG5cbiAgICByZXR1cm4gdGhpcy4kZWw7XG4gIH1cblxuICBhZGRTdHlsZXMoKSB7XG4gICAgY29uc3QgY29udGFpbmVyU3R5bGVzID0gKHRoaXMuc2l6ZSA9PT0gJ2xhcmdlJykgP1xuICAgICAgc3R5bGVzLmNvbnRhaW5lckxhcmdlU3R5bGVzIDogc3R5bGVzLmNvbnRhaW5lclN0eWxlcztcblxuICAgIGZvciAobGV0IGF0dHIgaW4gY29udGFpbmVyU3R5bGVzKSB7XG4gICAgICB0aGlzLiRlbC5zdHlsZVthdHRyXSA9IGNvbnRhaW5lclN0eWxlc1thdHRyXTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBhdHRyIGluIHN0eWxlcy5sZWdlbmRTdHlsZXMpIHtcbiAgICAgIHRoaXMuJGxlZ2VuZC5zdHlsZVthdHRyXSA9IHN0eWxlcy5sZWdlbmRTdHlsZXNbYXR0cl07XG4gICAgfVxuXG4gICAgY29uc3QgcmFuZ2VTdHlsZXMgPSAodGhpcy5zaXplID09PSAnbGFyZ2UnKSA/XG4gICAgICBzdHlsZXMucmFuZ2VTdHlsZXMgOiBzdHlsZXMucmFuZ2VEZWZhdWx0U3R5bGVzO1xuXG4gICAgZm9yIChsZXQgYXR0ciBpbiByYW5nZVN0eWxlcykge1xuICAgICAgdGhpcy4kcmFuZ2Uuc3R5bGVbYXR0cl0gPSByYW5nZVN0eWxlc1thdHRyXTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBhdHRyIGluIHN0eWxlcy5udW1iZXJTdHlsZXMpIHtcbiAgICAgIHRoaXMuJG51bWJlci5zdHlsZVthdHRyXSA9IHN0eWxlcy5udW1iZXJTdHlsZXNbYXR0cl07XG4gICAgfVxuXG4gICAgZm9yIChsZXQgYXR0ciBpbiBzdHlsZXMudW5pdFN0eWxlcykge1xuICAgICAgdGhpcy4kdW5pdC5zdHlsZVthdHRyXSA9IHN0eWxlcy51bml0U3R5bGVzW2F0dHJdO1xuICAgIH1cbiAgfVxuXG4gIGJpbmRFdmVudHMoKSB7XG4gICAgdGhpcy4kcmFuZ2UuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoKSA9PiB7XG4gICAgICBsZXQgdmFsdWUgPSBwYXJzZUZsb2F0KHRoaXMuJHJhbmdlLnZhbHVlKTtcbiAgICAgIHRoaXMuJG51bWJlci52YWx1ZSA9IHZhbHVlO1xuICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuXG4gICAgICB0aGlzLmVtaXQoJ2NoYW5nZScsIHZhbHVlKTtcbiAgICB9LCBmYWxzZSk7XG5cbiAgICB0aGlzLiRudW1iZXIuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoKSA9PiB7XG4gICAgICBsZXQgdmFsdWUgPSBwYXJzZUZsb2F0KHRoaXMuJG51bWJlci52YWx1ZSk7XG4gICAgICB0aGlzLiRyYW5nZS52YWx1ZSA9IHZhbHVlO1xuICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuXG4gICAgICB0aGlzLmVtaXQoJ2NoYW5nZScsIHZhbHVlKTtcbiAgICB9LCBmYWxzZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBTbGlkZXI7XG4iXX0=