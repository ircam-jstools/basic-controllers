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
            _this.emit("change", label);
          });
        });
      }
    }
  });

  return Buttons;
})(events.EventEmitter);

module.exports = Buttons;
//# sourceMappingURL=data:application/json;base64,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LFVBQUMsTUFBTSxFQUFLO0FBQ2hDLGNBQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUM7O0FBRWhELGdCQUFNLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLFVBQUMsQ0FBQyxFQUFLO0FBQzFDLGFBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUNuQixrQkFBTSxDQUFDLEtBQUssQ0FBQyxlQUFlLEdBQUcsWUFBWSxDQUFDLHNCQUFzQixDQUFDO1dBQ3BFLENBQUMsQ0FBQzs7QUFFSCxnQkFBTSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxVQUFDLENBQUMsRUFBSztBQUN4QyxhQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7QUFDbkIsa0JBQU0sQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLFlBQVksQ0FBQyxlQUFlLENBQUM7QUFDNUQsa0JBQUssSUFBSSxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztXQUM1QixDQUFDLENBQUM7U0FDSixDQUFDLENBQUM7T0FDSjs7OztTQXZFRyxPQUFPO0dBQVMsTUFBTSxDQUFDLFlBQVk7O0FBMEV6QyxNQUFNLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyIsImZpbGUiOiJlczYvc2xpZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZXZlbnRzID0gcmVxdWlyZSgnZXZlbnRzJyk7XG5cbmNvbnN0IGNvbnRhaW5lclN0eWxlcyA9IHtcbiAgd2lkdGg6ICc0NDBweCcsXG4gIGhlaWdodDogJzMwcHgnLFxuICBkaXNwbGF5OiAnYmxvY2snLFxuICBwYWRkaW5nOiAnNHB4JyxcbiAgbWFyZ2luOiAnMnB4JyxcbiAgYmFja2dyb3VuZENvbG9yOiAnI2VmZWZlZicsXG4gIGJvcmRlcjogJzFweCBzb2xpZCAjYWFhYWFhJyxcbn07XG5cbmNvbnN0IGxlZ2VuZFN0eWxlcyA9IHtcbiAgY29sb3I6ICcjNDY0NjQ2JyxcbiAgZm9udDogJ25vcm1hbCBib2xkIDEycHggYXJpYWwnLFxuICBsaW5lSGVpZ2h0OiAnMjJweCcsXG4gIGhlaWdodDogJzIycHgnLFxuICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcbiAgd2lkdGg6ICcxNDBweCcsXG4gIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgdGV4dEFsaWduOiAncmlnaHQnLFxuICBwYWRkaW5nOiAwLFxuICBwYWRkaW5nUmlnaHQ6ICc2cHgnXG59O1xuXG5jb25zdCBidXR0b25zQ29udGFpbmVyU3R5bGVzID0ge1xuICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcbiAgd2lkdGg6ICcyOTBweCcsXG4gIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuICB0b3A6ICctOXB4J1xufTtcblxuY29uc3QgYnV0dG9uU3R5bGVzID0ge1xuICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcbiAgZm9udDogJ25vcm1hbCBub3JtYWwgMTJweCBhcmlhbCcsXG4gIGhlaWdodDogJzIycHgnLFxuICBib3JkZXI6ICdub25lJyxcbiAgYmFja2dyb3VuZENvbG9yOiAnIzQ2NDY0NicsXG4gIGNsaWNrZWRCYWNrZ3JvdW5kQ29sb3I6ICcjNjg2ODY4JyxcbiAgY29sb3I6ICcjZmZmZmZmJyxcbiAgYm9yZGVyUmlnaHQ6ICc0cHggc29saWQgI2VmZWZlZicsXG4gIGJveFNpemluZzogJ2JvcmRlci1ib3gnXG59O1xuXG5jbGFzcyBCdXR0b25zIGV4dGVuZHMgZXZlbnRzLkV2ZW50RW1pdHRlciB7XG4gIGNvbnN0cnVjdG9yKGxlZ2VuZCwgbGFiZWxzLCAkY29udGFpbmVyID0gbnVsbCwgY2FsbGJhY2sgPSBudWxsKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMubGVnZW5kID0gbGVnZW5kO1xuICAgIHRoaXMubGFiZWxzID0gbGFiZWxzO1xuXG4gICAgaWYgKCRjb250YWluZXIpIHsgJGNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLnJlbmRlcigpKTsgfVxuICAgIGlmIChjYWxsYmFjaykgeyB0aGlzLm9uKCdjaGFuZ2UnLCBjYWxsYmFjayk7IH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBsZXQgY29udGVudCA9IGA8c3BhbiBjbGFzcz1cImxlZ2VuZFwiPiR7dGhpcy5sZWdlbmR9PC9zcGFuPmAgK1xuICAgICAgYDxkaXYgY2xhc3M9XCJidXR0b25zLWNvbnRhaW5lclwiPmA7XG5cbiAgICBjb250ZW50ICs9IHRoaXMubGFiZWxzLm1hcCgobGFiZWwpID0+IHtcbiAgICAgIHJldHVybiBgPGJ1dHRvbiBkYXRhLWxhYmVsPVwiJHtsYWJlbH1cIj4ke2xhYmVsfTwvYnV0dG9uPmA7XG4gICAgfSkuam9pbignJyk7XG5cbiAgICBjb250ZW50ICs9IGA8L2J1dHRvbj5gO1xuXG4gICAgdGhpcy4kZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgIHRoaXMuJGVsLmlubmVySFRNTCA9IGNvbnRlbnQ7XG5cbiAgICB0aGlzLiRsZWdlbmQgPSB0aGlzLiRlbC5xdWVyeVNlbGVjdG9yKCcubGVnZW5kJyk7XG4gICAgdGhpcy4kYnV0dG9uc0NvbnRhaW5lciA9IHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoJy5idXR0b25zLWNvbnRhaW5lcicpO1xuICAgIHRoaXMuJGJ1dHRvbnMgPSBBcnJheS5mcm9tKHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3JBbGwoJ2J1dHRvbicpKTtcblxuICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICAgIHRoaXMuYWRkU3R5bGVzKCk7XG5cbiAgICByZXR1cm4gdGhpcy4kZWw7XG4gIH1cblxuICBhZGRTdHlsZXMoKSB7XG4gICAgZm9yIChsZXQgYXR0ciBpbiBjb250YWluZXJTdHlsZXMpIHtcbiAgICAgIHRoaXMuJGVsLnN0eWxlW2F0dHJdID0gY29udGFpbmVyU3R5bGVzW2F0dHJdO1xuICAgIH1cblxuICAgIGZvciAobGV0IGF0dHIgaW4gbGVnZW5kU3R5bGVzKSB7XG4gICAgICB0aGlzLiRsZWdlbmQuc3R5bGVbYXR0cl0gPSBsZWdlbmRTdHlsZXNbYXR0cl07XG4gICAgfVxuXG4gICAgZm9yIChsZXQgYXR0ciBpbiBidXR0b25zQ29udGFpbmVyU3R5bGVzKSB7XG4gICAgICB0aGlzLiRidXR0b25zQ29udGFpbmVyLnN0eWxlW2F0dHJdID0gYnV0dG9uc0NvbnRhaW5lclN0eWxlc1thdHRyXTtcbiAgICB9XG5cbiAgICBjb25zdCBidXR0b25XaWR0aCA9IDEwMCAvIHRoaXMuJGJ1dHRvbnMubGVuZ3RoO1xuICAgIHRoaXMuJGJ1dHRvbnMuZm9yRWFjaCgoYnV0dG9uKSA9PiB7XG4gICAgICBidXR0b24uc3R5bGUud2lkdGggPSBidXR0b25XaWR0aCArICclJztcbiAgICAgIGZvciAobGV0IGF0dHIgaW4gYnV0dG9uU3R5bGVzKSB7XG4gICAgICAgIGJ1dHRvbi5zdHlsZVthdHRyXSA9IGJ1dHRvblN0eWxlc1thdHRyXTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGJpbmRFdmVudHMoKSB7XG4gICAgdGhpcy4kYnV0dG9ucy5mb3JFYWNoKChidXR0b24pID0+IHtcbiAgICAgIGNvbnN0IGxhYmVsID0gYnV0dG9uLmdldEF0dHJpYnV0ZSgnZGF0YS1sYWJlbCcpO1xuXG4gICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBidXR0b24uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gYnV0dG9uU3R5bGVzLmNsaWNrZWRCYWNrZ3JvdW5kQ29sb3I7XG4gICAgICB9KTtcblxuICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGJ1dHRvbi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBidXR0b25TdHlsZXMuYmFja2dyb3VuZENvbG9yO1xuICAgICAgICB0aGlzLmVtaXQoJ2NoYW5nZScsIGxhYmVsKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQnV0dG9ucztcbiJdfQ==