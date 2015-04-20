"use strict";

var _classCallCheck = require("babel-runtime/helpers/class-call-check")["default"];

var _inherits = require("babel-runtime/helpers/inherits")["default"];

var _get = require("babel-runtime/helpers/get")["default"];

var _createClass = require("babel-runtime/helpers/create-class")["default"];

var _core = require("babel-runtime/core-js")["default"];

var events = require("events");

var containerStyles = {
  width: "440px",
  height: "30px",
  display: "block",
  padding: "4px",
  margin: "2px",
  backgroundColor: "#efefef",
  border: "1px solid #aaaaaa" };

var legendStyles = {
  color: "#464646",
  font: "normal bold 12px arial",
  lineHeight: "22px",
  height: "22px",
  display: "inline-block",
  width: "140px",
  overflow: "hidden",
  textAlign: "right",
  padding: 0,
  paddingRight: "6px"
};

var rangeStyles = {
  height: "22px",
  width: "200px",
  display: "inline-block" };

var numberStyles = {
  height: "22px",
  width: "54px",
  position: "relative",
  top: "-7px",
  left: "5px",
  font: "normal normal 12px arial",
  border: "none",
  background: "none",
  paddingLeft: "4px",
  display: "inline-block" };

var unitStyles = {
  font: "italic normal 12px arial",
  lineHeight: "22px",
  height: "22px",
  display: "inline-block",
  position: "relative",
  top: "-7px",
  paddingLeft: "5px",
  color: "#565656"
};

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
        for (var attr in containerStyles) {
          this.$el.style[attr] = containerStyles[attr];
        }

        for (var attr in legendStyles) {
          this.$legend.style[attr] = legendStyles[attr];
        }

        for (var attr in rangeStyles) {
          this.$range.style[attr] = rangeStyles[attr];
        }

        for (var attr in numberStyles) {
          this.$number.style[attr] = numberStyles[attr];
        }

        for (var attr in unitStyles) {
          this.$unit.style[attr] = unitStyles[attr];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVzNi9zbGlkZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsSUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDOztBQUVqQyxJQUFNLGVBQWUsR0FBRztBQUN0QixPQUFLLEVBQUUsT0FBTztBQUNkLFFBQU0sRUFBRSxNQUFNO0FBQ2QsU0FBTyxFQUFFLE9BQU87QUFDaEIsU0FBTyxFQUFFLEtBQUs7QUFDZCxRQUFNLEVBQUUsS0FBSztBQUNiLGlCQUFlLEVBQUUsU0FBUztBQUMxQixRQUFNLEVBQUUsbUJBQW1CLEVBQzVCLENBQUM7O0FBRUYsSUFBTSxZQUFZLEdBQUc7QUFDbkIsT0FBSyxFQUFFLFNBQVM7QUFDaEIsTUFBSSxFQUFFLHdCQUF3QjtBQUM5QixZQUFVLEVBQUUsTUFBTTtBQUNsQixRQUFNLEVBQUUsTUFBTTtBQUNkLFNBQU8sRUFBRSxjQUFjO0FBQ3ZCLE9BQUssRUFBRSxPQUFPO0FBQ2QsVUFBUSxFQUFFLFFBQVE7QUFDbEIsV0FBUyxFQUFFLE9BQU87QUFDbEIsU0FBTyxFQUFFLENBQUM7QUFDVixjQUFZLEVBQUUsS0FBSztDQUNwQixDQUFDOztBQUVGLElBQU0sV0FBVyxHQUFHO0FBQ2xCLFFBQU0sRUFBRSxNQUFNO0FBQ2QsT0FBSyxFQUFFLE9BQU87QUFDZCxTQUFPLEVBQUUsY0FBYyxFQUN4QixDQUFDOztBQUVGLElBQU0sWUFBWSxHQUFHO0FBQ25CLFFBQU0sRUFBRSxNQUFNO0FBQ2QsT0FBSyxFQUFFLE1BQU07QUFDYixVQUFRLEVBQUUsVUFBVTtBQUNwQixLQUFHLEVBQUUsTUFBTTtBQUNYLE1BQUksRUFBRSxLQUFLO0FBQ1gsTUFBSSxFQUFFLDBCQUEwQjtBQUNoQyxRQUFNLEVBQUUsTUFBTTtBQUNkLFlBQVUsRUFBRSxNQUFNO0FBQ2xCLGFBQVcsRUFBRSxLQUFLO0FBQ2xCLFNBQU8sRUFBRSxjQUFjLEVBQ3hCLENBQUM7O0FBRUYsSUFBTSxVQUFVLEdBQUc7QUFDakIsTUFBSSxFQUFFLDBCQUEwQjtBQUNoQyxZQUFVLEVBQUUsTUFBTTtBQUNsQixRQUFNLEVBQUUsTUFBTTtBQUNkLFNBQU8sRUFBRSxjQUFjO0FBQ3ZCLFVBQVEsRUFBRSxVQUFVO0FBQ3BCLEtBQUcsRUFBRSxNQUFNO0FBQ1gsYUFBVyxFQUFFLEtBQUs7QUFDbEIsT0FBSyxFQUFFLFNBQVM7Q0FDakIsQ0FBQzs7SUFFSSxNQUFNO0FBQ0MsV0FEUCxNQUFNLENBQ0UsTUFBTSxFQUFrRztRQUFoRyxHQUFHLGdDQUFHLENBQUM7UUFBRSxHQUFHLGdDQUFHLENBQUM7UUFBRSxJQUFJLGdDQUFHLElBQUk7UUFBRSxZQUFZLGdDQUFHLENBQUM7UUFBRSxJQUFJLGdDQUFHLEVBQUU7UUFBRSxVQUFVLGdDQUFHLElBQUk7UUFBRSxRQUFRLGdDQUFHLElBQUk7OzBCQUQ5RyxNQUFNOztBQUVSLHFDQUZFLE1BQU0sNkNBRUE7O0FBRVIsUUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7QUFDckIsUUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFDZixRQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUNmLFFBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2pCLFFBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2pCLFFBQUksQ0FBQyxNQUFNLEdBQUcsWUFBWSxDQUFDOztBQUUzQixRQUFJLFVBQVUsRUFBRTtBQUFFLGdCQUFVLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0tBQUU7QUFDMUQsUUFBSSxRQUFRLEVBQUU7QUFBRSxVQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztLQUFFO0dBQy9DOztZQWJHLE1BQU07O2VBQU4sTUFBTTtBQXdCTixTQUFLO1dBVEEsVUFBQyxLQUFLLEVBQUU7QUFDZixZQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQzs7QUFFcEIsWUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7QUFDL0IsY0FBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztBQUNoQyxjQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1NBQ2hDO09BQ0Y7V0FFUSxZQUFHO0FBQ1YsZUFBTyxJQUFJLENBQUMsTUFBTSxDQUFDO09BQ3BCOztBQUVELFVBQU07YUFBQSxrQkFBRztBQUNQLFlBQUksT0FBTyxHQUFHLDRCQUF3QixJQUFJLENBQUMsTUFBTSxpREFDbkIsSUFBSSxDQUFDLEdBQUcsaUJBQVUsSUFBSSxDQUFDLEdBQUcsa0JBQVcsSUFBSSxDQUFDLElBQUksbUJBQVksSUFBSSxDQUFDLEtBQUssWUFBTyxzQ0FDMUUsSUFBSSxDQUFDLEdBQUcsaUJBQVUsSUFBSSxDQUFDLEdBQUcsa0JBQVcsSUFBSSxDQUFDLElBQUksbUJBQVksSUFBSSxDQUFDLEtBQUssWUFBTyw4QkFDbEYsSUFBSSxDQUFDLElBQUksYUFBUyxDQUFDOztBQUUzQyxZQUFJLENBQUMsR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDNUMsWUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDOztBQUU3QixZQUFJLENBQUMsT0FBTyxHQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ2xELFlBQUksQ0FBQyxNQUFNLEdBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLHlCQUF1QixDQUFDO0FBQzdELFlBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLDBCQUF3QixDQUFDO0FBQzlELFlBQUksQ0FBQyxLQUFLLEdBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7O0FBRS9DLFlBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztBQUNsQixZQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7O0FBRWpCLGVBQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztPQUNqQjs7QUFFRCxhQUFTO2FBQUEscUJBQUc7QUFDVixhQUFLLElBQUksSUFBSSxJQUFJLGVBQWUsRUFBRTtBQUNoQyxjQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDOUM7O0FBRUQsYUFBSyxJQUFJLElBQUksSUFBSSxZQUFZLEVBQUU7QUFDN0IsY0FBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQy9DOztBQUVELGFBQUssSUFBSSxJQUFJLElBQUksV0FBVyxFQUFFO0FBQzVCLGNBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUM3Qzs7QUFFRCxhQUFLLElBQUksSUFBSSxJQUFJLFlBQVksRUFBRTtBQUM3QixjQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDL0M7O0FBRUQsYUFBSyxJQUFJLElBQUksSUFBSSxVQUFVLEVBQUU7QUFDM0IsY0FBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzNDO09BQ0Y7O0FBRUQsY0FBVTthQUFBLHNCQUFHOzs7QUFDWCxZQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxZQUFNO0FBQzFDLGNBQUksS0FBSyxHQUFHLE1BQUssTUFBTSxDQUFDLEtBQUssQ0FBQztBQUM5QixnQkFBSyxPQUFPLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztBQUMzQixnQkFBSyxLQUFLLEdBQUcsS0FBSyxDQUFDOztBQUVuQixnQkFBSyxJQUFJLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQzVCLEVBQUUsS0FBSyxDQUFDLENBQUM7O0FBRVYsWUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBTTtBQUMzQyxjQUFJLEtBQUssR0FBRyxNQUFLLE9BQU8sQ0FBQyxLQUFLLENBQUM7QUFDL0IsZ0JBQUssTUFBTSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7QUFDMUIsZ0JBQUssS0FBSyxHQUFHLEtBQUssQ0FBQzs7QUFFbkIsZ0JBQUssSUFBSSxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztTQUM1QixFQUFFLEtBQUssQ0FBQyxDQUFDO09BQ1g7Ozs7U0F0RkcsTUFBTTtHQUFTLE1BQU0sQ0FBQyxZQUFZOztBQXlGeEMsTUFBTSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMiLCJmaWxlIjoiZXM2L3NsaWRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGV2ZW50cyA9IHJlcXVpcmUoJ2V2ZW50cycpO1xuXG5jb25zdCBjb250YWluZXJTdHlsZXMgPSB7XG4gIHdpZHRoOiAnNDQwcHgnLFxuICBoZWlnaHQ6ICczMHB4JyxcbiAgZGlzcGxheTogJ2Jsb2NrJyxcbiAgcGFkZGluZzogJzRweCcsXG4gIG1hcmdpbjogJzJweCcsXG4gIGJhY2tncm91bmRDb2xvcjogJyNlZmVmZWYnLFxuICBib3JkZXI6ICcxcHggc29saWQgI2FhYWFhYScsXG59O1xuXG5jb25zdCBsZWdlbmRTdHlsZXMgPSB7XG4gIGNvbG9yOiAnIzQ2NDY0NicsXG4gIGZvbnQ6ICdub3JtYWwgYm9sZCAxMnB4IGFyaWFsJyxcbiAgbGluZUhlaWdodDogJzIycHgnLFxuICBoZWlnaHQ6ICcyMnB4JyxcbiAgZGlzcGxheTogJ2lubGluZS1ibG9jaycsXG4gIHdpZHRoOiAnMTQwcHgnLFxuICBvdmVyZmxvdzogJ2hpZGRlbicsXG4gIHRleHRBbGlnbjogJ3JpZ2h0JyxcbiAgcGFkZGluZzogMCxcbiAgcGFkZGluZ1JpZ2h0OiAnNnB4J1xufTtcblxuY29uc3QgcmFuZ2VTdHlsZXMgPSB7XG4gIGhlaWdodDogJzIycHgnLFxuICB3aWR0aDogJzIwMHB4JyxcbiAgZGlzcGxheTogJ2lubGluZS1ibG9jaycsXG59O1xuXG5jb25zdCBudW1iZXJTdHlsZXMgPSB7XG4gIGhlaWdodDogJzIycHgnLFxuICB3aWR0aDogJzU0cHgnLFxuICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcbiAgdG9wOiAnLTdweCcsXG4gIGxlZnQ6ICc1cHgnLFxuICBmb250OiAnbm9ybWFsIG5vcm1hbCAxMnB4IGFyaWFsJyxcbiAgYm9yZGVyOiAnbm9uZScsXG4gIGJhY2tncm91bmQ6ICdub25lJyxcbiAgcGFkZGluZ0xlZnQ6ICc0cHgnLFxuICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcbn07XG5cbmNvbnN0IHVuaXRTdHlsZXMgPSB7XG4gIGZvbnQ6ICdpdGFsaWMgbm9ybWFsIDEycHggYXJpYWwnLFxuICBsaW5lSGVpZ2h0OiAnMjJweCcsXG4gIGhlaWdodDogJzIycHgnLFxuICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcbiAgcG9zaXRpb246ICdyZWxhdGl2ZScsXG4gIHRvcDogJy03cHgnLFxuICBwYWRkaW5nTGVmdDogJzVweCcsXG4gIGNvbG9yOiAnIzU2NTY1Nidcbn07XG5cbmNsYXNzIFNsaWRlciBleHRlbmRzIGV2ZW50cy5FdmVudEVtaXR0ZXIge1xuICBjb25zdHJ1Y3RvcihsZWdlbmQsIG1pbiA9IDAsIG1heCA9IDEsIHN0ZXAgPSAwLjAxLCBkZWZhdWx0VmFsdWUgPSAwLCB1bml0ID0gJycsICRjb250YWluZXIgPSBudWxsLCBjYWxsYmFjayA9IG51bGwpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5sZWdlbmQgPSBsZWdlbmQ7XG4gICAgdGhpcy5taW4gPSBtaW47XG4gICAgdGhpcy5tYXggPSBtYXg7XG4gICAgdGhpcy5zdGVwID0gc3RlcDtcbiAgICB0aGlzLnVuaXQgPSB1bml0O1xuICAgIHRoaXMuX3ZhbHVlID0gZGVmYXVsdFZhbHVlO1xuXG4gICAgaWYgKCRjb250YWluZXIpIHsgJGNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLnJlbmRlcigpKTsgfVxuICAgIGlmIChjYWxsYmFjaykgeyB0aGlzLm9uKCdjaGFuZ2UnLCBjYWxsYmFjayk7IH1cbiAgfVxuXG4gIHNldCB2YWx1ZSh2YWx1ZSkge1xuICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG5cbiAgICBpZiAodGhpcy4kbnVtYmVyICYmIHRoaXMuJHJhbmdlKSB7XG4gICAgICB0aGlzLiRudW1iZXIudmFsdWUgPSB0aGlzLnZhbHVlO1xuICAgICAgdGhpcy4kcmFuZ2UudmFsdWUgPSB0aGlzLnZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIGdldCB2YWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgbGV0IGNvbnRlbnQgPSBgPHNwYW4gY2xhc3M9XCJsZWdlbmRcIj4ke3RoaXMubGVnZW5kfTwvc3Bhbj5gICtcbiAgICAgIGA8aW5wdXQgdHlwZT1cInJhbmdlXCIgbWluPVwiJHt0aGlzLm1pbn1cIiBtYXg9XCIke3RoaXMubWF4fVwiIHN0ZXA9XCIke3RoaXMuc3RlcH1cIiB2YWx1ZT1cIiR7dGhpcy52YWx1ZX1cIiAvPiBgICtcbiAgICAgIGA8aW5wdXQgdHlwZT1cIm51bWJlclwiIG1pbj1cIiR7dGhpcy5taW59XCIgbWF4PVwiJHt0aGlzLm1heH1cIiBzdGVwPVwiJHt0aGlzLnN0ZXB9XCIgdmFsdWU9XCIke3RoaXMudmFsdWV9XCIgLz4gYCArXG4gICAgICBgPHNwYW4gY2xhc3M9XCJ1bml0XCI+JHt0aGlzLnVuaXR9PC9zcGFuPmA7XG5cbiAgICB0aGlzLiRlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xlZ2VuZCcpO1xuICAgIHRoaXMuJGVsLmlubmVySFRNTCA9IGNvbnRlbnQ7XG5cbiAgICB0aGlzLiRsZWdlbmQgID0gdGhpcy4kZWwucXVlcnlTZWxlY3RvcignLmxlZ2VuZCcpO1xuICAgIHRoaXMuJHJhbmdlICA9IHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoYGlucHV0W3R5cGU9XCJyYW5nZVwiXWApO1xuICAgIHRoaXMuJG51bWJlciA9IHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoYGlucHV0W3R5cGU9XCJudW1iZXJcIl1gKTtcbiAgICB0aGlzLiR1bml0ICAgPSB0aGlzLiRlbC5xdWVyeVNlbGVjdG9yKCcudW5pdCcpO1xuXG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XG4gICAgdGhpcy5hZGRTdHlsZXMoKTtcblxuICAgIHJldHVybiB0aGlzLiRlbDtcbiAgfVxuXG4gIGFkZFN0eWxlcygpIHtcbiAgICBmb3IgKGxldCBhdHRyIGluIGNvbnRhaW5lclN0eWxlcykge1xuICAgICAgdGhpcy4kZWwuc3R5bGVbYXR0cl0gPSBjb250YWluZXJTdHlsZXNbYXR0cl07XG4gICAgfVxuXG4gICAgZm9yIChsZXQgYXR0ciBpbiBsZWdlbmRTdHlsZXMpIHtcbiAgICAgIHRoaXMuJGxlZ2VuZC5zdHlsZVthdHRyXSA9IGxlZ2VuZFN0eWxlc1thdHRyXTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBhdHRyIGluIHJhbmdlU3R5bGVzKSB7XG4gICAgICB0aGlzLiRyYW5nZS5zdHlsZVthdHRyXSA9IHJhbmdlU3R5bGVzW2F0dHJdO1xuICAgIH1cblxuICAgIGZvciAobGV0IGF0dHIgaW4gbnVtYmVyU3R5bGVzKSB7XG4gICAgICB0aGlzLiRudW1iZXIuc3R5bGVbYXR0cl0gPSBudW1iZXJTdHlsZXNbYXR0cl07XG4gICAgfVxuXG4gICAgZm9yIChsZXQgYXR0ciBpbiB1bml0U3R5bGVzKSB7XG4gICAgICB0aGlzLiR1bml0LnN0eWxlW2F0dHJdID0gdW5pdFN0eWxlc1thdHRyXTtcbiAgICB9XG4gIH1cblxuICBiaW5kRXZlbnRzKCkge1xuICAgIHRoaXMuJHJhbmdlLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKCkgPT4ge1xuICAgICAgbGV0IHZhbHVlID0gdGhpcy4kcmFuZ2UudmFsdWU7XG4gICAgICB0aGlzLiRudW1iZXIudmFsdWUgPSB2YWx1ZTtcbiAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcblxuICAgICAgdGhpcy5lbWl0KCdjaGFuZ2UnLCB2YWx1ZSk7XG4gICAgfSwgZmFsc2UpO1xuXG4gICAgdGhpcy4kbnVtYmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKCkgPT4ge1xuICAgICAgbGV0IHZhbHVlID0gdGhpcy4kbnVtYmVyLnZhbHVlO1xuICAgICAgdGhpcy4kcmFuZ2UudmFsdWUgPSB2YWx1ZTtcbiAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcblxuICAgICAgdGhpcy5lbWl0KCdjaGFuZ2UnLCB2YWx1ZSk7XG4gICAgfSwgZmFsc2UpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gU2xpZGVyO1xuIl19