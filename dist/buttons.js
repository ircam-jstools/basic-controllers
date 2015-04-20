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
      if (typeof $container === "string") {
        $container = document.querySelector($container);
      }

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
//# sourceMappingURL=data:application/json;base64,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T0FBTyxHQUFHLE9BQU8sQ0FBQyIsImZpbGUiOiJlczYvdXRpbHMvc3R5bGVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZXZlbnRzID0gcmVxdWlyZSgnZXZlbnRzJyk7XG5jb25zdCBzdHlsZXMgPSByZXF1aXJlKCcuL3V0aWxzL3N0eWxlcycpO1xuXG5jbGFzcyBCdXR0b25zIGV4dGVuZHMgZXZlbnRzLkV2ZW50RW1pdHRlciB7XG4gIGNvbnN0cnVjdG9yKGxlZ2VuZCwgbGFiZWxzLCAkY29udGFpbmVyID0gbnVsbCwgY2FsbGJhY2sgPSBudWxsKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMubGVnZW5kID0gbGVnZW5kO1xuICAgIHRoaXMubGFiZWxzID0gbGFiZWxzO1xuXG5cbiAgICBpZiAoJGNvbnRhaW5lcikge1xuICAgICAgaWYgKHR5cGVvZiAkY29udGFpbmVyID09PSAnc3RyaW5nJykge1xuICAgICAgICAkY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcigkY29udGFpbmVyKTtcbiAgICAgIH1cblxuICAgICAgJGNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLnJlbmRlcigpKTtcbiAgICB9XG5cbiAgICBpZiAoY2FsbGJhY2spIHsgdGhpcy5vbignY2hhbmdlJywgY2FsbGJhY2spOyB9XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgbGV0IGNvbnRlbnQgPSBgPHNwYW4gY2xhc3M9XCJsZWdlbmRcIj4ke3RoaXMubGVnZW5kfTwvc3Bhbj5gICtcbiAgICAgIGA8ZGl2IGNsYXNzPVwiYnV0dG9ucy1jb250YWluZXJcIj5gO1xuXG4gICAgY29udGVudCArPSB0aGlzLmxhYmVscy5tYXAoKGxhYmVsKSA9PiB7XG4gICAgICByZXR1cm4gYDxidXR0b24gZGF0YS1sYWJlbD1cIiR7bGFiZWx9XCI+JHtsYWJlbH08L2J1dHRvbj5gO1xuICAgIH0pLmpvaW4oJycpO1xuXG4gICAgY29udGVudCArPSBgPC9idXR0b24+YDtcblxuICAgIHRoaXMuJGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICB0aGlzLiRlbC5pbm5lckhUTUwgPSBjb250ZW50O1xuXG4gICAgdGhpcy4kbGVnZW5kID0gdGhpcy4kZWwucXVlcnlTZWxlY3RvcignLmxlZ2VuZCcpO1xuICAgIHRoaXMuJGJ1dHRvbnNDb250YWluZXIgPSB0aGlzLiRlbC5xdWVyeVNlbGVjdG9yKCcuYnV0dG9ucy1jb250YWluZXInKTtcbiAgICB0aGlzLiRidXR0b25zID0gQXJyYXkuZnJvbSh0aGlzLiRlbC5xdWVyeVNlbGVjdG9yQWxsKCdidXR0b24nKSk7XG5cbiAgICB0aGlzLmFkZFN0eWxlcygpO1xuICAgIHRoaXMuYmluZEV2ZW50cygpO1xuXG4gICAgcmV0dXJuIHRoaXMuJGVsO1xuICB9XG5cbiAgYWRkU3R5bGVzKCkge1xuICAgIGZvciAobGV0IGF0dHIgaW4gc3R5bGVzLmNvbnRhaW5lclN0eWxlcykge1xuICAgICAgdGhpcy4kZWwuc3R5bGVbYXR0cl0gPSBzdHlsZXMuY29udGFpbmVyU3R5bGVzW2F0dHJdO1xuICAgIH1cblxuICAgIGZvciAobGV0IGF0dHIgaW4gc3R5bGVzLmxlZ2VuZFN0eWxlcykge1xuICAgICAgdGhpcy4kbGVnZW5kLnN0eWxlW2F0dHJdID0gc3R5bGVzLmxlZ2VuZFN0eWxlc1thdHRyXTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBhdHRyIGluIHN0eWxlcy5idXR0b25zQ29udGFpbmVyU3R5bGVzKSB7XG4gICAgICB0aGlzLiRidXR0b25zQ29udGFpbmVyLnN0eWxlW2F0dHJdID0gc3R5bGVzLmJ1dHRvbnNDb250YWluZXJTdHlsZXNbYXR0cl07XG4gICAgfVxuXG4gICAgY29uc3QgYnV0dG9uV2lkdGggPSAxMDAgLyB0aGlzLiRidXR0b25zLmxlbmd0aDtcbiAgICB0aGlzLiRidXR0b25zLmZvckVhY2goKGJ1dHRvbikgPT4ge1xuICAgICAgYnV0dG9uLnN0eWxlLndpZHRoID0gYnV0dG9uV2lkdGggKyAnJSc7XG4gICAgICBmb3IgKGxldCBhdHRyIGluIHN0eWxlcy5idXR0b25TdHlsZXMpIHtcbiAgICAgICAgYnV0dG9uLnN0eWxlW2F0dHJdID0gc3R5bGVzLmJ1dHRvblN0eWxlc1thdHRyXTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGJpbmRFdmVudHMoKSB7XG4gICAgdGhpcy4kYnV0dG9ucy5mb3JFYWNoKChidXR0b24pID0+IHtcbiAgICAgIGNvbnN0IGxhYmVsID0gYnV0dG9uLmdldEF0dHJpYnV0ZSgnZGF0YS1sYWJlbCcpO1xuXG4gICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBidXR0b24uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gc3R5bGVzLmJ1dHRvblN0eWxlcy5jbGlja2VkQmFja2dyb3VuZENvbG9yO1xuICAgICAgfSk7XG5cbiAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBidXR0b24uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gc3R5bGVzLmJ1dHRvblN0eWxlcy5iYWNrZ3JvdW5kQ29sb3I7XG4gICAgICAgIHRoaXMuZW1pdCgnY2hhbmdlJywgbGFiZWwpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBCdXR0b25zO1xuIl19