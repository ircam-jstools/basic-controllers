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

var buttonsContainerStyles = {
  display: "inline-block",
  width: "290px",
  position: "relative",
  top: "-9px"
};

var buttonStyles = {
  display: "inline-block",
  font: "normal normal 12px arial",
  height: "22px",
  border: "none",
  backgroundColor: "#464646",
  clickedBackgroundColor: "#686868",
  color: "#ffffff",
  borderRight: "4px solid #efefef",
  boxSizing: "border-box"
};

var Buttons = (function (_events$EventEmitter) {
  function Buttons(legend, labels) {
    _classCallCheck(this, Buttons);

    _get(_core.Object.getPrototypeOf(Buttons.prototype), "constructor", this).call(this);

    this.legend = legend;
    this.labels = labels;
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

        for (var attr in buttonsContainerStyles) {
          this.$buttonsContainer.style[attr] = buttonsContainerStyles[attr];
        }

        var buttonWidth = 100 / this.$buttons.length;
        this.$buttons.forEach(function (button) {
          button.style.width = buttonWidth + "%";
          for (var attr in buttonStyles) {
            button.style[attr] = buttonStyles[attr];
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
            button.style.backgroundColor = buttonStyles.clickedBackgroundColor;
          });

          button.addEventListener("mouseup", function (e) {
            e.preventDefault();
            button.style.backgroundColor = buttonStyles.backgroundColor;
            _this.emit("click", label);
          });
        });
      }
    }
  });

  return Buttons;
})(events.EventEmitter);

module.exports = Buttons;
//# sourceMappingURL=data:application/json;base64,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QyxzQkFBc0IsQ0FBQztXQUNwRSxDQUFDLENBQUM7O0FBRUgsZ0JBQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsVUFBQyxDQUFDLEVBQUs7QUFDeEMsYUFBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBQ25CLGtCQUFNLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyxZQUFZLENBQUMsZUFBZSxDQUFDO0FBQzVELGtCQUFLLElBQUksQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7V0FDM0IsQ0FBQyxDQUFDO1NBQ0osQ0FBQyxDQUFDO09BQ0o7Ozs7U0FwRUcsT0FBTztHQUFTLE1BQU0sQ0FBQyxZQUFZOztBQXVFekMsTUFBTSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMiLCJmaWxlIjoiZXM2L2J1dHRvbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBldmVudHMgPSByZXF1aXJlKCdldmVudHMnKTtcblxuY29uc3QgY29udGFpbmVyU3R5bGVzID0ge1xuICB3aWR0aDogJzQ0MHB4JyxcbiAgaGVpZ2h0OiAnMzBweCcsXG4gIGRpc3BsYXk6ICdibG9jaycsXG4gIHBhZGRpbmc6ICc0cHgnLFxuICBtYXJnaW46ICcycHgnLFxuICBiYWNrZ3JvdW5kQ29sb3I6ICcjZWZlZmVmJyxcbiAgYm9yZGVyOiAnMXB4IHNvbGlkICNhYWFhYWEnLFxufTtcblxuY29uc3QgbGVnZW5kU3R5bGVzID0ge1xuICBjb2xvcjogJyM0NjQ2NDYnLFxuICBmb250OiAnbm9ybWFsIGJvbGQgMTJweCBhcmlhbCcsXG4gIGxpbmVIZWlnaHQ6ICcyMnB4JyxcbiAgaGVpZ2h0OiAnMjJweCcsXG4gIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxuICB3aWR0aDogJzE0MHB4JyxcbiAgb3ZlcmZsb3c6ICdoaWRkZW4nLFxuICB0ZXh0QWxpZ246ICdyaWdodCcsXG4gIHBhZGRpbmc6IDAsXG4gIHBhZGRpbmdSaWdodDogJzZweCdcbn07XG5cbmNvbnN0IGJ1dHRvbnNDb250YWluZXJTdHlsZXMgPSB7XG4gIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxuICB3aWR0aDogJzI5MHB4JyxcbiAgcG9zaXRpb246ICdyZWxhdGl2ZScsXG4gIHRvcDogJy05cHgnXG59XG5cbmNvbnN0IGJ1dHRvblN0eWxlcyA9IHtcbiAgZGlzcGxheTogJ2lubGluZS1ibG9jaycsXG4gIGZvbnQ6ICdub3JtYWwgbm9ybWFsIDEycHggYXJpYWwnLFxuICBoZWlnaHQ6ICcyMnB4JyxcbiAgYm9yZGVyOiAnbm9uZScsXG4gIGJhY2tncm91bmRDb2xvcjogJyM0NjQ2NDYnLFxuICBjbGlja2VkQmFja2dyb3VuZENvbG9yOiAnIzY4Njg2OCcsXG4gIGNvbG9yOiAnI2ZmZmZmZicsXG4gIGJvcmRlclJpZ2h0OiAnNHB4IHNvbGlkICNlZmVmZWYnLFxuICBib3hTaXppbmc6ICdib3JkZXItYm94J1xufTtcblxuY2xhc3MgQnV0dG9ucyBleHRlbmRzIGV2ZW50cy5FdmVudEVtaXR0ZXIge1xuICBjb25zdHJ1Y3RvcihsZWdlbmQsIGxhYmVscykge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLmxlZ2VuZCA9IGxlZ2VuZFxuICAgIHRoaXMubGFiZWxzID0gbGFiZWxzO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGxldCBjb250ZW50ID0gYDxzcGFuIGNsYXNzPVwibGVnZW5kXCI+JHt0aGlzLmxlZ2VuZH08L3NwYW4+YCArXG4gICAgICBgPGRpdiBjbGFzcz1cImJ1dHRvbnMtY29udGFpbmVyXCI+YDtcblxuICAgIGNvbnRlbnQgKz0gdGhpcy5sYWJlbHMubWFwKChsYWJlbCkgPT4ge1xuICAgICAgcmV0dXJuIGA8YnV0dG9uIGRhdGEtbGFiZWw9XCIke2xhYmVsfVwiPiR7bGFiZWx9PC9idXR0b24+YDtcbiAgICB9KS5qb2luKCcnKTtcblxuICAgIGNvbnRlbnQgKz0gYDwvYnV0dG9uPmA7XG5cbiAgICB0aGlzLiRlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgdGhpcy4kZWwuaW5uZXJIVE1MID0gY29udGVudDtcblxuICAgIHRoaXMuJGxlZ2VuZCA9IHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoJy5sZWdlbmQnKTtcbiAgICB0aGlzLiRidXR0b25zQ29udGFpbmVyID0gdGhpcy4kZWwucXVlcnlTZWxlY3RvcignLmJ1dHRvbnMtY29udGFpbmVyJyk7XG4gICAgdGhpcy4kYnV0dG9ucyA9IEFycmF5LmZyb20odGhpcy4kZWwucXVlcnlTZWxlY3RvckFsbCgnYnV0dG9uJykpO1xuXG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XG4gICAgdGhpcy5hZGRTdHlsZXMoKTtcblxuICAgIHJldHVybiB0aGlzLiRlbDtcbiAgfVxuXG4gIGFkZFN0eWxlcygpIHtcbiAgICBmb3IgKGxldCBhdHRyIGluIGNvbnRhaW5lclN0eWxlcykge1xuICAgICAgdGhpcy4kZWwuc3R5bGVbYXR0cl0gPSBjb250YWluZXJTdHlsZXNbYXR0cl07XG4gICAgfVxuXG4gICAgZm9yIChsZXQgYXR0ciBpbiBsZWdlbmRTdHlsZXMpIHtcbiAgICAgIHRoaXMuJGxlZ2VuZC5zdHlsZVthdHRyXSA9IGxlZ2VuZFN0eWxlc1thdHRyXTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBhdHRyIGluIGJ1dHRvbnNDb250YWluZXJTdHlsZXMpIHtcbiAgICAgIHRoaXMuJGJ1dHRvbnNDb250YWluZXIuc3R5bGVbYXR0cl0gPSBidXR0b25zQ29udGFpbmVyU3R5bGVzW2F0dHJdO1xuICAgIH1cblxuICAgIGNvbnN0IGJ1dHRvbldpZHRoID0gMTAwIC8gdGhpcy4kYnV0dG9ucy5sZW5ndGg7XG4gICAgdGhpcy4kYnV0dG9ucy5mb3JFYWNoKChidXR0b24pID0+IHtcbiAgICAgIGJ1dHRvbi5zdHlsZS53aWR0aCA9IGJ1dHRvbldpZHRoICsgJyUnO1xuICAgICAgZm9yIChsZXQgYXR0ciBpbiBidXR0b25TdHlsZXMpIHtcbiAgICAgICAgYnV0dG9uLnN0eWxlW2F0dHJdID0gYnV0dG9uU3R5bGVzW2F0dHJdO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgYmluZEV2ZW50cygpIHtcbiAgICB0aGlzLiRidXR0b25zLmZvckVhY2goKGJ1dHRvbikgPT4ge1xuICAgICAgY29uc3QgbGFiZWwgPSBidXR0b24uZ2V0QXR0cmlidXRlKCdkYXRhLWxhYmVsJyk7XG5cbiAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGJ1dHRvbi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBidXR0b25TdHlsZXMuY2xpY2tlZEJhY2tncm91bmRDb2xvcjtcbiAgICAgIH0pO1xuXG4gICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgYnV0dG9uLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGJ1dHRvblN0eWxlcy5iYWNrZ3JvdW5kQ29sb3I7XG4gICAgICAgIHRoaXMuZW1pdCgnY2xpY2snLCBsYWJlbCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEJ1dHRvbnM7XG4iXX0=