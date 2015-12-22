/**
 * Not exposed anymore, should be handled as a plugin or something.
 * waves-ui dependecies is too heavy for a use-case that is not proven
 */
'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var Timeline = require('waves-ui/dist/core/timeline');
var Layer = require('waves-ui/dist/core/layer');
var LayerTimeContext = require('waves-ui/dist/core/layer-time-context');
var Line = require('waves-ui/dist/shapes/line');
var Dot = require('waves-ui/dist/shapes/dot');
var BreakpointBehavior = require('waves-ui/dist/behaviors/breakpoint-behavior');
var BaseState = require('waves-ui/dist/states/base-state');
var BaseController = require('./base-controller');

// mimic max `function` interactions

var BreakpointState = (function (_BaseState) {
  _inherits(BreakpointState, _BaseState);

  function BreakpointState(timeline) {
    _classCallCheck(this, BreakpointState);

    _get(Object.getPrototypeOf(BreakpointState.prototype), 'constructor', this).call(this, timeline);

    this.currentEditedLayer = null;
    this.currentTarget = null;
  }

  // @TODO handle theme `BaseController.theme`

  _createClass(BreakpointState, [{
    key: 'enter',
    value: function enter() {}
  }, {
    key: 'exit',
    value: function exit() {}
  }, {
    key: 'handleEvent',
    value: function handleEvent(e) {
      switch (e.type) {
        case 'mousedown':
          this.onMouseDown(e);
          break;
        case 'mousemove':
          this.onMouseMove(e);
          break;
        case 'mouseup':
          this.onMouseUp(e);
          break;
      }
    }
  }, {
    key: 'onMouseDown',
    value: function onMouseDown(e) {
      var _this = this;

      this.mouseDown = true;
      // keep target consistent with mouse down
      this.currentTarget = e.target;

      this.layers.forEach(function (layer) {
        layer.unselect();
        var item = layer.getItemFromDOMElement(e.target);

        if (item === null) {
          // create an item
          var datum = [e.x / _this.timeline.visibleWidth, 1 - e.y / layer.params.height];

          layer.data.push(datum);

          _this.timeline.tracks.render();
          _this.timeline.tracks.update();
        } else {
          // if shift is pressed, remove the item
          if (e.originalEvent.shiftKey) {
            var data = layer.data;
            var datum = layer.getDatumFromItem(item);
            data.splice(data.indexOf(datum), 1);

            _this.timeline.tracks.render();
            _this.timeline.tracks.update();
          } else {
            _this.currentEditedLayer = layer;
            layer.select(item);
          }
        }
      });
    }
  }, {
    key: 'onMouseMove',
    value: function onMouseMove(e) {
      var _this2 = this;

      if (!this.mouseDown || !this.currentEditedLayer) {
        return;
      }

      var layer = this.currentEditedLayer;
      var items = layer.selectedItems;
      // the loop should be in layer to match select / unselect API
      items.forEach(function (item) {
        layer.edit(item, e.dx, e.dy, _this2.currentTarget);
      });

      layer.update(items);
    }
  }, {
    key: 'onMouseUp',
    value: function onMouseUp(e) {
      this.currentEditedLayer = null;
      this.mouseDown = false;
    }
  }]);

  return BreakpointState;
})(BaseState);

var Breakpoint = (function (_BaseController) {
  _inherits(Breakpoint, _BaseController);

  function Breakpoint(legend) {
    var defaultDots = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
    var $container = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
    var callback = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];

    _classCallCheck(this, Breakpoint);

    _get(Object.getPrototypeOf(Breakpoint.prototype), 'constructor', this).call(this);
    this.type = 'breakpoint';
    this.legend = legend;

    this.dots = defaultDots;

    _get(Object.getPrototypeOf(Breakpoint.prototype), '_applyOptionnalParameters', this).call(this, $container, callback);
  }

  _createClass(Breakpoint, [{
    key: 'render',
    value: function render() {
      var content = '\n      <span class="legend">' + this.legend + '</span>\n      <div class="inner-wrapper timeline"></div>\n    ';

      var height = 300;

      this.$el = _get(Object.getPrototypeOf(Breakpoint.prototype), 'render', this).call(this);
      this.$el.classList.add(this.type);
      this.$el.innerHTML = content;

      this.$track = this.$el.querySelector('.timeline');
      // create a timeline with a breakpoint function
      this.timeline = new Timeline();
      this.timeline.createTrack(this.$track, height, 'main');

      var breakpointTimeContext = new LayerTimeContext(this.timeline.timeContext);
      this.breakpointLayer = new Layer('collection', this.dots, { height: height });
      this.breakpointLayer.setTimeContext(breakpointTimeContext);

      var cxAccessor = function cxAccessor(d) {
        var v = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

        if (v !== null) {
          d[0] = v;
        }
        return d[0];
      };

      var cyAccessor = function cyAccessor(d) {
        var v = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

        if (v !== null) {
          d[1] = v;
        }
        return d[1];
      };

      this.breakpointLayer.configureShape(Dot, {
        color: function color(d) {
          return '#ffffff';
        },
        cx: cxAccessor,
        cy: cyAccessor
      });

      this.breakpointLayer.configureCommonShape(Line, {
        cx: cxAccessor,
        cy: cyAccessor
      }, {
        color: '#ffffff'
      });

      this.breakpointLayer.setBehavior(new BreakpointBehavior());

      // clamp dot x / y values
      this.breakpointLayer.on('edit', function (shape, datum) {
        datum[0] = Math.max(0, Math.min(datum[0], 1));
        datum[1] = Math.max(0, Math.min(datum[1], 1));
      });

      this.timeline.addLayer(this.breakpointLayer, 'main');

      this.timeline.tracks.render();
      this.timeline.tracks.update();

      this.timeline.state = new BreakpointState(this.timeline);

      this.bindEvents();

      return this.$el;
    }
  }, {
    key: 'onResize',
    value: function onResize() {
      _get(Object.getPrototypeOf(Breakpoint.prototype), 'onResize', this).call(this);

      var width = this.$track.getBoundingClientRect().width;
      this.timeline.visibleWidth = width;
      this.timeline.pixelsPerSecond = width;
      this.timeline.tracks.update();
    }
  }, {
    key: 'bindEvents',
    value: function bindEvents() {
      var _this3 = this;

      this.timeline.on('update', function () {
        _this3.emit('change', _this3.dots);
      });
    }
  }]);

  return Breakpoint;
})(BaseController);

module.exports = Breakpoint;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVzNi9jb21wb25lbnRzL2JyZWFrcG9pbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFJQSxJQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsNkJBQTZCLENBQUMsQ0FBQztBQUN4RCxJQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsMEJBQTBCLENBQUMsQ0FBQztBQUNsRCxJQUFNLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO0FBQzFFLElBQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO0FBQ2xELElBQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO0FBQ2hELElBQU0sa0JBQWtCLEdBQUcsT0FBTyxDQUFDLDZDQUE2QyxDQUFDLENBQUM7QUFDbEYsSUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7QUFDN0QsSUFBTSxjQUFjLEdBQUcsT0FBTyxDQUFDLG1CQUFtQixDQUFDLENBQUM7Ozs7SUFHOUMsZUFBZTtZQUFmLGVBQWU7O0FBQ1IsV0FEUCxlQUFlLENBQ1AsUUFBUSxFQUFFOzBCQURsQixlQUFlOztBQUVqQiwrQkFGRSxlQUFlLDZDQUVYLFFBQVEsRUFBRTs7QUFFaEIsUUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQztBQUMvQixRQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztHQUMzQjs7OztlQU5HLGVBQWU7O1dBUWQsaUJBQUcsRUFBRTs7O1dBQ04sZ0JBQUcsRUFBRTs7O1dBRUUscUJBQUMsQ0FBQyxFQUFFO0FBQ2IsY0FBUSxDQUFDLENBQUMsSUFBSTtBQUNaLGFBQUssV0FBVztBQUNkLGNBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDcEIsZ0JBQU07QUFBQSxBQUNSLGFBQUssV0FBVztBQUNkLGNBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDcEIsZ0JBQU07QUFB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b2ludC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogTm90IGV4cG9zZWQgYW55bW9yZSwgc2hvdWxkIGJlIGhhbmRsZWQgYXMgYSBwbHVnaW4gb3Igc29tZXRoaW5nLlxuICogd2F2ZXMtdWkgZGVwZW5kZWNpZXMgaXMgdG9vIGhlYXZ5IGZvciBhIHVzZS1jYXNlIHRoYXQgaXMgbm90IHByb3ZlblxuICovXG5jb25zdCBUaW1lbGluZSA9IHJlcXVpcmUoJ3dhdmVzLXVpL2Rpc3QvY29yZS90aW1lbGluZScpO1xuY29uc3QgTGF5ZXIgPSByZXF1aXJlKCd3YXZlcy11aS9kaXN0L2NvcmUvbGF5ZXInKTtcbmNvbnN0IExheWVyVGltZUNvbnRleHQgPSByZXF1aXJlKCd3YXZlcy11aS9kaXN0L2NvcmUvbGF5ZXItdGltZS1jb250ZXh0Jyk7XG5jb25zdCBMaW5lID0gcmVxdWlyZSgnd2F2ZXMtdWkvZGlzdC9zaGFwZXMvbGluZScpO1xuY29uc3QgRG90ID0gcmVxdWlyZSgnd2F2ZXMtdWkvZGlzdC9zaGFwZXMvZG90Jyk7XG5jb25zdCBCcmVha3BvaW50QmVoYXZpb3IgPSByZXF1aXJlKCd3YXZlcy11aS9kaXN0L2JlaGF2aW9ycy9icmVha3BvaW50LWJlaGF2aW9yJyk7XG5jb25zdCBCYXNlU3RhdGUgPSByZXF1aXJlKCd3YXZlcy11aS9kaXN0L3N0YXRlcy9iYXNlLXN0YXRlJyk7XG5jb25zdCBCYXNlQ29udHJvbGxlciA9IHJlcXVpcmUoJy4vYmFzZS1jb250cm9sbGVyJyk7XG5cbi8vIG1pbWljIG1heCBgZnVuY3Rpb25gIGludGVyYWN0aW9uc1xuY2xhc3MgQnJlYWtwb2ludFN0YXRlIGV4dGVuZHMgQmFzZVN0YXRlIHtcbiAgY29uc3RydWN0b3IodGltZWxpbmUpIHtcbiAgICBzdXBlcih0aW1lbGluZSk7XG5cbiAgICB0aGlzLmN1cnJlbnRFZGl0ZWRMYXllciA9IG51bGw7XG4gICAgdGhpcy5jdXJyZW50VGFyZ2V0ID0gbnVsbDtcbiAgfVxuXG4gIGVudGVyKCkge31cbiAgZXhpdCgpIHt9XG5cbiAgaGFuZGxlRXZlbnQoZSkge1xuICAgIHN3aXRjaCAoZS50eXBlKSB7XG4gICAgICBjYXNlICdtb3VzZWRvd24nOlxuICAgICAgICB0aGlzLm9uTW91c2VEb3duKGUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ21vdXNlbW92ZSc6XG4gICAgICAgIHRoaXMub25Nb3VzZU1vdmUoZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnbW91c2V1cCc6XG4gICAgICAgIHRoaXMub25Nb3VzZVVwKGUpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBvbk1vdXNlRG93bihlKSB7XG4gICAgdGhpcy5tb3VzZURvd24gPSB0cnVlO1xuICAgIC8vIGtlZXAgdGFyZ2V0IGNvbnNpc3RlbnQgd2l0aCBtb3VzZSBkb3duXG4gICAgdGhpcy5jdXJyZW50VGFyZ2V0ID0gZS50YXJnZXQ7XG5cbiAgICB0aGlzLmxheWVycy5mb3JFYWNoKChsYXllcikgPT4ge1xuICAgICAgbGF5ZXIudW5zZWxlY3QoKTtcbiAgICAgIGNvbnN0IGl0ZW0gPSBsYXllci5nZXRJdGVtRnJvbURPTUVsZW1lbnQoZS50YXJnZXQpO1xuXG4gICAgICBpZiAoaXRlbSA9PT0gbnVsbCkge1xuICAgICAgICAvLyBjcmVhdGUgYW4gaXRlbVxuICAgICAgICBjb25zdCBkYXR1bSA9IFtcbiAgICAgICAgICBlLnggLyB0aGlzLnRpbWVsaW5lLnZpc2libGVXaWR0aCxcbiAgICAgICAgICAxIC0gKGUueSAvIGxheWVyLnBhcmFtcy5oZWlnaHQpXG4gICAgICAgIF07XG5cbiAgICAgICAgbGF5ZXIuZGF0YS5wdXNoKGRhdHVtKTtcblxuICAgICAgICB0aGlzLnRpbWVsaW5lLnRyYWNrcy5yZW5kZXIoKTtcbiAgICAgICAgdGhpcy50aW1lbGluZS50cmFja3MudXBkYXRlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBpZiBzaGlmdCBpcyBwcmVzc2VkLCByZW1vdmUgdGhlIGl0ZW1cbiAgICAgICAgaWYgKGUub3JpZ2luYWxFdmVudC5zaGlmdEtleSkge1xuICAgICAgICAgIGNvbnN0IGRhdGEgPSBsYXllci5kYXRhO1xuICAgICAgICAgIGNvbnN0IGRhdHVtID0gbGF5ZXIuZ2V0RGF0dW1Gcm9tSXRlbShpdGVtKTtcbiAgICAgICAgICBkYXRhLnNwbGljZShkYXRhLmluZGV4T2YoZGF0dW0pLCAxKTtcblxuICAgICAgICAgIHRoaXMudGltZWxpbmUudHJhY2tzLnJlbmRlcigpO1xuICAgICAgICAgIHRoaXMudGltZWxpbmUudHJhY2tzLnVwZGF0ZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuY3VycmVudEVkaXRlZExheWVyID0gbGF5ZXI7XG4gICAgICAgICAgbGF5ZXIuc2VsZWN0KGl0ZW0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBvbk1vdXNlTW92ZShlKSB7XG4gICAgaWYgKCF0aGlzLm1vdXNlRG93biB8fMKgIXRoaXMuY3VycmVudEVkaXRlZExheWVyKSB7IHJldHVybjsgfVxuXG4gICAgY29uc3QgbGF5ZXIgPSB0aGlzLmN1cnJlbnRFZGl0ZWRMYXllcjtcbiAgICBjb25zdCBpdGVtcyA9IGxheWVyLnNlbGVjdGVkSXRlbXM7XG4gICAgLy8gdGhlIGxvb3Agc2hvdWxkIGJlIGluIGxheWVyIHRvIG1hdGNoIHNlbGVjdCAvIHVuc2VsZWN0IEFQSVxuICAgIGl0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGxheWVyLmVkaXQoaXRlbSwgZS5keCwgZS5keSwgdGhpcy5jdXJyZW50VGFyZ2V0KTtcbiAgICB9KTtcblxuICAgIGxheWVyLnVwZGF0ZShpdGVtcyk7XG4gIH1cblxuICBvbk1vdXNlVXAoZSkge1xuICAgIHRoaXMuY3VycmVudEVkaXRlZExheWVyID0gbnVsbDtcbiAgICB0aGlzLm1vdXNlRG93biA9IGZhbHNlO1xuICB9XG59XG5cbi8vIEBUT0RPIGhhbmRsZSB0aGVtZSBgQmFzZUNvbnRyb2xsZXIudGhlbWVgXG5jbGFzcyBCcmVha3BvaW50IGV4dGVuZHMgQmFzZUNvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3RvcihsZWdlbmQsIGRlZmF1bHREb3RzID0gW10sICRjb250YWluZXIgPSBudWxsLCBjYWxsYmFjayA9IG51bGwpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMudHlwZSA9ICdicmVha3BvaW50JztcbiAgICB0aGlzLmxlZ2VuZCA9IGxlZ2VuZDtcblxuICAgIHRoaXMuZG90cyA9IGRlZmF1bHREb3RzO1xuXG4gICAgc3VwZXIuX2FwcGx5T3B0aW9ubmFsUGFyYW1ldGVycygkY29udGFpbmVyLCBjYWxsYmFjayk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgbGV0IGNvbnRlbnQgPSBgXG4gICAgICA8c3BhbiBjbGFzcz1cImxlZ2VuZFwiPiR7dGhpcy5sZWdlbmR9PC9zcGFuPlxuICAgICAgPGRpdiBjbGFzcz1cImlubmVyLXdyYXBwZXIgdGltZWxpbmVcIj48L2Rpdj5cbiAgICBgO1xuXG4gICAgY29uc3QgaGVpZ2h0ID0gMzAwO1xuXG4gICAgdGhpcy4kZWwgPSBzdXBlci5yZW5kZXIoKTtcbiAgICB0aGlzLiRlbC5jbGFzc0xpc3QuYWRkKHRoaXMudHlwZSk7XG4gICAgdGhpcy4kZWwuaW5uZXJIVE1MID0gY29udGVudDtcblxuICAgIHRoaXMuJHRyYWNrID0gdGhpcy4kZWwucXVlcnlTZWxlY3RvcignLnRpbWVsaW5lJyk7XG4gICAgLy8gY3JlYXRlIGEgdGltZWxpbmUgd2l0aCBhIGJyZWFrcG9pbnQgZnVuY3Rpb25cbiAgICB0aGlzLnRpbWVsaW5lID0gbmV3IFRpbWVsaW5lKCk7XG4gICAgdGhpcy50aW1lbGluZS5jcmVhdGVUcmFjayh0aGlzLiR0cmFjaywgaGVpZ2h0LCAnbWFpbicpO1xuXG4gICAgY29uc3QgYnJlYWtwb2ludFRpbWVDb250ZXh0ID0gbmV3IExheWVyVGltZUNvbnRleHQodGhpcy50aW1lbGluZS50aW1lQ29udGV4dCk7XG4gICAgdGhpcy5icmVha3BvaW50TGF5ZXIgPSBuZXcgTGF5ZXIoJ2NvbGxlY3Rpb24nLCB0aGlzLmRvdHMsIHsgaGVpZ2h0OiBoZWlnaHQgfSk7XG4gICAgdGhpcy5icmVha3BvaW50TGF5ZXIuc2V0VGltZUNvbnRleHQoYnJlYWtwb2ludFRpbWVDb250ZXh0KTtcblxuICAgIGNvbnN0IGN4QWNjZXNzb3IgPSAoZCwgdiA9IG51bGwpID0+IHtcbiAgICAgIGlmICh2ICE9PSBudWxsKSB7IGRbMF0gPSB2OyB9XG4gICAgICByZXR1cm4gZFswXTtcbiAgICB9O1xuXG4gICAgY29uc3QgY3lBY2Nlc3NvciA9IChkLCB2ID0gbnVsbCkgPT4ge1xuICAgICAgaWYgKHYgIT09IG51bGwpIHsgZFsxXSA9IHY7IH1cbiAgICAgIHJldHVybiBkWzFdO1xuICAgIH07XG5cbiAgICB0aGlzLmJyZWFrcG9pbnRMYXllci5jb25maWd1cmVTaGFwZShEb3QsIHtcbiAgICAgIGNvbG9yOiAoZCkgPT4gJyNmZmZmZmYnLFxuICAgICAgY3g6IGN4QWNjZXNzb3IsXG4gICAgICBjeTogY3lBY2Nlc3NvclxuICAgIH0pO1xuXG4gICAgdGhpcy5icmVha3BvaW50TGF5ZXIuY29uZmlndXJlQ29tbW9uU2hhcGUoTGluZSwge1xuICAgICAgY3g6IGN4QWNjZXNzb3IsXG4gICAgICBjeTogY3lBY2Nlc3NvclxuICAgIH0sIHtcbiAgICAgIGNvbG9yOiAnI2ZmZmZmZidcbiAgICB9KTtcblxuICAgIHRoaXMuYnJlYWtwb2ludExheWVyLnNldEJlaGF2aW9yKG5ldyBCcmVha3BvaW50QmVoYXZpb3IoKSk7XG5cbiAgICAvLyBjbGFtcCBkb3QgeCAvIHkgdmFsdWVzXG4gICAgdGhpcy5icmVha3BvaW50TGF5ZXIub24oJ2VkaXQnLCBmdW5jdGlvbihzaGFwZSwgZGF0dW0pIHtcbiAgICAgIGRhdHVtWzBdID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oZGF0dW1bMF0sIDEpKTtcbiAgICAgIGRhdHVtWzFdID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oZGF0dW1bMV0sIDEpKTtcbiAgICB9KTtcblxuICAgIHRoaXMudGltZWxpbmUuYWRkTGF5ZXIodGhpcy5icmVha3BvaW50TGF5ZXIsICdtYWluJyk7XG5cbiAgICB0aGlzLnRpbWVsaW5lLnRyYWNrcy5yZW5kZXIoKTtcbiAgICB0aGlzLnRpbWVsaW5lLnRyYWNrcy51cGRhdGUoKTtcblxuICAgIHRoaXMudGltZWxpbmUuc3RhdGUgPSBuZXcgQnJlYWtwb2ludFN0YXRlKHRoaXMudGltZWxpbmUpO1xuXG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XG5cbiAgICByZXR1cm4gdGhpcy4kZWw7XG4gIH1cblxuICBvblJlc2l6ZSgpIHtcbiAgICBzdXBlci5vblJlc2l6ZSgpO1xuXG4gICAgY29uc3Qgd2lkdGggPSB0aGlzLiR0cmFjay5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcbiAgICB0aGlzLnRpbWVsaW5lLnZpc2libGVXaWR0aCA9IHdpZHRoO1xuICAgIHRoaXMudGltZWxpbmUucGl4ZWxzUGVyU2Vjb25kID0gd2lkdGg7XG4gICAgdGhpcy50aW1lbGluZS50cmFja3MudXBkYXRlKCk7XG4gIH1cblxuICBiaW5kRXZlbnRzKCkge1xuICAgIHRoaXMudGltZWxpbmUub24oJ3VwZGF0ZScsICgpID0+IHsgdGhpcy5lbWl0KCdjaGFuZ2UnLCB0aGlzLmRvdHMpOyB9KTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEJyZWFrcG9pbnQ7XG4iXX0=