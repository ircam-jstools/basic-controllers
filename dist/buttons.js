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
//# sourceMappingURL=data:application/json;base64,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LHNCQUFzQixDQUFDO1dBQ3BFLENBQUMsQ0FBQzs7QUFFSCxnQkFBTSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxVQUFDLENBQUMsRUFBSztBQUN4QyxhQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7QUFDbkIsa0JBQU0sQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLFlBQVksQ0FBQyxlQUFlLENBQUM7QUFDNUQsa0JBQUssSUFBSSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztXQUMzQixDQUFDLENBQUM7U0FDSixDQUFDLENBQUM7T0FDSjs7OztTQXBFRyxPQUFPO0dBQVMsTUFBTSxDQUFDLFlBQVk7O0FBdUV6QyxNQUFNLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyIsImZpbGUiOiJlczYvc2xpZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZXZlbnRzID0gcmVxdWlyZSgnZXZlbnRzJyk7XG5cbmNvbnN0IGNvbnRhaW5lclN0eWxlcyA9IHtcbiAgd2lkdGg6ICc0NDBweCcsXG4gIGhlaWdodDogJzMwcHgnLFxuICBkaXNwbGF5OiAnYmxvY2snLFxuICBwYWRkaW5nOiAnNHB4JyxcbiAgbWFyZ2luOiAnMnB4JyxcbiAgYmFja2dyb3VuZENvbG9yOiAnI2VmZWZlZicsXG4gIGJvcmRlcjogJzFweCBzb2xpZCAjYWFhYWFhJyxcbn07XG5cbmNvbnN0IGxlZ2VuZFN0eWxlcyA9IHtcbiAgY29sb3I6ICcjNDY0NjQ2JyxcbiAgZm9udDogJ25vcm1hbCBib2xkIDEycHggYXJpYWwnLFxuICBsaW5lSGVpZ2h0OiAnMjJweCcsXG4gIGhlaWdodDogJzIycHgnLFxuICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcbiAgd2lkdGg6ICcxNDBweCcsXG4gIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgdGV4dEFsaWduOiAncmlnaHQnLFxuICBwYWRkaW5nOiAwLFxuICBwYWRkaW5nUmlnaHQ6ICc2cHgnXG59O1xuXG5jb25zdCBidXR0b25zQ29udGFpbmVyU3R5bGVzID0ge1xuICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcbiAgd2lkdGg6ICcyOTBweCcsXG4gIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuICB0b3A6ICctOXB4J1xufTtcblxuY29uc3QgYnV0dG9uU3R5bGVzID0ge1xuICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcbiAgZm9udDogJ25vcm1hbCBub3JtYWwgMTJweCBhcmlhbCcsXG4gIGhlaWdodDogJzIycHgnLFxuICBib3JkZXI6ICdub25lJyxcbiAgYmFja2dyb3VuZENvbG9yOiAnIzQ2NDY0NicsXG4gIGNsaWNrZWRCYWNrZ3JvdW5kQ29sb3I6ICcjNjg2ODY4JyxcbiAgY29sb3I6ICcjZmZmZmZmJyxcbiAgYm9yZGVyUmlnaHQ6ICc0cHggc29saWQgI2VmZWZlZicsXG4gIGJveFNpemluZzogJ2JvcmRlci1ib3gnXG59O1xuXG5jbGFzcyBCdXR0b25zIGV4dGVuZHMgZXZlbnRzLkV2ZW50RW1pdHRlciB7XG4gIGNvbnN0cnVjdG9yKGxlZ2VuZCwgbGFiZWxzKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMubGVnZW5kID0gbGVnZW5kO1xuICAgIHRoaXMubGFiZWxzID0gbGFiZWxzO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGxldCBjb250ZW50ID0gYDxzcGFuIGNsYXNzPVwibGVnZW5kXCI+JHt0aGlzLmxlZ2VuZH08L3NwYW4+YCArXG4gICAgICBgPGRpdiBjbGFzcz1cImJ1dHRvbnMtY29udGFpbmVyXCI+YDtcblxuICAgIGNvbnRlbnQgKz0gdGhpcy5sYWJlbHMubWFwKChsYWJlbCkgPT4ge1xuICAgICAgcmV0dXJuIGA8YnV0dG9uIGRhdGEtbGFiZWw9XCIke2xhYmVsfVwiPiR7bGFiZWx9PC9idXR0b24+YDtcbiAgICB9KS5qb2luKCcnKTtcblxuICAgIGNvbnRlbnQgKz0gYDwvYnV0dG9uPmA7XG5cbiAgICB0aGlzLiRlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgdGhpcy4kZWwuaW5uZXJIVE1MID0gY29udGVudDtcblxuICAgIHRoaXMuJGxlZ2VuZCA9IHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoJy5sZWdlbmQnKTtcbiAgICB0aGlzLiRidXR0b25zQ29udGFpbmVyID0gdGhpcy4kZWwucXVlcnlTZWxlY3RvcignLmJ1dHRvbnMtY29udGFpbmVyJyk7XG4gICAgdGhpcy4kYnV0dG9ucyA9IEFycmF5LmZyb20odGhpcy4kZWwucXVlcnlTZWxlY3RvckFsbCgnYnV0dG9uJykpO1xuXG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XG4gICAgdGhpcy5hZGRTdHlsZXMoKTtcblxuICAgIHJldHVybiB0aGlzLiRlbDtcbiAgfVxuXG4gIGFkZFN0eWxlcygpIHtcbiAgICBmb3IgKGxldCBhdHRyIGluIGNvbnRhaW5lclN0eWxlcykge1xuICAgICAgdGhpcy4kZWwuc3R5bGVbYXR0cl0gPSBjb250YWluZXJTdHlsZXNbYXR0cl07XG4gICAgfVxuXG4gICAgZm9yIChsZXQgYXR0ciBpbiBsZWdlbmRTdHlsZXMpIHtcbiAgICAgIHRoaXMuJGxlZ2VuZC5zdHlsZVthdHRyXSA9IGxlZ2VuZFN0eWxlc1thdHRyXTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBhdHRyIGluIGJ1dHRvbnNDb250YWluZXJTdHlsZXMpIHtcbiAgICAgIHRoaXMuJGJ1dHRvbnNDb250YWluZXIuc3R5bGVbYXR0cl0gPSBidXR0b25zQ29udGFpbmVyU3R5bGVzW2F0dHJdO1xuICAgIH1cblxuICAgIGNvbnN0IGJ1dHRvbldpZHRoID0gMTAwIC8gdGhpcy4kYnV0dG9ucy5sZW5ndGg7XG4gICAgdGhpcy4kYnV0dG9ucy5mb3JFYWNoKChidXR0b24pID0+IHtcbiAgICAgIGJ1dHRvbi5zdHlsZS53aWR0aCA9IGJ1dHRvbldpZHRoICsgJyUnO1xuICAgICAgZm9yIChsZXQgYXR0ciBpbiBidXR0b25TdHlsZXMpIHtcbiAgICAgICAgYnV0dG9uLnN0eWxlW2F0dHJdID0gYnV0dG9uU3R5bGVzW2F0dHJdO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgYmluZEV2ZW50cygpIHtcbiAgICB0aGlzLiRidXR0b25zLmZvckVhY2goKGJ1dHRvbikgPT4ge1xuICAgICAgY29uc3QgbGFiZWwgPSBidXR0b24uZ2V0QXR0cmlidXRlKCdkYXRhLWxhYmVsJyk7XG5cbiAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGJ1dHRvbi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBidXR0b25TdHlsZXMuY2xpY2tlZEJhY2tncm91bmRDb2xvcjtcbiAgICAgIH0pO1xuXG4gICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgYnV0dG9uLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGJ1dHRvblN0eWxlcy5iYWNrZ3JvdW5kQ29sb3I7XG4gICAgICAgIHRoaXMuZW1pdCgnY2xpY2snLCBsYWJlbCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEJ1dHRvbnM7XG4iXX0=