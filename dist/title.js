"use strict";

var _classCallCheck = require("babel-runtime/helpers/class-call-check")["default"];

var _inherits = require("babel-runtime/helpers/inherits")["default"];

var _get = require("babel-runtime/helpers/get")["default"];

var _createClass = require("babel-runtime/helpers/create-class")["default"];

var _core = require("babel-runtime/core-js")["default"];

var events = require("events");
var styles = require("./utils/styles");

var Title = (function (_events$EventEmitter) {
  function Title(title) {
    var $container = arguments[1] === undefined ? null : arguments[1];

    _classCallCheck(this, Title);

    _get(_core.Object.getPrototypeOf(Title.prototype), "constructor", this).call(this);

    this.title = title;

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
        var content = "<span class=\"title\">" + this.title + "</span>" + "<div class=\"title-container\">";

        this.$el = document.createElement("label");
        this.$el.innerHTML = content;

        this.$title = this.$el.querySelector(".title");
        this.$titleContainer = this.$el.querySelector(".title-container");

        this.addStyles();

        return this.$el;
      }
    },
    addStyles: {
      value: function addStyles() {
        for (var attr in styles.containerStyles) {
          this.$el.style[attr] = styles.transparentContainerStyles[attr];
        }

        for (var attr in styles.titleStyles) {
          this.$title.style[attr] = styles.titleStyles[attr];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVzNi91dGlscy9zdHlsZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsSUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ2pDLElBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDOztJQUVuQyxLQUFLO0FBQ0UsV0FEUCxLQUFLLENBQ0csS0FBSyxFQUFxQjtRQUFuQixVQUFVLGdDQUFHLElBQUk7OzBCQURoQyxLQUFLOztBQUVQLHFDQUZFLEtBQUssNkNBRUM7O0FBRVIsUUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7O0FBRW5CLFFBQUksVUFBVSxFQUFFO0FBQ2QsVUFBSSxPQUFPLFVBQVUsS0FBSyxRQUFRLEVBQUU7QUFDbEMsa0JBQVUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO09BQ2pEOztBQUVELGdCQUFVLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0tBQ3ZDO0dBQ0Y7O1lBYkcsS0FBSzs7ZUFBTCxLQUFLO0FBZVQsVUFBTTthQUFBLGtCQUFHO0FBQ1AsWUFBSSxPQUFPLEdBQUcsMkJBQXVCLElBQUksQ0FBQyxLQUFLLGdEQUNkLENBQUM7O0FBRWxDLFlBQUksQ0FBQyxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUMzQyxZQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUM7O0FBRTdCLFlBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDL0MsWUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDOztBQUVsRSxZQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7O0FBRWpCLGVBQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztPQUNqQjs7QUFFRCxhQUFTO2FBQUEscUJBQUc7QUFDVixhQUFLLElBQUksSUFBSSxJQUFJLE1BQU0sQ0FBQyxlQUFlLEVBQUU7QUFDdkMsY0FBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDLDBCQUEwQixDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2hFOztBQUVELGFBQUssSUFBSSxJQUFJLElBQUksTUFBTSxDQUFDLFdBQVcsRUFBRTtBQUNuQyxjQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3BEOztBQUVELGFBQUssSUFBSSxJQUFJLElBQUksTUFBTSxDQUFDLG9CQUFvQixFQUFFO0FBQzVDLGNBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN0RTtPQUNGOzs7O1NBMUNHLEtBQUs7R0FBUyxNQUFNLENBQUMsWUFBWTs7QUE2Q3ZDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDIiwiZmlsZSI6ImVzNi91dGlscy9zdHlsZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBldmVudHMgPSByZXF1aXJlKCdldmVudHMnKTtcbmNvbnN0IHN0eWxlcyA9IHJlcXVpcmUoJy4vdXRpbHMvc3R5bGVzJyk7XG5cbmNsYXNzIFRpdGxlIGV4dGVuZHMgZXZlbnRzLkV2ZW50RW1pdHRlciB7XG4gIGNvbnN0cnVjdG9yKHRpdGxlLCAkY29udGFpbmVyID0gbnVsbCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG5cbiAgICBpZiAoJGNvbnRhaW5lcikge1xuICAgICAgaWYgKHR5cGVvZiAkY29udGFpbmVyID09PSAnc3RyaW5nJykge1xuICAgICAgICAkY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcigkY29udGFpbmVyKTtcbiAgICAgIH1cblxuICAgICAgJGNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLnJlbmRlcigpKTtcbiAgICB9XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgbGV0IGNvbnRlbnQgPSBgPHNwYW4gY2xhc3M9XCJ0aXRsZVwiPiR7dGhpcy50aXRsZX08L3NwYW4+YCArXG4gICAgICBgPGRpdiBjbGFzcz1cInRpdGxlLWNvbnRhaW5lclwiPmA7XG5cbiAgICB0aGlzLiRlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgdGhpcy4kZWwuaW5uZXJIVE1MID0gY29udGVudDtcblxuICAgIHRoaXMuJHRpdGxlID0gdGhpcy4kZWwucXVlcnlTZWxlY3RvcignLnRpdGxlJyk7XG4gICAgdGhpcy4kdGl0bGVDb250YWluZXIgPSB0aGlzLiRlbC5xdWVyeVNlbGVjdG9yKCcudGl0bGUtY29udGFpbmVyJyk7XG5cbiAgICB0aGlzLmFkZFN0eWxlcygpO1xuXG4gICAgcmV0dXJuIHRoaXMuJGVsO1xuICB9XG5cbiAgYWRkU3R5bGVzKCkge1xuICAgIGZvciAobGV0IGF0dHIgaW4gc3R5bGVzLmNvbnRhaW5lclN0eWxlcykge1xuICAgICAgdGhpcy4kZWwuc3R5bGVbYXR0cl0gPSBzdHlsZXMudHJhbnNwYXJlbnRDb250YWluZXJTdHlsZXNbYXR0cl07XG4gICAgfVxuXG4gICAgZm9yIChsZXQgYXR0ciBpbiBzdHlsZXMudGl0bGVTdHlsZXMpIHtcbiAgICAgIHRoaXMuJHRpdGxlLnN0eWxlW2F0dHJdID0gc3R5bGVzLnRpdGxlU3R5bGVzW2F0dHJdO1xuICAgIH1cblxuICAgIGZvciAobGV0IGF0dHIgaW4gc3R5bGVzLnRpdGxlQ29udGFpbmVyU3R5bGVzKSB7XG4gICAgICB0aGlzLiR0aXRsZUNvbnRhaW5lci5zdHlsZVthdHRyXSA9IHN0eWxlcy50aXRsZUNvbnRhaW5lclN0eWxlc1thdHRyXTtcbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBUaXRsZTtcbiJdfQ==