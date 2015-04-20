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
//# sourceMappingURL=data:application/json;base64,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LENBQUM7T0FDSjs7OztTQXJGRyxNQUFNO0dBQVMsTUFBTSxDQUFDLFlBQVk7O0FBd0Z4QyxNQUFNLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyIsImZpbGUiOiJlczYvdXRpbHMvc3R5bGVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZXZlbnRzID0gcmVxdWlyZSgnZXZlbnRzJyk7XG5jb25zdCBzdHlsZXMgPSByZXF1aXJlKCcuL3V0aWxzL3N0eWxlcycpO1xuXG5jbGFzcyBUb2dnbGUgZXh0ZW5kcyBldmVudHMuRXZlbnRFbWl0dGVyIHtcbiAgY29uc3RydWN0b3IobGVnZW5kLCBhY3RpdmUgPSBmYWxzZSwgJGNvbnRhaW5lciA9IGZhbHNlLCBjYWxsYmFjayA9IG51bGwpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5sZWdlbmQgPSBsZWdlbmQ7XG4gICAgdGhpcy5fYWN0aXZlID0gYWN0aXZlO1xuXG4gICAgaWYgKCRjb250YWluZXIpIHsgJGNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLnJlbmRlcigpKTsgfVxuICAgIGlmIChjYWxsYmFjaykgeyB0aGlzLm9uKCdjaGFuZ2UnLCBjYWxsYmFjayk7IH1cbiAgfVxuXG4gIHNldCBhY3RpdmUoYm9vbCkge1xuICAgIHRoaXMuX2FjdGl2ZSA9IGJvb2w7XG4gICAgdGhpcy51cGRhdGVCdG4oKTtcbiAgfVxuXG4gIGdldCBhY3RpdmUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2FjdGl2ZTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBsZXQgY29udGVudCA9IGA8c3BhbiBjbGFzcz1cImxlZ2VuZFwiPiR7dGhpcy5sZWdlbmR9PC9zcGFuPmAgK1xuICAgICAgYDxkaXYgY2xhc3M9XCJ0b2dnbGUtY29udGFpbmVyXCI+PGRpdiBjbGFzcz1cInRvZ2dsZS1hY3RpdmVcIj5gICtcbiAgICAgICAgYDxkaXYgY2xhc3M9XCJ4LTFcIj48L2Rpdj48ZGl2IGNsYXNzPVwieC0yXCI+PC9kaXY+YCArXG4gICAgICBgPC9kaXY+PC9kaXY+YDtcblxuICAgIHRoaXMuJGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICB0aGlzLiRlbC5pbm5lckhUTUwgPSBjb250ZW50O1xuXG4gICAgdGhpcy4kbGVnZW5kID0gdGhpcy4kZWwucXVlcnlTZWxlY3RvcignLmxlZ2VuZCcpO1xuICAgIHRoaXMuJHRvZ2dsZUNvbnRhaW5lciA9IHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoJy50b2dnbGUtY29udGFpbmVyJyk7XG4gICAgdGhpcy4kdG9nZ2xlQWN0aXZlID0gdGhpcy4kZWwucXVlcnlTZWxlY3RvcignLnRvZ2dsZS1hY3RpdmUnKTtcblxuICAgIC8vIGRyYXcgYSBuaWNlIHByZXR0eSBjcm9zc2hhaXJcbiAgICB0aGlzLiR4MSA9IHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoJy54LTEnKTtcbiAgICB0aGlzLiR4MiA9IHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoJy54LTInKTtcblxuICAgIHRoaXMuYWRkU3R5bGVzKCk7XG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XG5cbiAgICAvLyBpbml0aWFsaXplXG4gICAgdGhpcy5hY3RpdmUgPSB0aGlzLl9hY3RpdmU7XG5cbiAgICByZXR1cm4gdGhpcy4kZWw7XG4gIH1cblxuICB1cGRhdGVCdG4oKSB7XG4gICAgdmFyIGRpc3BsYXkgPSB0aGlzLmFjdGl2ZSA/ICdibG9jaycgOiAnbm9uZSc7XG4gICAgdGhpcy4kdG9nZ2xlQWN0aXZlLnN0eWxlLmRpc3BsYXkgPSBkaXNwbGF5O1xuICB9XG5cbiAgYWRkU3R5bGVzKCkge1xuICAgIGZvciAobGV0IGF0dHIgaW4gc3R5bGVzLmNvbnRhaW5lclN0eWxlcykge1xuICAgICAgdGhpcy4kZWwuc3R5bGVbYXR0cl0gPSBzdHlsZXMuY29udGFpbmVyU3R5bGVzW2F0dHJdO1xuICAgIH1cblxuICAgIGZvciAobGV0IGF0dHIgaW4gc3R5bGVzLmxlZ2VuZFN0eWxlcykge1xuICAgICAgdGhpcy4kbGVnZW5kLnN0eWxlW2F0dHJdID0gc3R5bGVzLmxlZ2VuZFN0eWxlc1thdHRyXTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBhdHRyIGluIHN0eWxlcy50b2dnbGVDb250YWluZXIpIHtcbiAgICAgIHRoaXMuJHRvZ2dsZUNvbnRhaW5lci5zdHlsZVthdHRyXSA9IHN0eWxlcy50b2dnbGVDb250YWluZXJbYXR0cl07XG4gICAgfVxuXG4gICAgZm9yIChsZXQgYXR0ciBpbiBzdHlsZXMudG9nZ2xlQWN0aXZlKSB7XG4gICAgICB0aGlzLiR0b2dnbGVBY3RpdmUuc3R5bGVbYXR0cl0gPSBzdHlsZXMudG9nZ2xlQWN0aXZlW2F0dHJdO1xuICAgIH1cblxuICAgIGZvciAobGV0IGF0dHIgaW4gc3R5bGVzLngxKSB7XG4gICAgICB0aGlzLiR4MS5zdHlsZVthdHRyXSA9IHN0eWxlcy54MVthdHRyXTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBhdHRyIGluIHN0eWxlcy54Mikge1xuICAgICAgdGhpcy4keDIuc3R5bGVbYXR0cl0gPSBzdHlsZXMueDJbYXR0cl07XG4gICAgfVxuICB9XG5cbiAgYmluZEV2ZW50cygpIHtcbiAgICB0aGlzLiR0b2dnbGVDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdmFyIGFjdGl2ZSA9IHRoaXMuYWN0aXZlID8gZmFsc2UgOiB0cnVlO1xuICAgICAgdGhpcy5hY3RpdmUgPSBhY3RpdmU7XG5cbiAgICAgIHRoaXMuZW1pdCgnY2hhbmdlJywgYWN0aXZlKTtcbiAgICB9KTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFRvZ2dsZTsiXX0=