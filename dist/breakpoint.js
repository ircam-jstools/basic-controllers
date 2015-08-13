'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _get = require('babel-runtime/helpers/get')['default'];

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
  function BreakpointState(timeline) {
    _classCallCheck(this, BreakpointState);

    _get(Object.getPrototypeOf(BreakpointState.prototype), 'constructor', this).call(this, timeline);

    this.currentEditedLayer = null;
    this.currentTarget = null;
  }

  _inherits(BreakpointState, _BaseState);

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

// @TODO handle theme `BaseController.theme`

var Breakpoint = (function (_BaseController) {
  function Breakpoint(legend) {
    var defaultDots = arguments[1] === undefined ? [] : arguments[1];
    var $container = arguments[2] === undefined ? null : arguments[2];
    var callback = arguments[3] === undefined ? null : arguments[3];

    _classCallCheck(this, Breakpoint);

    _get(Object.getPrototypeOf(Breakpoint.prototype), 'constructor', this).call(this);
    this.type = 'breakpoint';
    this.legend = legend;

    this.dots = defaultDots;

    _get(Object.getPrototypeOf(Breakpoint.prototype), '_applyOptionnalParameters', this).call(this, $container, callback);
  }

  _inherits(Breakpoint, _BaseController);

  _createClass(Breakpoint, [{
    key: 'render',
    value: function render() {
      var content = '\n      <span class="legend">' + this.legend + '</span>\n      <div class="inner-wrapper timeline"></div>\n    ';

      this.$el = _get(Object.getPrototypeOf(Breakpoint.prototype), 'render', this).call(this);
      this.$el.classList.add(this.type);
      this.$el.innerHTML = content;

      this.$timeline = this.$el.querySelector('.timeline');
      // create a timeline with a breakpoint function
      this.timeline = new Timeline();
      var track = this.timeline.createTrack(this.$timeline, 300, 'main');

      var breakpointTimeContext = new LayerTimeContext(this.timeline.timeContext);
      this.breakpointLayer = new Layer('collection', this.dots, { height: 300 });
      this.breakpointLayer.setTimeContext(breakpointTimeContext);

      var cxAccessor = function cxAccessor(d) {
        var v = arguments[1] === undefined ? null : arguments[1];

        if (v !== null) {
          d[0] = v;
        }
        return d[0];
      };

      var cyAccessor = function cyAccessor(d) {
        var v = arguments[1] === undefined ? null : arguments[1];

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

      var width = this.$timeline.getBoundingClientRect().width;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVzNi9icmVha3BvaW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxJQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsNkJBQTZCLENBQUMsQ0FBQztBQUN4RCxJQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsMEJBQTBCLENBQUMsQ0FBQztBQUNsRCxJQUFNLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO0FBQzFFLElBQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO0FBQ2xELElBQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO0FBQ2hELElBQU0sa0JBQWtCLEdBQUcsT0FBTyxDQUFDLDZDQUE2QyxDQUFDLENBQUM7QUFDbEYsSUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7O0FBRTdELElBQU0sY0FBYyxHQUFHLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDOzs7O0lBRzlDLGVBQWU7QUFDUixXQURQLGVBQWUsQ0FDUCxRQUFRLEVBQUU7MEJBRGxCLGVBQWU7O0FBRWpCLCtCQUZFLGVBQWUsNkNBRVgsUUFBUSxFQUFFOztBQUVoQixRQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDO0FBQy9CLFFBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO0dBQzNCOztZQU5HLGVBQWU7O2VBQWYsZUFBZTs7V0FRZCxpQkFBRyxFQUFFOzs7V0FDTixnQkFBRyxFQUFFOzs7V0FFRSxxQkFBQyxDQUFDLEVBQUU7QUFDYixjQUFRLENBQUMsQ0FBQyxJQUFJO0FBQ1osYUFBSyxXQUFXO0FBQ2QsY0FBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNwQixnQkFBTTtBQUFBLEFBQ1IsYUFBSyxXQUFXO0FBQ2QsY0FBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNwQixnQkFBTTtBQUFBLEFBQ1IsYUFBSyxTQUFTO0FBQ1osY0FBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNsQixnQkFBTTtBQUFBLE9BQ1Q7S0FDRjs7O1dBRVUscUJBQUMsQ0FBQyxFQUFFOzs7QUFDYixVQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQzs7QUFFdEIsVUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDOztBQUU5QixVQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFDLEtBQUssRUFBSztBQUM3QixhQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7QUFDakIsWUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQzs7QUFFbkQsWUFBSSxJQUFJLEtBQUssSUFBSSxFQUFFOztBQUVqQixjQUFNLEtBQUssR0FBRyxDQUNaLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBSyxRQUFRLENBQUMsWUFBWSxFQUNoQyxDQUFDLEdBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQUFBQyxDQUNoQyxDQUFDOztBQUVGLGVBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOztBQUV2QixnQkFBSyxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQzlCLGdCQUFLLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDL0IsTUFBTTs7QUFFTCxjQUFJLENBQUMsQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFO0FBQzVCLGdCQUFNLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDO0FBQ3hCLGdCQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDM0MsZ0JBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzs7QUFFcEMsa0JBQUssUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUM5QixrQkFBSyxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO1dBQy9CLE1BQU07QUFDTCxrQkFBSyxrQkFBa0IsR0FBRyxLQUFLLENBQUM7QUFDaEMsaUJBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7V0FDcEI7U0FDRjtPQUNGLENBQUMsQ0FBQztLQUNKOzs7V0FFVSxxQkFBQyxDQUFDLEVBQUU7OztBQUNiLFVBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFO0FBQUUsZUFBTztPQUFFOztBQUU1RCxVQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUM7QUFDdEMsVUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLGFBQWEsQ0FBQzs7QUFFbEMsV0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQUksRUFBSztBQUN0QixhQUFLLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsT0FBSyxhQUFhLENBQUMsQ0FBQztPQUNsRCxDQUFDLENBQUM7O0FBRUgsV0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUNyQjs7O1dBRVEsbUJBQUMsQ0FBQyxFQUFFO0FBQ1gsVUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQztBQUMvQixVQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztLQUN4Qjs7O1NBOUVHLGVBQWU7R0FBUyxTQUFTOzs7O0lBa0ZqQyxVQUFVO0FBQ0gsV0FEUCxVQUFVLENBQ0YsTUFBTSxFQUF3RDtRQUF0RCxXQUFXLGdDQUFHLEVBQUU7UUFBRSxVQUFVLGdDQUFHLElBQUk7UUFBRSxRQUFRLGdDQUFHLElBQUk7OzBCQURwRSxVQUFVOztBQUVaLCtCQUZFLFVBQVUsNkNBRUo7QUFDUixRQUFJLENBQUMsSUFBSSxHQUFHLFlBQVksQ0FBQztBQUN6QixRQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQzs7QUFFckIsUUFBSSxDQUFDLElBQUksR0FBRyxXQUFXLENBQUM7O0FBRXhCLCtCQVJFLFVBQVUsMkRBUW9CLFVBQVUsRUFBRSxRQUFRLEVBQUU7R0FDdkQ7O1lBVEcsVUFBVTs7ZUFBVixVQUFVOztXQVdSLGtCQUFHO0FBQ1AsVUFBSSxPQUFPLHFDQUNjLElBQUksQ0FBQyxNQUFNLG9FQUVuQyxDQUFDOztBQUVGLFVBQUksQ0FBQyxHQUFHLDhCQWpCTixVQUFVLHVDQWlCYSxDQUFDO0FBQzFCLFVBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDbEMsVUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDOztBQUU3QixVQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDOztBQUVyRCxVQUFJLENBQUMsUUFBUSxHQUFHLElBQUksUUFBUSxFQUFFLENBQUM7QUFDL0IsVUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7O0FBRXJFLFVBQU0scUJBQXFCLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQzlFLFVBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxLQUFLLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztBQUMzRSxVQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDOztBQUUzRCxVQUFNLFVBQVUsR0FBRyxTQUFiLFVBQVUsQ0FBSSxDQUFDLEVBQWU7WUFBYixDQUFDLGdDQUFHLElBQUk7O0FBQzdCLFlBQUksQ0FBQyxLQUFLLElBQUksRUFBRTtBQUFFLFdBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7U0FBRTtBQUM3QixlQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztPQUNiLENBQUM7O0FBRUYsVUFBTSxVQUFVLEdBQUcsU0FBYixVQUFVLENBQUksQ0FBQyxFQUFlO1lBQWIsQ0FBQyxnQ0FBRyxJQUFJOztBQUM3QixZQUFJLENBQUMsS0FBSyxJQUFJLEVBQUU7QUFBRSxXQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQUU7QUFDN0IsZUFBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7T0FDYixDQUFDOztBQUVGLFVBQUksQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRTtBQUN2QyxhQUFLLEVBQUUsZUFBQyxDQUFDO2lCQUFLLFNBQVM7U0FBQTtBQUN2QixVQUFFLEVBQUUsVUFBVTtBQUNkLFVBQUUsRUFBRSxVQUFVO09BQ2YsQ0FBQyxDQUFDOztBQUVILFVBQUksQ0FBQyxlQUFlLENBQUMsb0JBQW9CLENBQUMsSUFBSSxFQUFFO0FBQzlDLFVBQUUsRUFBRSxVQUFVO0FBQ2QsVUFBRSxFQUFFLFVBQVU7T0FDZixFQUFFO0FBQ0QsYUFBSyxFQUFFLFNBQVM7T0FDakIsQ0FBQyxDQUFDOztBQUVILFVBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLElBQUksa0JBQWtCLEVBQUUsQ0FBQyxDQUFDOzs7QUFHM0QsVUFBSSxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLFVBQVMsS0FBSyxFQUFFLEtBQUssRUFBRTtBQUNyRCxhQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM5QyxhQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztPQUMvQyxDQUFDLENBQUM7O0FBRUgsVUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxNQUFNLENBQUMsQ0FBQzs7QUFFckQsVUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDOUIsVUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7O0FBRTlCLFVBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxHQUFHLElBQUksZUFBZSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzs7QUFFekQsVUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDOztBQUVsQixhQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7S0FDakI7OztXQUVPLG9CQUFHO0FBQ1QsaUNBMUVFLFVBQVUsMENBMEVLOztBQUVqQixVQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLHFCQUFxQixFQUFFLENBQUMsS0FBSyxDQUFDO0FBQzNELFVBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztBQUNuQyxVQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7QUFDdEMsVUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7S0FDL0I7OztXQUVTLHNCQUFHOzs7QUFDWCxVQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsWUFBTTtBQUFFLGVBQUssSUFBSSxDQUFDLFFBQVEsRUFBRSxPQUFLLElBQUksQ0FBQyxDQUFDO09BQUUsQ0FBQyxDQUFDO0tBQ3ZFOzs7U0FwRkcsVUFBVTtHQUFTLGNBQWM7O0FBdUZ2QyxNQUFNLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQyIsImZpbGUiOiJlczYvYnJlYWtwb2ludC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IFRpbWVsaW5lID0gcmVxdWlyZSgnd2F2ZXMtdWkvZGlzdC9jb3JlL3RpbWVsaW5lJyk7XG5jb25zdCBMYXllciA9IHJlcXVpcmUoJ3dhdmVzLXVpL2Rpc3QvY29yZS9sYXllcicpO1xuY29uc3QgTGF5ZXJUaW1lQ29udGV4dCA9IHJlcXVpcmUoJ3dhdmVzLXVpL2Rpc3QvY29yZS9sYXllci10aW1lLWNvbnRleHQnKTtcbmNvbnN0IExpbmUgPSByZXF1aXJlKCd3YXZlcy11aS9kaXN0L3NoYXBlcy9saW5lJyk7XG5jb25zdCBEb3QgPSByZXF1aXJlKCd3YXZlcy11aS9kaXN0L3NoYXBlcy9kb3QnKTtcbmNvbnN0IEJyZWFrcG9pbnRCZWhhdmlvciA9IHJlcXVpcmUoJ3dhdmVzLXVpL2Rpc3QvYmVoYXZpb3JzL2JyZWFrcG9pbnQtYmVoYXZpb3InKTtcbmNvbnN0IEJhc2VTdGF0ZSA9IHJlcXVpcmUoJ3dhdmVzLXVpL2Rpc3Qvc3RhdGVzL2Jhc2Utc3RhdGUnKTtcblxuY29uc3QgQmFzZUNvbnRyb2xsZXIgPSByZXF1aXJlKCcuL2Jhc2UtY29udHJvbGxlcicpO1xuXG4vLyBtaW1pYyBtYXggYGZ1bmN0aW9uYCBpbnRlcmFjdGlvbnNcbmNsYXNzIEJyZWFrcG9pbnRTdGF0ZSBleHRlbmRzIEJhc2VTdGF0ZSB7XG4gIGNvbnN0cnVjdG9yKHRpbWVsaW5lKSB7XG4gICAgc3VwZXIodGltZWxpbmUpO1xuXG4gICAgdGhpcy5jdXJyZW50RWRpdGVkTGF5ZXIgPSBudWxsO1xuICAgIHRoaXMuY3VycmVudFRhcmdldCA9IG51bGw7XG4gIH1cblxuICBlbnRlcigpIHt9XG4gIGV4aXQoKSB7fVxuXG4gIGhhbmRsZUV2ZW50KGUpIHtcbiAgICBzd2l0Y2ggKGUudHlwZSkge1xuICAgICAgY2FzZSAnbW91c2Vkb3duJzpcbiAgICAgICAgdGhpcy5vbk1vdXNlRG93bihlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdtb3VzZW1vdmUnOlxuICAgICAgICB0aGlzLm9uTW91c2VNb3ZlKGUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ21vdXNldXAnOlxuICAgICAgICB0aGlzLm9uTW91c2VVcChlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgb25Nb3VzZURvd24oZSkge1xuICAgIHRoaXMubW91c2VEb3duID0gdHJ1ZTtcbiAgICAvLyBrZWVwIHRhcmdldCBjb25zaXN0ZW50IHdpdGggbW91c2UgZG93blxuICAgIHRoaXMuY3VycmVudFRhcmdldCA9IGUudGFyZ2V0O1xuXG4gICAgdGhpcy5sYXllcnMuZm9yRWFjaCgobGF5ZXIpID0+IHtcbiAgICAgIGxheWVyLnVuc2VsZWN0KCk7XG4gICAgICBjb25zdCBpdGVtID0gbGF5ZXIuZ2V0SXRlbUZyb21ET01FbGVtZW50KGUudGFyZ2V0KTtcblxuICAgICAgaWYgKGl0ZW0gPT09IG51bGwpIHtcbiAgICAgICAgLy8gY3JlYXRlIGFuIGl0ZW1cbiAgICAgICAgY29uc3QgZGF0dW0gPSBbXG4gICAgICAgICAgZS54IC8gdGhpcy50aW1lbGluZS52aXNpYmxlV2lkdGgsXG4gICAgICAgICAgMSAtIChlLnkgLyBsYXllci5wYXJhbXMuaGVpZ2h0KVxuICAgICAgICBdO1xuXG4gICAgICAgIGxheWVyLmRhdGEucHVzaChkYXR1bSk7XG5cbiAgICAgICAgdGhpcy50aW1lbGluZS50cmFja3MucmVuZGVyKCk7XG4gICAgICAgIHRoaXMudGltZWxpbmUudHJhY2tzLnVwZGF0ZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gaWYgc2hpZnQgaXMgcHJlc3NlZCwgcmVtb3ZlIHRoZSBpdGVtXG4gICAgICAgIGlmIChlLm9yaWdpbmFsRXZlbnQuc2hpZnRLZXkpIHtcbiAgICAgICAgICBjb25zdCBkYXRhID0gbGF5ZXIuZGF0YTtcbiAgICAgICAgICBjb25zdCBkYXR1bSA9IGxheWVyLmdldERhdHVtRnJvbUl0ZW0oaXRlbSk7XG4gICAgICAgICAgZGF0YS5zcGxpY2UoZGF0YS5pbmRleE9mKGRhdHVtKSwgMSk7XG5cbiAgICAgICAgICB0aGlzLnRpbWVsaW5lLnRyYWNrcy5yZW5kZXIoKTtcbiAgICAgICAgICB0aGlzLnRpbWVsaW5lLnRyYWNrcy51cGRhdGUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmN1cnJlbnRFZGl0ZWRMYXllciA9IGxheWVyO1xuICAgICAgICAgIGxheWVyLnNlbGVjdChpdGVtKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgb25Nb3VzZU1vdmUoZSkge1xuICAgIGlmICghdGhpcy5tb3VzZURvd24gfHzCoCF0aGlzLmN1cnJlbnRFZGl0ZWRMYXllcikgeyByZXR1cm47IH1cblxuICAgIGNvbnN0IGxheWVyID0gdGhpcy5jdXJyZW50RWRpdGVkTGF5ZXI7XG4gICAgY29uc3QgaXRlbXMgPSBsYXllci5zZWxlY3RlZEl0ZW1zO1xuICAgIC8vIHRoZSBsb29wIHNob3VsZCBiZSBpbiBsYXllciB0byBtYXRjaCBzZWxlY3QgLyB1bnNlbGVjdCBBUElcbiAgICBpdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICBsYXllci5lZGl0KGl0ZW0sIGUuZHgsIGUuZHksIHRoaXMuY3VycmVudFRhcmdldCk7XG4gICAgfSk7XG5cbiAgICBsYXllci51cGRhdGUoaXRlbXMpO1xuICB9XG5cbiAgb25Nb3VzZVVwKGUpIHtcbiAgICB0aGlzLmN1cnJlbnRFZGl0ZWRMYXllciA9IG51bGw7XG4gICAgdGhpcy5tb3VzZURvd24gPSBmYWxzZTtcbiAgfVxufVxuXG4vLyBAVE9ETyBoYW5kbGUgdGhlbWUgYEJhc2VDb250cm9sbGVyLnRoZW1lYFxuY2xhc3MgQnJlYWtwb2ludCBleHRlbmRzIEJhc2VDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IobGVnZW5kLCBkZWZhdWx0RG90cyA9IFtdLCAkY29udGFpbmVyID0gbnVsbCwgY2FsbGJhY2sgPSBudWxsKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnR5cGUgPSAnYnJlYWtwb2ludCc7XG4gICAgdGhpcy5sZWdlbmQgPSBsZWdlbmQ7XG5cbiAgICB0aGlzLmRvdHMgPSBkZWZhdWx0RG90cztcblxuICAgIHN1cGVyLl9hcHBseU9wdGlvbm5hbFBhcmFtZXRlcnMoJGNvbnRhaW5lciwgY2FsbGJhY2spO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGxldCBjb250ZW50ID0gYFxuICAgICAgPHNwYW4gY2xhc3M9XCJsZWdlbmRcIj4ke3RoaXMubGVnZW5kfTwvc3Bhbj5cbiAgICAgIDxkaXYgY2xhc3M9XCJpbm5lci13cmFwcGVyIHRpbWVsaW5lXCI+PC9kaXY+XG4gICAgYDtcblxuICAgIHRoaXMuJGVsID0gc3VwZXIucmVuZGVyKCk7XG4gICAgdGhpcy4kZWwuY2xhc3NMaXN0LmFkZCh0aGlzLnR5cGUpO1xuICAgIHRoaXMuJGVsLmlubmVySFRNTCA9IGNvbnRlbnQ7XG5cbiAgICB0aGlzLiR0aW1lbGluZSA9IHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoJy50aW1lbGluZScpO1xuICAgIC8vIGNyZWF0ZSBhIHRpbWVsaW5lIHdpdGggYSBicmVha3BvaW50IGZ1bmN0aW9uXG4gICAgdGhpcy50aW1lbGluZSA9IG5ldyBUaW1lbGluZSgpO1xuICAgIGNvbnN0IHRyYWNrID0gdGhpcy50aW1lbGluZS5jcmVhdGVUcmFjayh0aGlzLiR0aW1lbGluZSwgMzAwLCAnbWFpbicpO1xuXG4gICAgY29uc3QgYnJlYWtwb2ludFRpbWVDb250ZXh0ID0gbmV3IExheWVyVGltZUNvbnRleHQodGhpcy50aW1lbGluZS50aW1lQ29udGV4dCk7XG4gICAgdGhpcy5icmVha3BvaW50TGF5ZXIgPSBuZXcgTGF5ZXIoJ2NvbGxlY3Rpb24nLCB0aGlzLmRvdHMsIHsgaGVpZ2h0OiAzMDAgfSk7XG4gICAgdGhpcy5icmVha3BvaW50TGF5ZXIuc2V0VGltZUNvbnRleHQoYnJlYWtwb2ludFRpbWVDb250ZXh0KTtcblxuICAgIGNvbnN0IGN4QWNjZXNzb3IgPSAoZCwgdiA9IG51bGwpID0+IHtcbiAgICAgIGlmICh2ICE9PSBudWxsKSB7IGRbMF0gPSB2OyB9XG4gICAgICByZXR1cm4gZFswXTtcbiAgICB9O1xuXG4gICAgY29uc3QgY3lBY2Nlc3NvciA9IChkLCB2ID0gbnVsbCkgPT4ge1xuICAgICAgaWYgKHYgIT09IG51bGwpIHsgZFsxXSA9IHY7IH1cbiAgICAgIHJldHVybiBkWzFdO1xuICAgIH07XG5cbiAgICB0aGlzLmJyZWFrcG9pbnRMYXllci5jb25maWd1cmVTaGFwZShEb3QsIHtcbiAgICAgIGNvbG9yOiAoZCkgPT4gJyNmZmZmZmYnLFxuICAgICAgY3g6IGN4QWNjZXNzb3IsXG4gICAgICBjeTogY3lBY2Nlc3NvclxuICAgIH0pO1xuXG4gICAgdGhpcy5icmVha3BvaW50TGF5ZXIuY29uZmlndXJlQ29tbW9uU2hhcGUoTGluZSwge1xuICAgICAgY3g6IGN4QWNjZXNzb3IsXG4gICAgICBjeTogY3lBY2Nlc3NvclxuICAgIH0sIHtcbiAgICAgIGNvbG9yOiAnI2ZmZmZmZidcbiAgICB9KTtcblxuICAgIHRoaXMuYnJlYWtwb2ludExheWVyLnNldEJlaGF2aW9yKG5ldyBCcmVha3BvaW50QmVoYXZpb3IoKSk7XG5cbiAgICAvLyBjbGFtcCBkb3QgeCAvIHkgdmFsdWVzXG4gICAgdGhpcy5icmVha3BvaW50TGF5ZXIub24oJ2VkaXQnLCBmdW5jdGlvbihzaGFwZSwgZGF0dW0pIHtcbiAgICAgIGRhdHVtWzBdID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oZGF0dW1bMF0sIDEpKTtcbiAgICAgIGRhdHVtWzFdID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oZGF0dW1bMV0sIDEpKTtcbiAgICB9KTtcblxuICAgIHRoaXMudGltZWxpbmUuYWRkTGF5ZXIodGhpcy5icmVha3BvaW50TGF5ZXIsICdtYWluJyk7XG5cbiAgICB0aGlzLnRpbWVsaW5lLnRyYWNrcy5yZW5kZXIoKTtcbiAgICB0aGlzLnRpbWVsaW5lLnRyYWNrcy51cGRhdGUoKTtcblxuICAgIHRoaXMudGltZWxpbmUuc3RhdGUgPSBuZXcgQnJlYWtwb2ludFN0YXRlKHRoaXMudGltZWxpbmUpO1xuXG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XG5cbiAgICByZXR1cm4gdGhpcy4kZWw7XG4gIH1cblxuICBvblJlc2l6ZSgpIHtcbiAgICBzdXBlci5vblJlc2l6ZSgpO1xuXG4gICAgY29uc3Qgd2lkdGggPSB0aGlzLiR0aW1lbGluZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcbiAgICB0aGlzLnRpbWVsaW5lLnZpc2libGVXaWR0aCA9IHdpZHRoO1xuICAgIHRoaXMudGltZWxpbmUucGl4ZWxzUGVyU2Vjb25kID0gd2lkdGg7XG4gICAgdGhpcy50aW1lbGluZS50cmFja3MudXBkYXRlKCk7XG4gIH1cblxuICBiaW5kRXZlbnRzKCkge1xuICAgIHRoaXMudGltZWxpbmUub24oJ3VwZGF0ZScsICgpID0+IHsgdGhpcy5lbWl0KCdjaGFuZ2UnLCB0aGlzLmRvdHMpOyB9KTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEJyZWFrcG9pbnQ7XG4iXX0=