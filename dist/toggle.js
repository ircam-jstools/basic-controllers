"use strict";

var _classCallCheck = require("babel-runtime/helpers/class-call-check")["default"];

var _inherits = require("babel-runtime/helpers/inherits")["default"];

var _get = require("babel-runtime/helpers/get")["default"];

var _createClass = require("babel-runtime/helpers/create-class")["default"];

var _core = require("babel-runtime/core-js")["default"];

var events = require("events");
var styles = require("./utils/styles");

var Toggle = (function (_events$EventEmitter) {
  function Toggle(legend) {
    var active = arguments[1] === undefined ? false : arguments[1];
    var $container = arguments[2] === undefined ? false : arguments[2];
    var callback = arguments[3] === undefined ? null : arguments[3];

    _classCallCheck(this, Toggle);

    _get(_core.Object.getPrototypeOf(Toggle.prototype), "constructor", this).call(this);

    this.legend = legend;
    this._active = active;

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

  _inherits(Toggle, _events$EventEmitter);

  _createClass(Toggle, {
    active: {
      set: function (bool) {
        this._active = bool;
        this.updateBtn();
      },
      get: function () {
        return this._active;
      }
    },
    render: {
      value: function render() {
        var content = "<span class=\"legend\">" + this.legend + "</span>" + "<div class=\"toggle-container\"><div class=\"toggle-active\">" + "<div class=\"x-1\"></div><div class=\"x-2\"></div>" + "</div></div>";

        this.$el = document.createElement("label");
        this.$el.innerHTML = content;

        this.$legend = this.$el.querySelector(".legend");
        this.$toggleContainer = this.$el.querySelector(".toggle-container");
        this.$toggleActive = this.$el.querySelector(".toggle-active");

        // draw a nice pretty crosshair
        this.$x1 = this.$el.querySelector(".x-1");
        this.$x2 = this.$el.querySelector(".x-2");

        this.addStyles();
        this.bindEvents();

        // initialize
        this.active = this._active;

        return this.$el;
      }
    },
    updateBtn: {
      value: function updateBtn() {
        var display = this.active ? "block" : "none";
        this.$toggleActive.style.display = display;
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

        for (var attr in styles.toggleContainer) {
          this.$toggleContainer.style[attr] = styles.toggleContainer[attr];
        }

        for (var attr in styles.toggleActive) {
          this.$toggleActive.style[attr] = styles.toggleActive[attr];
        }

        for (var attr in styles.x1) {
          this.$x1.style[attr] = styles.x1[attr];
        }

        for (var attr in styles.x2) {
          this.$x2.style[attr] = styles.x2[attr];
        }
      }
    },
    bindEvents: {
      value: function bindEvents() {
        var _this = this;

        this.$toggleContainer.addEventListener("click", function (e) {
          e.preventDefault();
          var active = _this.active ? false : true;
          _this.active = active;

          _this.emit("change", active);
        });
      }
    }
  });

  return Toggle;
})(events.EventEmitter);

module.exports = Toggle;
//# sourceMappingURL=data:application/json;base64,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LENBQUM7QUFDeEMsZ0JBQUssTUFBTSxHQUFHLE1BQU0sQ0FBQzs7QUFFckIsZ0JBQUssSUFBSSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztTQUM3QixDQUFDLENBQUM7T0FDSjs7OztTQTdGRyxNQUFNO0dBQVMsTUFBTSxDQUFDLFlBQVk7O0FBZ0d4QyxNQUFNLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyIsImZpbGUiOiJlczYvdXRpbHMvc3R5bGVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZXZlbnRzID0gcmVxdWlyZSgnZXZlbnRzJyk7XG5jb25zdCBzdHlsZXMgPSByZXF1aXJlKCcuL3V0aWxzL3N0eWxlcycpO1xuXG5jbGFzcyBUb2dnbGUgZXh0ZW5kcyBldmVudHMuRXZlbnRFbWl0dGVyIHtcbiAgY29uc3RydWN0b3IobGVnZW5kLCBhY3RpdmUgPSBmYWxzZSwgJGNvbnRhaW5lciA9IGZhbHNlLCBjYWxsYmFjayA9IG51bGwpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5sZWdlbmQgPSBsZWdlbmQ7XG4gICAgdGhpcy5fYWN0aXZlID0gYWN0aXZlO1xuXG5cbiAgICBpZiAoJGNvbnRhaW5lcikge1xuICAgICAgaWYgKHR5cGVvZiAkY29udGFpbmVyID09PSAnc3RyaW5nJykge1xuICAgICAgICAkY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcigkY29udGFpbmVyKTtcbiAgICAgIH1cblxuICAgICAgJGNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLnJlbmRlcigpKTtcbiAgICB9XG5cbiAgICBpZiAoY2FsbGJhY2spIHsgdGhpcy5vbignY2hhbmdlJywgY2FsbGJhY2spOyB9XG4gIH1cblxuICBzZXQgYWN0aXZlKGJvb2wpIHtcbiAgICB0aGlzLl9hY3RpdmUgPSBib29sO1xuICAgIHRoaXMudXBkYXRlQnRuKCk7XG4gIH1cblxuICBnZXQgYWN0aXZlKCkge1xuICAgIHJldHVybiB0aGlzLl9hY3RpdmU7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgbGV0IGNvbnRlbnQgPSBgPHNwYW4gY2xhc3M9XCJsZWdlbmRcIj4ke3RoaXMubGVnZW5kfTwvc3Bhbj5gICtcbiAgICAgIGA8ZGl2IGNsYXNzPVwidG9nZ2xlLWNvbnRhaW5lclwiPjxkaXYgY2xhc3M9XCJ0b2dnbGUtYWN0aXZlXCI+YCArXG4gICAgICAgIGA8ZGl2IGNsYXNzPVwieC0xXCI+PC9kaXY+PGRpdiBjbGFzcz1cIngtMlwiPjwvZGl2PmAgK1xuICAgICAgYDwvZGl2PjwvZGl2PmA7XG5cbiAgICB0aGlzLiRlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgdGhpcy4kZWwuaW5uZXJIVE1MID0gY29udGVudDtcblxuICAgIHRoaXMuJGxlZ2VuZCA9IHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoJy5sZWdlbmQnKTtcbiAgICB0aGlzLiR0b2dnbGVDb250YWluZXIgPSB0aGlzLiRlbC5xdWVyeVNlbGVjdG9yKCcudG9nZ2xlLWNvbnRhaW5lcicpO1xuICAgIHRoaXMuJHRvZ2dsZUFjdGl2ZSA9IHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoJy50b2dnbGUtYWN0aXZlJyk7XG5cbiAgICAvLyBkcmF3IGEgbmljZSBwcmV0dHkgY3Jvc3NoYWlyXG4gICAgdGhpcy4keDEgPSB0aGlzLiRlbC5xdWVyeVNlbGVjdG9yKCcueC0xJyk7XG4gICAgdGhpcy4keDIgPSB0aGlzLiRlbC5xdWVyeVNlbGVjdG9yKCcueC0yJyk7XG5cbiAgICB0aGlzLmFkZFN0eWxlcygpO1xuICAgIHRoaXMuYmluZEV2ZW50cygpO1xuXG4gICAgLy8gaW5pdGlhbGl6ZVxuICAgIHRoaXMuYWN0aXZlID0gdGhpcy5fYWN0aXZlO1xuXG4gICAgcmV0dXJuIHRoaXMuJGVsO1xuICB9XG5cbiAgdXBkYXRlQnRuKCkge1xuICAgIHZhciBkaXNwbGF5ID0gdGhpcy5hY3RpdmUgPyAnYmxvY2snIDogJ25vbmUnO1xuICAgIHRoaXMuJHRvZ2dsZUFjdGl2ZS5zdHlsZS5kaXNwbGF5ID0gZGlzcGxheTtcbiAgfVxuXG4gIGFkZFN0eWxlcygpIHtcbiAgICBmb3IgKGxldCBhdHRyIGluIHN0eWxlcy5jb250YWluZXJTdHlsZXMpIHtcbiAgICAgIHRoaXMuJGVsLnN0eWxlW2F0dHJdID0gc3R5bGVzLmNvbnRhaW5lclN0eWxlc1thdHRyXTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBhdHRyIGluIHN0eWxlcy5sZWdlbmRTdHlsZXMpIHtcbiAgICAgIHRoaXMuJGxlZ2VuZC5zdHlsZVthdHRyXSA9IHN0eWxlcy5sZWdlbmRTdHlsZXNbYXR0cl07XG4gICAgfVxuXG4gICAgZm9yIChsZXQgYXR0ciBpbiBzdHlsZXMudG9nZ2xlQ29udGFpbmVyKSB7XG4gICAgICB0aGlzLiR0b2dnbGVDb250YWluZXIuc3R5bGVbYXR0cl0gPSBzdHlsZXMudG9nZ2xlQ29udGFpbmVyW2F0dHJdO1xuICAgIH1cblxuICAgIGZvciAobGV0IGF0dHIgaW4gc3R5bGVzLnRvZ2dsZUFjdGl2ZSkge1xuICAgICAgdGhpcy4kdG9nZ2xlQWN0aXZlLnN0eWxlW2F0dHJdID0gc3R5bGVzLnRvZ2dsZUFjdGl2ZVthdHRyXTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBhdHRyIGluIHN0eWxlcy54MSkge1xuICAgICAgdGhpcy4keDEuc3R5bGVbYXR0cl0gPSBzdHlsZXMueDFbYXR0cl07XG4gICAgfVxuXG4gICAgZm9yIChsZXQgYXR0ciBpbiBzdHlsZXMueDIpIHtcbiAgICAgIHRoaXMuJHgyLnN0eWxlW2F0dHJdID0gc3R5bGVzLngyW2F0dHJdO1xuICAgIH1cbiAgfVxuXG4gIGJpbmRFdmVudHMoKSB7XG4gICAgdGhpcy4kdG9nZ2xlQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHZhciBhY3RpdmUgPSB0aGlzLmFjdGl2ZSA/IGZhbHNlIDogdHJ1ZTtcbiAgICAgIHRoaXMuYWN0aXZlID0gYWN0aXZlO1xuXG4gICAgICB0aGlzLmVtaXQoJ2NoYW5nZScsIGFjdGl2ZSk7XG4gICAgfSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBUb2dnbGU7Il19