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
    var $container = arguments[6] === undefined ? null : arguments[6];
    var callback = arguments[7] === undefined ? null : arguments[7];

    _classCallCheck(this, Slider);

    _get(_core.Object.getPrototypeOf(Slider.prototype), "constructor", this).call(this);

    this.legend = legend;
    this.min = min;
    this.max = max;
    this.step = step;
    this.unit = unit;
    this._value = defaultValue;

    if ($container) {
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

        this.$el = document.createElement("legend");
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
        for (var attr in styles.containerStyles) {
          this.$el.style[attr] = styles.containerStyles[attr];
        }

        for (var attr in styles.legendStyles) {
          this.$legend.style[attr] = styles.legendStyles[attr];
        }

        for (var attr in styles.rangeStyles) {
          this.$range.style[attr] = styles.rangeStyles[attr];
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
          var value = _this.$range.value;
          _this.$number.value = value;
          _this.value = value;

          _this.emit("change", value);
        }, false);

        this.$number.addEventListener("input", function () {
          var value = _this.$number.value;
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
//# sourceMappingURL=data:application/json;base64,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QUFDLEtBQUssR0FBRyxLQUFLLENBQUM7QUFDM0IsZ0JBQUssS0FBSyxHQUFHLEtBQUssQ0FBQzs7QUFFbkIsZ0JBQUssSUFBSSxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztTQUM1QixFQUFFLEtBQUssQ0FBQyxDQUFDOztBQUVWLFlBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQU07QUFDM0MsY0FBSSxLQUFLLEdBQUcsTUFBSyxPQUFPLENBQUMsS0FBSyxDQUFDO0FBQy9CLGdCQUFLLE1BQU0sQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0FBQzFCLGdCQUFLLEtBQUssR0FBRyxLQUFLLENBQUM7O0FBRW5CLGdCQUFLLElBQUksQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDNUIsRUFBRSxLQUFLLENBQUMsQ0FBQztPQUNYOzs7O1NBdEZHLE1BQU07R0FBUyxNQUFNLENBQUMsWUFBWTs7QUF5RnhDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDIiwiZmlsZSI6ImVzNi91dGlscy9zdHlsZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBldmVudHMgPSByZXF1aXJlKCdldmVudHMnKTtcbmNvbnN0IHN0eWxlcyA9IHJlcXVpcmUoJy4vdXRpbHMvc3R5bGVzJyk7XG5cbmNsYXNzIFNsaWRlciBleHRlbmRzIGV2ZW50cy5FdmVudEVtaXR0ZXIge1xuICBjb25zdHJ1Y3RvcihsZWdlbmQsIG1pbiA9IDAsIG1heCA9IDEsIHN0ZXAgPSAwLjAxLCBkZWZhdWx0VmFsdWUgPSAwLCB1bml0ID0gJycsICRjb250YWluZXIgPSBudWxsLCBjYWxsYmFjayA9IG51bGwpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5sZWdlbmQgPSBsZWdlbmQ7XG4gICAgdGhpcy5taW4gPSBtaW47XG4gICAgdGhpcy5tYXggPSBtYXg7XG4gICAgdGhpcy5zdGVwID0gc3RlcDtcbiAgICB0aGlzLnVuaXQgPSB1bml0O1xuICAgIHRoaXMuX3ZhbHVlID0gZGVmYXVsdFZhbHVlO1xuXG4gICAgaWYgKCRjb250YWluZXIpIHsgJGNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLnJlbmRlcigpKTsgfVxuICAgIGlmIChjYWxsYmFjaykgeyB0aGlzLm9uKCdjaGFuZ2UnLCBjYWxsYmFjayk7IH1cbiAgfVxuXG4gIHNldCB2YWx1ZSh2YWx1ZSkge1xuICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG5cbiAgICBpZiAodGhpcy4kbnVtYmVyICYmIHRoaXMuJHJhbmdlKSB7XG4gICAgICB0aGlzLiRudW1iZXIudmFsdWUgPSB0aGlzLnZhbHVlO1xuICAgICAgdGhpcy4kcmFuZ2UudmFsdWUgPSB0aGlzLnZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIGdldCB2YWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgbGV0IGNvbnRlbnQgPSBgPHNwYW4gY2xhc3M9XCJsZWdlbmRcIj4ke3RoaXMubGVnZW5kfTwvc3Bhbj5gICtcbiAgICAgIGA8aW5wdXQgdHlwZT1cInJhbmdlXCIgbWluPVwiJHt0aGlzLm1pbn1cIiBtYXg9XCIke3RoaXMubWF4fVwiIHN0ZXA9XCIke3RoaXMuc3RlcH1cIiB2YWx1ZT1cIiR7dGhpcy52YWx1ZX1cIiAvPiBgICtcbiAgICAgIGA8aW5wdXQgdHlwZT1cIm51bWJlclwiIG1pbj1cIiR7dGhpcy5taW59XCIgbWF4PVwiJHt0aGlzLm1heH1cIiBzdGVwPVwiJHt0aGlzLnN0ZXB9XCIgdmFsdWU9XCIke3RoaXMudmFsdWV9XCIgLz4gYCArXG4gICAgICBgPHNwYW4gY2xhc3M9XCJ1bml0XCI+JHt0aGlzLnVuaXR9PC9zcGFuPmA7XG5cbiAgICB0aGlzLiRlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xlZ2VuZCcpO1xuICAgIHRoaXMuJGVsLmlubmVySFRNTCA9IGNvbnRlbnQ7XG5cbiAgICB0aGlzLiRsZWdlbmQgID0gdGhpcy4kZWwucXVlcnlTZWxlY3RvcignLmxlZ2VuZCcpO1xuICAgIHRoaXMuJHJhbmdlICA9IHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoYGlucHV0W3R5cGU9XCJyYW5nZVwiXWApO1xuICAgIHRoaXMuJG51bWJlciA9IHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoYGlucHV0W3R5cGU9XCJudW1iZXJcIl1gKTtcbiAgICB0aGlzLiR1bml0ICAgPSB0aGlzLiRlbC5xdWVyeVNlbGVjdG9yKCcudW5pdCcpO1xuXG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XG4gICAgdGhpcy5hZGRTdHlsZXMoKTtcblxuICAgIHJldHVybiB0aGlzLiRlbDtcbiAgfVxuXG4gIGFkZFN0eWxlcygpIHtcbiAgICBmb3IgKGxldCBhdHRyIGluIHN0eWxlcy5jb250YWluZXJTdHlsZXMpIHtcbiAgICAgIHRoaXMuJGVsLnN0eWxlW2F0dHJdID0gc3R5bGVzLmNvbnRhaW5lclN0eWxlc1thdHRyXTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBhdHRyIGluIHN0eWxlcy5sZWdlbmRTdHlsZXMpIHtcbiAgICAgIHRoaXMuJGxlZ2VuZC5zdHlsZVthdHRyXSA9IHN0eWxlcy5sZWdlbmRTdHlsZXNbYXR0cl07XG4gICAgfVxuXG4gICAgZm9yIChsZXQgYXR0ciBpbiBzdHlsZXMucmFuZ2VTdHlsZXMpIHtcbiAgICAgIHRoaXMuJHJhbmdlLnN0eWxlW2F0dHJdID0gc3R5bGVzLnJhbmdlU3R5bGVzW2F0dHJdO1xuICAgIH1cblxuICAgIGZvciAobGV0IGF0dHIgaW4gc3R5bGVzLm51bWJlclN0eWxlcykge1xuICAgICAgdGhpcy4kbnVtYmVyLnN0eWxlW2F0dHJdID0gc3R5bGVzLm51bWJlclN0eWxlc1thdHRyXTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBhdHRyIGluIHN0eWxlcy51bml0U3R5bGVzKSB7XG4gICAgICB0aGlzLiR1bml0LnN0eWxlW2F0dHJdID0gc3R5bGVzLnVuaXRTdHlsZXNbYXR0cl07XG4gICAgfVxuICB9XG5cbiAgYmluZEV2ZW50cygpIHtcbiAgICB0aGlzLiRyYW5nZS5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsICgpID0+IHtcbiAgICAgIGxldCB2YWx1ZSA9IHRoaXMuJHJhbmdlLnZhbHVlO1xuICAgICAgdGhpcy4kbnVtYmVyLnZhbHVlID0gdmFsdWU7XG4gICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG5cbiAgICAgIHRoaXMuZW1pdCgnY2hhbmdlJywgdmFsdWUpO1xuICAgIH0sIGZhbHNlKTtcblxuICAgIHRoaXMuJG51bWJlci5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsICgpID0+IHtcbiAgICAgIGxldCB2YWx1ZSA9IHRoaXMuJG51bWJlci52YWx1ZTtcbiAgICAgIHRoaXMuJHJhbmdlLnZhbHVlID0gdmFsdWU7XG4gICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG5cbiAgICAgIHRoaXMuZW1pdCgnY2hhbmdlJywgdmFsdWUpO1xuICAgIH0sIGZhbHNlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFNsaWRlcjtcbiJdfQ==