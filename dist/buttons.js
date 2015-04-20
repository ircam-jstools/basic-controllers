"use strict";

var _classCallCheck = require("babel-runtime/helpers/class-call-check")["default"];

var _inherits = require("babel-runtime/helpers/inherits")["default"];

var _get = require("babel-runtime/helpers/get")["default"];

var _createClass = require("babel-runtime/helpers/create-class")["default"];

var _core = require("babel-runtime/core-js")["default"];

var events = require("events");
var styles = require("./utils/styles");

var Buttons = (function (_events$EventEmitter) {
  function Buttons(legend, labels) {
    var $container = arguments[2] === undefined ? null : arguments[2];
    var callback = arguments[3] === undefined ? null : arguments[3];

    _classCallCheck(this, Buttons);

    _get(_core.Object.getPrototypeOf(Buttons.prototype), "constructor", this).call(this);

    this.legend = legend;
    this.labels = labels;

    if ($container) {
      $container.appendChild(this.render());
    }
    if (callback) {
      this.on("change", callback);
    }
  }

  _inherits(Buttons, _events$EventEmitter);

  _createClass(Buttons, {
    render: {
      value: function render() {
        var content = "<span class=\"legend\">" + this.legend + "</span>" + "<div class=\"buttons-container\">";

        content += this.labels.map(function (label) {
          return "<button data-label=\"" + label + "\">" + label + "</button>";
        }).join("");

        content += "</button>";

        this.$el = document.createElement("label");
        this.$el.innerHTML = content;

        this.$legend = this.$el.querySelector(".legend");
        this.$buttonsContainer = this.$el.querySelector(".buttons-container");
        this.$buttons = _core.Array.from(this.$el.querySelectorAll("button"));

        this.addStyles();
        this.bindEvents();

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

        for (var attr in styles.buttonsContainerStyles) {
          this.$buttonsContainer.style[attr] = styles.buttonsContainerStyles[attr];
        }

        var buttonWidth = 100 / this.$buttons.length;
        this.$buttons.forEach(function (button) {
          button.style.width = buttonWidth + "%";
          for (var attr in styles.buttonStyles) {
            button.style[attr] = styles.buttonStyles[attr];
          }
        });
      }
    },
    bindEvents: {
      value: function bindEvents() {
        var _this = this;

        this.$buttons.forEach(function (button) {
          var label = button.getAttribute("data-label");

          button.addEventListener("mousedown", function (e) {
            e.preventDefault();
            button.style.backgroundColor = styles.buttonStyles.clickedBackgroundColor;
          });

          button.addEventListener("mouseup", function (e) {
            e.preventDefault();
            button.style.backgroundColor = styles.buttonStyles.backgroundColor;
            _this.emit("change", label);
          });
        });
      }
    }
  });

  return Buttons;
})(events.EventEmitter);

module.exports = Buttons;
//# sourceMappingURL=data:application/json;base64,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QUFNLEVBQUs7QUFDaEMsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLFdBQVcsR0FBRyxHQUFHLENBQUM7QUFDdkMsZUFBSyxJQUFJLElBQUksSUFBSSxNQUFNLENBQUMsWUFBWSxFQUFFO0FBQ3BDLGtCQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7V0FDaEQ7U0FDRixDQUFDLENBQUM7T0FDSjs7QUFFRCxjQUFVO2FBQUEsc0JBQUc7OztBQUNYLFlBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQUMsTUFBTSxFQUFLO0FBQ2hDLGNBQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUM7O0FBRWhELGdCQUFNLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLFVBQUMsQ0FBQyxFQUFLO0FBQzFDLGFBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUNuQixrQkFBTSxDQUFDLEtBQUssQ0FBQyxlQUFlLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxzQkFBc0IsQ0FBQztXQUMzRSxDQUFDLENBQUM7O0FBRUgsZ0JBQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsVUFBQyxDQUFDLEVBQUs7QUFDeEMsYUFBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBQ25CLGtCQUFNLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQztBQUNuRSxrQkFBSyxJQUFJLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO1dBQzVCLENBQUMsQ0FBQztTQUNKLENBQUMsQ0FBQztPQUNKOzs7O1NBdkVHLE9BQU87R0FBUyxNQUFNLENBQUMsWUFBWTs7QUEwRXpDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDIiwiZmlsZSI6ImVzNi91dGlscy9zdHlsZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBldmVudHMgPSByZXF1aXJlKCdldmVudHMnKTtcbmNvbnN0IHN0eWxlcyA9IHJlcXVpcmUoJy4vdXRpbHMvc3R5bGVzJyk7XG5cbmNsYXNzIEJ1dHRvbnMgZXh0ZW5kcyBldmVudHMuRXZlbnRFbWl0dGVyIHtcbiAgY29uc3RydWN0b3IobGVnZW5kLCBsYWJlbHMsICRjb250YWluZXIgPSBudWxsLCBjYWxsYmFjayA9IG51bGwpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5sZWdlbmQgPSBsZWdlbmQ7XG4gICAgdGhpcy5sYWJlbHMgPSBsYWJlbHM7XG5cbiAgICBpZiAoJGNvbnRhaW5lcikgeyAkY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMucmVuZGVyKCkpOyB9XG4gICAgaWYgKGNhbGxiYWNrKSB7IHRoaXMub24oJ2NoYW5nZScsIGNhbGxiYWNrKTsgfVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGxldCBjb250ZW50ID0gYDxzcGFuIGNsYXNzPVwibGVnZW5kXCI+JHt0aGlzLmxlZ2VuZH08L3NwYW4+YCArXG4gICAgICBgPGRpdiBjbGFzcz1cImJ1dHRvbnMtY29udGFpbmVyXCI+YDtcblxuICAgIGNvbnRlbnQgKz0gdGhpcy5sYWJlbHMubWFwKChsYWJlbCkgPT4ge1xuICAgICAgcmV0dXJuIGA8YnV0dG9uIGRhdGEtbGFiZWw9XCIke2xhYmVsfVwiPiR7bGFiZWx9PC9idXR0b24+YDtcbiAgICB9KS5qb2luKCcnKTtcblxuICAgIGNvbnRlbnQgKz0gYDwvYnV0dG9uPmA7XG5cbiAgICB0aGlzLiRlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgdGhpcy4kZWwuaW5uZXJIVE1MID0gY29udGVudDtcblxuICAgIHRoaXMuJGxlZ2VuZCA9IHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoJy5sZWdlbmQnKTtcbiAgICB0aGlzLiRidXR0b25zQ29udGFpbmVyID0gdGhpcy4kZWwucXVlcnlTZWxlY3RvcignLmJ1dHRvbnMtY29udGFpbmVyJyk7XG4gICAgdGhpcy4kYnV0dG9ucyA9IEFycmF5LmZyb20odGhpcy4kZWwucXVlcnlTZWxlY3RvckFsbCgnYnV0dG9uJykpO1xuXG4gICAgdGhpcy5hZGRTdHlsZXMoKTtcbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcblxuICAgIHJldHVybiB0aGlzLiRlbDtcbiAgfVxuXG4gIGFkZFN0eWxlcygpIHtcbiAgICBmb3IgKGxldCBhdHRyIGluIHN0eWxlcy5jb250YWluZXJTdHlsZXMpIHtcbiAgICAgIHRoaXMuJGVsLnN0eWxlW2F0dHJdID0gc3R5bGVzLmNvbnRhaW5lclN0eWxlc1thdHRyXTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBhdHRyIGluIHN0eWxlcy5sZWdlbmRTdHlsZXMpIHtcbiAgICAgIHRoaXMuJGxlZ2VuZC5zdHlsZVthdHRyXSA9IHN0eWxlcy5sZWdlbmRTdHlsZXNbYXR0cl07XG4gICAgfVxuXG4gICAgZm9yIChsZXQgYXR0ciBpbiBzdHlsZXMuYnV0dG9uc0NvbnRhaW5lclN0eWxlcykge1xuICAgICAgdGhpcy4kYnV0dG9uc0NvbnRhaW5lci5zdHlsZVthdHRyXSA9IHN0eWxlcy5idXR0b25zQ29udGFpbmVyU3R5bGVzW2F0dHJdO1xuICAgIH1cblxuICAgIGNvbnN0IGJ1dHRvbldpZHRoID0gMTAwIC8gdGhpcy4kYnV0dG9ucy5sZW5ndGg7XG4gICAgdGhpcy4kYnV0dG9ucy5mb3JFYWNoKChidXR0b24pID0+IHtcbiAgICAgIGJ1dHRvbi5zdHlsZS53aWR0aCA9IGJ1dHRvbldpZHRoICsgJyUnO1xuICAgICAgZm9yIChsZXQgYXR0ciBpbiBzdHlsZXMuYnV0dG9uU3R5bGVzKSB7XG4gICAgICAgIGJ1dHRvbi5zdHlsZVthdHRyXSA9IHN0eWxlcy5idXR0b25TdHlsZXNbYXR0cl07XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBiaW5kRXZlbnRzKCkge1xuICAgIHRoaXMuJGJ1dHRvbnMuZm9yRWFjaCgoYnV0dG9uKSA9PiB7XG4gICAgICBjb25zdCBsYWJlbCA9IGJ1dHRvbi5nZXRBdHRyaWJ1dGUoJ2RhdGEtbGFiZWwnKTtcblxuICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgYnV0dG9uLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHN0eWxlcy5idXR0b25TdHlsZXMuY2xpY2tlZEJhY2tncm91bmRDb2xvcjtcbiAgICAgIH0pO1xuXG4gICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgYnV0dG9uLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHN0eWxlcy5idXR0b25TdHlsZXMuYmFja2dyb3VuZENvbG9yO1xuICAgICAgICB0aGlzLmVtaXQoJ2NoYW5nZScsIGxhYmVsKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQnV0dG9ucztcbiJdfQ==