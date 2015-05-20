'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _get = require('babel-runtime/helpers/get')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var events = require('events');
var styles = require('./utils/styles');

var Title = (function (_events$EventEmitter) {
  function Title(title) {
    var $container = arguments[1] === undefined ? null : arguments[1];

    _classCallCheck(this, Title);

    _get(Object.getPrototypeOf(Title.prototype), 'constructor', this).call(this);

    this.title = title;

    if ($container) {
      if (typeof $container === 'string') {
        $container = document.querySelector($container);
      }

      $container.appendChild(this.render());
    }
  }

  _inherits(Title, _events$EventEmitter);

  _createClass(Title, [{
    key: 'render',
    value: function render() {
      var content = '<span class="title">' + this.title + '</span>' + '<div class="title-container">';

      this.$el = document.createElement('label');
      this.$el.innerHTML = content;

      this.$title = this.$el.querySelector('.title');
      this.$titleContainer = this.$el.querySelector('.title-container');

      this.addStyles();

      return this.$el;
    }
  }, {
    key: 'addStyles',
    value: function addStyles() {
      for (var attr in styles.transparentContainerStyles) {
        this.$el.style[attr] = styles.transparentContainerStyles[attr];
      }

      for (var attr in styles.titleStyles) {
        this.$title.style[attr] = styles.titleStyles[attr];
      }

      for (var attr in styles.titleContainerStyles) {
        this.$titleContainer.style[attr] = styles.titleContainerStyles[attr];
      }
    }
  }]);

  return Title;
})(events.EventEmitter);

module.exports = Title;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVzNi91dGlscy9zdHlsZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLElBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNqQyxJQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQzs7SUFFbkMsS0FBSztBQUNFLFdBRFAsS0FBSyxDQUNHLEtBQUssRUFBcUI7UUFBbkIsVUFBVSxnQ0FBRyxJQUFJOzswQkFEaEMsS0FBSzs7QUFFUCwrQkFGRSxLQUFLLDZDQUVDOztBQUVSLFFBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDOztBQUVuQixRQUFJLFVBQVUsRUFBRTtBQUNkLFVBQUksT0FBTyxVQUFVLEtBQUssUUFBUSxFQUFFO0FBQ2xDLGtCQUFVLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztPQUNqRDs7QUFFRCxnQkFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztLQUN2QztHQUNGOztZQWJHLEtBQUs7O2VBQUwsS0FBSzs7V0FlSCxrQkFBRztBQUNQLFVBQUksT0FBTyxHQUFHLHlCQUF1QixJQUFJLENBQUMsS0FBSyw4Q0FDZCxDQUFDOztBQUVsQyxVQUFJLENBQUMsR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDM0MsVUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDOztBQUU3QixVQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQy9DLFVBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsQ0FBQzs7QUFFbEUsVUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDOztBQUVqQixhQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7S0FDakI7OztXQUVRLHFCQUFHO0FBQ1YsV0FBSyxJQUFJLElBQUksSUFBSSxNQUFNLENBQUMsMEJBQTBCLEVBQUU7QUFDbEQsWUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDLDBCQUEwQixDQUFDLElBQUksQ0FBQyxDQUFDO09BQ2hFOztBQUVELFdBQUssSUFBSSxJQUFJLElBQUksTUFBTSxDQUFDLFdBQVcsRUFBRTtBQUNuQyxZQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO09BQ3BEOztBQUVELFdBQUssSUFBSSxJQUFJLElBQUksTUFBTSxDQUFDLG9CQUFvQixFQUFFO0FBQzVDLFlBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztPQUN0RTtLQUNGOzs7U0ExQ0csS0FBSztHQUFTLE1BQU0sQ0FBQyxZQUFZOztBQTZDdkMsTUFBTSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMiLCJmaWxlIjoiZXM2L3V0aWxzL3N0eWxlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGV2ZW50cyA9IHJlcXVpcmUoJ2V2ZW50cycpO1xuY29uc3Qgc3R5bGVzID0gcmVxdWlyZSgnLi91dGlscy9zdHlsZXMnKTtcblxuY2xhc3MgVGl0bGUgZXh0ZW5kcyBldmVudHMuRXZlbnRFbWl0dGVyIHtcbiAgY29uc3RydWN0b3IodGl0bGUsICRjb250YWluZXIgPSBudWxsKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcblxuICAgIGlmICgkY29udGFpbmVyKSB7XG4gICAgICBpZiAodHlwZW9mICRjb250YWluZXIgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICRjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCRjb250YWluZXIpO1xuICAgICAgfVxuXG4gICAgICAkY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMucmVuZGVyKCkpO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBsZXQgY29udGVudCA9IGA8c3BhbiBjbGFzcz1cInRpdGxlXCI+JHt0aGlzLnRpdGxlfTwvc3Bhbj5gICtcbiAgICAgIGA8ZGl2IGNsYXNzPVwidGl0bGUtY29udGFpbmVyXCI+YDtcblxuICAgIHRoaXMuJGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICB0aGlzLiRlbC5pbm5lckhUTUwgPSBjb250ZW50O1xuXG4gICAgdGhpcy4kdGl0bGUgPSB0aGlzLiRlbC5xdWVyeVNlbGVjdG9yKCcudGl0bGUnKTtcbiAgICB0aGlzLiR0aXRsZUNvbnRhaW5lciA9IHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoJy50aXRsZS1jb250YWluZXInKTtcblxuICAgIHRoaXMuYWRkU3R5bGVzKCk7XG5cbiAgICByZXR1cm4gdGhpcy4kZWw7XG4gIH1cblxuICBhZGRTdHlsZXMoKSB7XG4gICAgZm9yIChsZXQgYXR0ciBpbiBzdHlsZXMudHJhbnNwYXJlbnRDb250YWluZXJTdHlsZXMpIHtcbiAgICAgIHRoaXMuJGVsLnN0eWxlW2F0dHJdID0gc3R5bGVzLnRyYW5zcGFyZW50Q29udGFpbmVyU3R5bGVzW2F0dHJdO1xuICAgIH1cblxuICAgIGZvciAobGV0IGF0dHIgaW4gc3R5bGVzLnRpdGxlU3R5bGVzKSB7XG4gICAgICB0aGlzLiR0aXRsZS5zdHlsZVthdHRyXSA9IHN0eWxlcy50aXRsZVN0eWxlc1thdHRyXTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBhdHRyIGluIHN0eWxlcy50aXRsZUNvbnRhaW5lclN0eWxlcykge1xuICAgICAgdGhpcy4kdGl0bGVDb250YWluZXIuc3R5bGVbYXR0cl0gPSBzdHlsZXMudGl0bGVDb250YWluZXJTdHlsZXNbYXR0cl07XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gVGl0bGU7XG4iXX0=