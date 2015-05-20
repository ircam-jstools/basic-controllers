'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _get = require('babel-runtime/helpers/get')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _Array$from = require('babel-runtime/core-js/array/from')['default'];

var events = require('events');
var styles = require('./utils/styles');

var Buttons = (function (_events$EventEmitter) {
  function Buttons(legend, labels) {
    var $container = arguments[2] === undefined ? null : arguments[2];
    var callback = arguments[3] === undefined ? null : arguments[3];

    _classCallCheck(this, Buttons);

    _get(Object.getPrototypeOf(Buttons.prototype), 'constructor', this).call(this);

    this.legend = legend;
    this.labels = labels;

    console.log(this);
    if ($container) {
      if (typeof $container === 'string') {
        $container = document.querySelector($container);
      }

      $container.appendChild(this.render());
    }

    if (callback) {
      this.on('change', callback);
    }
  }

  _inherits(Buttons, _events$EventEmitter);

  _createClass(Buttons, [{
    key: 'render',
    value: function render() {
      var content = '<span class="legend">' + this.legend + '</span>\n      <div class="inner-wrapper">';

      content += this.labels.map(function (label) {
        return '<button data-label="' + label + '">' + label + '</button>';
      }).join('');

      content += '</div>';

      this.$el = document.createElement('label');
      this.$el.classList.add(styles.ns, 'buttons');
      this.$el.innerHTML = content;

      this.$legend = this.$el.querySelector('.legend');
      this.$buttonsContainer = this.$el.querySelector('.buttons-container');
      this.$buttons = _Array$from(this.$el.querySelectorAll('button'));

      this.addStyles();
      this.bindEvents();

      return this.$el;
    }
  }, {
    key: 'addStyles',
    value: function addStyles() {
      styles.insertRules('.buttons', styles.containerStyles);
      styles.insertRules('.buttons .legend', styles.legendStyles);
      styles.insertRules('.buttons .inner-wrapper', styles.innerWrapper);
      styles.insertRules('.buttons button', styles.buttonStyles);
      styles.insertRules('.buttons button.active', styles.buttonActiveStyles);
      // styles.insertRules('.buttons button:focus', styles.buttonFocusStyles);
    }
  }, {
    key: 'bindEvents',
    value: function bindEvents() {
      var _this = this;

      this.$buttons.forEach(function (button) {
        var label = button.getAttribute('data-label');

        button.addEventListener('mousedown', function (e) {
          e.preventDefault();
          button.classList.add('active');
        });

        button.addEventListener('mouseup', function (e) {
          e.preventDefault();
          button.classList.remove('active');
          _this.emit('change', label);
        });
      });
    }
  }]);

  return Buttons;
})(events.EventEmitter);

module.exports = Buttons;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVzNi9idXR0b25zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLElBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNqQyxJQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQzs7SUFFbkMsT0FBTztBQUNBLFdBRFAsT0FBTyxDQUNDLE1BQU0sRUFBRSxNQUFNLEVBQXNDO1FBQXBDLFVBQVUsZ0NBQUcsSUFBSTtRQUFFLFFBQVEsZ0NBQUcsSUFBSTs7MEJBRDFELE9BQU87O0FBRVQsK0JBRkUsT0FBTyw2Q0FFRDs7QUFFUixRQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztBQUNyQixRQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQzs7QUFFckIsV0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNsQixRQUFJLFVBQVUsRUFBRTtBQUNkLFVBQUksT0FBTyxVQUFVLEtBQUssUUFBUSxFQUFFO0FBQ2xDLGtCQUFVLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztPQUNqRDs7QUFFRCxnQkFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztLQUN2Qzs7QUFFRCxRQUFJLFFBQVEsRUFBRTtBQUFFLFVBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0tBQUU7R0FDL0M7O1lBakJHLE9BQU87O2VBQVAsT0FBTzs7V0FtQkwsa0JBQUc7QUFDUCxVQUFJLE9BQU8sNkJBQTJCLElBQUksQ0FBQyxNQUFNLCtDQUNuQixDQUFDOztBQUUvQixhQUFPLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBQyxLQUFLLEVBQUs7QUFDcEMsd0NBQThCLEtBQUssVUFBSyxLQUFLLGVBQVk7T0FDMUQsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQzs7QUFFWixhQUFPLFlBQVksQ0FBQzs7QUFFcEIsVUFBSSxDQUFDLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzNDLFVBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBQzdDLFVBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQzs7QUFFN0IsVUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNqRCxVQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsb0JBQW9CLENBQUMsQ0FBQztBQUN0RSxVQUFJLENBQUMsUUFBUSxHQUFHLFlBQVcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDOztBQUVoRSxVQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7QUFDakIsVUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDOztBQUVsQixhQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7S0FDakI7OztXQUVRLHFCQUFHO0FBQ1YsWUFBTSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBQ3ZELFlBQU0sQ0FBQyxXQUFXLENBQUMsa0JBQWtCLEVBQUUsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQzVELFlBQU0sQ0FBQyxXQUFXLENBQUMseUJBQXlCLEVBQUUsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ25FLFlBQU0sQ0FBQyxXQUFXLENBQUMsaUJBQWlCLEVBQUUsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQzNELFlBQU0sQ0FBQyxXQUFXLENBQUMsd0JBQXdCLEVBQUUsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUM7O0tBRXpFOzs7V0FFUyxzQkFBRzs7O0FBQ1gsVUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBQyxNQUFNLEVBQUs7QUFDaEMsWUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQzs7QUFFaEQsY0FBTSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxVQUFDLENBQUMsRUFBSztBQUMxQyxXQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7QUFDbkIsZ0JBQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ2hDLENBQUMsQ0FBQzs7QUFFSCxjQUFNLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLFVBQUMsQ0FBQyxFQUFLO0FBQ3hDLFdBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUNuQixnQkFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDbEMsZ0JBQUssSUFBSSxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztTQUM1QixDQUFDLENBQUM7T0FDSixDQUFDLENBQUM7S0FDSjs7O1NBbkVHLE9BQU87R0FBUyxNQUFNLENBQUMsWUFBWTs7QUFzRXpDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDIiwiZmlsZSI6ImVzNi9idXR0b25zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZXZlbnRzID0gcmVxdWlyZSgnZXZlbnRzJyk7XG5jb25zdCBzdHlsZXMgPSByZXF1aXJlKCcuL3V0aWxzL3N0eWxlcycpO1xuXG5jbGFzcyBCdXR0b25zIGV4dGVuZHMgZXZlbnRzLkV2ZW50RW1pdHRlciB7XG4gIGNvbnN0cnVjdG9yKGxlZ2VuZCwgbGFiZWxzLCAkY29udGFpbmVyID0gbnVsbCwgY2FsbGJhY2sgPSBudWxsKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMubGVnZW5kID0gbGVnZW5kO1xuICAgIHRoaXMubGFiZWxzID0gbGFiZWxzO1xuXG4gICAgY29uc29sZS5sb2codGhpcyk7XG4gICAgaWYgKCRjb250YWluZXIpIHtcbiAgICAgIGlmICh0eXBlb2YgJGNvbnRhaW5lciA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgJGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJGNvbnRhaW5lcik7XG4gICAgICB9XG5cbiAgICAgICRjb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5yZW5kZXIoKSk7XG4gICAgfVxuXG4gICAgaWYgKGNhbGxiYWNrKSB7IHRoaXMub24oJ2NoYW5nZScsIGNhbGxiYWNrKTsgfVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGxldCBjb250ZW50ID0gYDxzcGFuIGNsYXNzPVwibGVnZW5kXCI+JHt0aGlzLmxlZ2VuZH08L3NwYW4+XG4gICAgICA8ZGl2IGNsYXNzPVwiaW5uZXItd3JhcHBlclwiPmA7XG5cbiAgICBjb250ZW50ICs9IHRoaXMubGFiZWxzLm1hcCgobGFiZWwpID0+IHtcbiAgICAgIHJldHVybiBgPGJ1dHRvbiBkYXRhLWxhYmVsPVwiJHtsYWJlbH1cIj4ke2xhYmVsfTwvYnV0dG9uPmA7XG4gICAgfSkuam9pbignJyk7XG5cbiAgICBjb250ZW50ICs9IGA8L2Rpdj5gO1xuXG4gICAgdGhpcy4kZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgIHRoaXMuJGVsLmNsYXNzTGlzdC5hZGQoc3R5bGVzLm5zLCAnYnV0dG9ucycpO1xuICAgIHRoaXMuJGVsLmlubmVySFRNTCA9IGNvbnRlbnQ7XG5cbiAgICB0aGlzLiRsZWdlbmQgPSB0aGlzLiRlbC5xdWVyeVNlbGVjdG9yKCcubGVnZW5kJyk7XG4gICAgdGhpcy4kYnV0dG9uc0NvbnRhaW5lciA9IHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoJy5idXR0b25zLWNvbnRhaW5lcicpO1xuICAgIHRoaXMuJGJ1dHRvbnMgPSBBcnJheS5mcm9tKHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3JBbGwoJ2J1dHRvbicpKTtcblxuICAgIHRoaXMuYWRkU3R5bGVzKCk7XG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XG5cbiAgICByZXR1cm4gdGhpcy4kZWw7XG4gIH1cblxuICBhZGRTdHlsZXMoKSB7XG4gICAgc3R5bGVzLmluc2VydFJ1bGVzKCcuYnV0dG9ucycsIHN0eWxlcy5jb250YWluZXJTdHlsZXMpO1xuICAgIHN0eWxlcy5pbnNlcnRSdWxlcygnLmJ1dHRvbnMgLmxlZ2VuZCcsIHN0eWxlcy5sZWdlbmRTdHlsZXMpO1xuICAgIHN0eWxlcy5pbnNlcnRSdWxlcygnLmJ1dHRvbnMgLmlubmVyLXdyYXBwZXInLCBzdHlsZXMuaW5uZXJXcmFwcGVyKTtcbiAgICBzdHlsZXMuaW5zZXJ0UnVsZXMoJy5idXR0b25zIGJ1dHRvbicsIHN0eWxlcy5idXR0b25TdHlsZXMpO1xuICAgIHN0eWxlcy5pbnNlcnRSdWxlcygnLmJ1dHRvbnMgYnV0dG9uLmFjdGl2ZScsIHN0eWxlcy5idXR0b25BY3RpdmVTdHlsZXMpO1xuICAgIC8vIHN0eWxlcy5pbnNlcnRSdWxlcygnLmJ1dHRvbnMgYnV0dG9uOmZvY3VzJywgc3R5bGVzLmJ1dHRvbkZvY3VzU3R5bGVzKTtcbiAgfVxuXG4gIGJpbmRFdmVudHMoKSB7XG4gICAgdGhpcy4kYnV0dG9ucy5mb3JFYWNoKChidXR0b24pID0+IHtcbiAgICAgIGNvbnN0IGxhYmVsID0gYnV0dG9uLmdldEF0dHJpYnV0ZSgnZGF0YS1sYWJlbCcpO1xuXG4gICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBidXR0b24uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICB9KTtcblxuICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICAgICAgdGhpcy5lbWl0KCdjaGFuZ2UnLCBsYWJlbCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEJ1dHRvbnM7XG4iXX0=