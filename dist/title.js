"use strict";

var _classCallCheck = require("babel-runtime/helpers/class-call-check")["default"];

var _inherits = require("babel-runtime/helpers/inherits")["default"];

var _get = require("babel-runtime/helpers/get")["default"];

var _createClass = require("babel-runtime/helpers/create-class")["default"];

var _core = require("babel-runtime/core-js")["default"];

var events = require("events");
var styles = require("./utils/styles");

var Title = (function (_events$EventEmitter) {
  function Title(legend) {
    var $container = arguments[1] === undefined ? null : arguments[1];

    _classCallCheck(this, Title);

    _get(_core.Object.getPrototypeOf(Title.prototype), "constructor", this).call(this);

    this.legend = legend;

    if ($container) {
      if (typeof $container === "string") {
        $container = document.querySelector($container);
      }

      $container.appendChild(this.render());
    }
  }

  _inherits(Title, _events$EventEmitter);

  _createClass(Title, {
    render: {
      value: function render() {
        var content = "<span class=\"legend\">" + this.legend + "</span>" + "<div class=\"title-container\">";

        this.$el = document.createElement("label");
        this.$el.innerHTML = content;

        this.$legend = this.$el.querySelector(".legend");
        this.$titleContainer = this.$el.querySelector(".title-container");

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

        for (var attr in styles.titleContainerStyles) {
          this.$titleContainer.style[attr] = styles.titleContainerStyles[attr];
        }
      }
    }
  });

  return Title;
})(events.EventEmitter);

module.exports = Title;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVzNi91dGlscy9zdHlsZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsSUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ2pDLElBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDOztJQUVuQyxLQUFLO0FBQ0UsV0FEUCxLQUFLLENBQ0csTUFBTSxFQUFxQjtRQUFuQixVQUFVLGdDQUFHLElBQUk7OzBCQURqQyxLQUFLOztBQUVQLHFDQUZFLEtBQUssNkNBRUM7O0FBRVIsUUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7O0FBRXJCLFFBQUksVUFBVSxFQUFFO0FBQ2QsVUFBSSxPQUFPLFVBQVUsS0FBSyxRQUFRLEVBQUU7QUFDbEMsa0JBQVUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO09BQ2pEOztBQUVELGdCQUFVLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0tBQ3ZDO0dBQ0Y7O1lBYkcsS0FBSzs7ZUFBTCxLQUFLO0FBZVQsVUFBTTthQUFBLGtCQUFHO0FBQ1AsWUFBSSxPQUFPLEdBQUcsNEJBQXdCLElBQUksQ0FBQyxNQUFNLGdEQUNoQixDQUFDOztBQUVsQyxZQUFJLENBQUMsR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDM0MsWUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDOztBQUU3QixZQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ2pELFlBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsQ0FBQzs7QUFFbEUsWUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDOztBQUVqQixlQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7T0FDakI7O0FBRUQsYUFBUzthQUFBLHFCQUFHO0FBQ1YsYUFBSyxJQUFJLElBQUksSUFBSSxNQUFNLENBQUMsZUFBZSxFQUFFO0FBQ3ZDLGNBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDckQ7O0FBRUQsYUFBSyxJQUFJLElBQUksSUFBSSxNQUFNLENBQUMsWUFBWSxFQUFFO0FBQ3BDLGNBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDdEQ7O0FBRUQsYUFBSyxJQUFJLElBQUksSUFBSSxNQUFNLENBQUMsb0JBQW9CLEVBQUU7QUFDNUMsY0FBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3RFO09BQ0Y7Ozs7U0ExQ0csS0FBSztHQUFTLE1BQU0sQ0FBQyxZQUFZOztBQTZDdkMsTUFBTSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMiLCJmaWxlIjoiZXM2L3V0aWxzL3N0eWxlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGV2ZW50cyA9IHJlcXVpcmUoJ2V2ZW50cycpO1xuY29uc3Qgc3R5bGVzID0gcmVxdWlyZSgnLi91dGlscy9zdHlsZXMnKTtcblxuY2xhc3MgVGl0bGUgZXh0ZW5kcyBldmVudHMuRXZlbnRFbWl0dGVyIHtcbiAgY29uc3RydWN0b3IobGVnZW5kLCAkY29udGFpbmVyID0gbnVsbCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLmxlZ2VuZCA9IGxlZ2VuZDtcblxuICAgIGlmICgkY29udGFpbmVyKSB7XG4gICAgICBpZiAodHlwZW9mICRjb250YWluZXIgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICRjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCRjb250YWluZXIpO1xuICAgICAgfVxuXG4gICAgICAkY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMucmVuZGVyKCkpO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBsZXQgY29udGVudCA9IGA8c3BhbiBjbGFzcz1cImxlZ2VuZFwiPiR7dGhpcy5sZWdlbmR9PC9zcGFuPmAgK1xuICAgICAgYDxkaXYgY2xhc3M9XCJ0aXRsZS1jb250YWluZXJcIj5gO1xuXG4gICAgdGhpcy4kZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgIHRoaXMuJGVsLmlubmVySFRNTCA9IGNvbnRlbnQ7XG5cbiAgICB0aGlzLiRsZWdlbmQgPSB0aGlzLiRlbC5xdWVyeVNlbGVjdG9yKCcubGVnZW5kJyk7XG4gICAgdGhpcy4kdGl0bGVDb250YWluZXIgPSB0aGlzLiRlbC5xdWVyeVNlbGVjdG9yKCcudGl0bGUtY29udGFpbmVyJyk7XG5cbiAgICB0aGlzLmFkZFN0eWxlcygpO1xuXG4gICAgcmV0dXJuIHRoaXMuJGVsO1xuICB9XG5cbiAgYWRkU3R5bGVzKCkge1xuICAgIGZvciAobGV0IGF0dHIgaW4gc3R5bGVzLmNvbnRhaW5lclN0eWxlcykge1xuICAgICAgdGhpcy4kZWwuc3R5bGVbYXR0cl0gPSBzdHlsZXMuY29udGFpbmVyU3R5bGVzW2F0dHJdO1xuICAgIH1cblxuICAgIGZvciAobGV0IGF0dHIgaW4gc3R5bGVzLmxlZ2VuZFN0eWxlcykge1xuICAgICAgdGhpcy4kbGVnZW5kLnN0eWxlW2F0dHJdID0gc3R5bGVzLmxlZ2VuZFN0eWxlc1thdHRyXTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBhdHRyIGluIHN0eWxlcy50aXRsZUNvbnRhaW5lclN0eWxlcykge1xuICAgICAgdGhpcy4kdGl0bGVDb250YWluZXIuc3R5bGVbYXR0cl0gPSBzdHlsZXMudGl0bGVDb250YWluZXJTdHlsZXNbYXR0cl07XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gVGl0bGU7XG4iXX0=