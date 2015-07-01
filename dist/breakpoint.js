'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _get = require('babel-runtime/helpers/get')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var Timeline = require('waves-ui/dist/core/timeline');
var Layer = require('waves-ui/dist/core/layer');
var TimeContext = require('waves-ui/dist/core/time-context');
var Line = require('waves-ui/dist/shapes/line');
var Dot = require('waves-ui/dist/shapes/dot');
var BreakpointBehavior = require('waves-ui/dist/behaviors/breakpoint-behavior');

var BaseState = require('waves-ui/dist/timeline-states/base-state');
var EditionState = require('waves-ui/dist/timeline-states/edition-state');

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
      // @NOTE: move this to Surface ?
      this.currentTarget = e.target;

      this.layers.forEach(function (layer) {
        layer.unselect(layer.items.nodes());
        var item = layer.hasItem(e.target);

        if (item === null) {
          // create an item
          var datum = [e.x / _this.timeline.width, 1 - e.y / layer.params.height];

          layer.data.push(datum);

          _this.timeline.draw();
          _this.timeline.update();
        } else {
          // if shift is pressed, remove the item
          if (e.originalEvent.shiftKey) {
            var data = layer.data;
            data.splice(data.indexOf(item.datum()), 1);

            _this.timeline.draw();
            _this.timeline.update();
          } else {
            _this.currentEditedLayer = layer;
            layer.select(item.node());
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
  function Breakpoint(legend) {
    var defaultDots = arguments[1] === undefined ? [] : arguments[1];
    var $container = arguments[2] === undefined ? null : arguments[2];
    var callback = arguments[3] === undefined ? null : arguments[3];

    _classCallCheck(this, Breakpoint);

    _get(Object.getPrototypeOf(Breakpoint.prototype), 'constructor', this).call(this);
    this.type = 'breakpoint';
    this.legend = legend;

    this.dots = defaultDots;
    // console.log(this.dots);

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
      this.timeline = new Timeline({ duration: 1 });
      this.timeline.registerContainer('main', this.$timeline, { height: 300 });

      var breakpointTimeContext = new TimeContext(this.timeline.timeContext);
      this.breakpointLayer = new Layer('collection', this.dots, { height: 300 });
      this.breakpointLayer.setTimeContext(breakpointTimeContext);

      this.breakpointLayer.configureShape(Dot, {
        color: function color(d) {
          return '#ffffff';
        },
        cx: function cx(d) {
          var v = arguments[1] === undefined ? null : arguments[1];

          if (v !== null) {
            d[0] = v;
          }
          return d[0];
        },
        cy: function cy(d) {
          var v = arguments[1] === undefined ? null : arguments[1];

          if (v !== null) {
            d[1] = v;
          }
          return d[1];
        }
      });

      this.breakpointLayer.configureCommonShape(Line, {
        cx: function cx(d) {
          var v = arguments[1] === undefined ? null : arguments[1];

          if (v !== null) {
            d[0] = v;
          }
          return d[0];
        },
        cy: function cy(d) {
          var v = arguments[1] === undefined ? null : arguments[1];

          if (v !== null) {
            d[1] = v;
          }
          return d[1];
        }
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

      this.timeline.render();
      this.timeline.draw();
      this.timeline.update();

      this.timeline.setState(new BreakpointState(this.timeline));

      console.log(this.dots);
      this.bindEvents();

      return this.$el;
    }
  }, {
    key: 'onResize',
    value: function onResize() {
      _get(Object.getPrototypeOf(Breakpoint.prototype), 'onResize', this).call(this);

      var width = this.$timeline.getBoundingClientRect().width;
      this.timeline.width = width;
      this.timeline.update();
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
//# sourceMappingURL=data:application/json;base64,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QUFDLE1BQU0sRUFBRSxDQUFDO0tBQ3hCOzs7V0FFUyxzQkFBRzs7O0FBQ1gsVUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLFlBQU07QUFBRSxlQUFLLElBQUksQ0FBQyxRQUFRLEVBQUUsT0FBSyxJQUFJLENBQUMsQ0FBQztPQUFFLENBQUMsQ0FBQztLQUN2RTs7O1NBeEZHLFVBQVU7R0FBUyxjQUFjOztBQTJGdkMsTUFBTSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUMiLCJmaWxlIjoiZXM2L2JyZWFrcG9pbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBUaW1lbGluZSA9IHJlcXVpcmUoJ3dhdmVzLXVpL2Rpc3QvY29yZS90aW1lbGluZScpO1xuY29uc3QgTGF5ZXIgPSByZXF1aXJlKCd3YXZlcy11aS9kaXN0L2NvcmUvbGF5ZXInKTtcbmNvbnN0IFRpbWVDb250ZXh0ID0gcmVxdWlyZSgnd2F2ZXMtdWkvZGlzdC9jb3JlL3RpbWUtY29udGV4dCcpO1xuY29uc3QgTGluZSA9IHJlcXVpcmUoJ3dhdmVzLXVpL2Rpc3Qvc2hhcGVzL2xpbmUnKTtcbmNvbnN0IERvdCA9IHJlcXVpcmUoJ3dhdmVzLXVpL2Rpc3Qvc2hhcGVzL2RvdCcpO1xuY29uc3QgQnJlYWtwb2ludEJlaGF2aW9yID0gcmVxdWlyZSgnd2F2ZXMtdWkvZGlzdC9iZWhhdmlvcnMvYnJlYWtwb2ludC1iZWhhdmlvcicpO1xuXG5jb25zdCBCYXNlU3RhdGUgPSByZXF1aXJlKCd3YXZlcy11aS9kaXN0L3RpbWVsaW5lLXN0YXRlcy9iYXNlLXN0YXRlJyk7XG5jb25zdCBFZGl0aW9uU3RhdGUgPSByZXF1aXJlKCd3YXZlcy11aS9kaXN0L3RpbWVsaW5lLXN0YXRlcy9lZGl0aW9uLXN0YXRlJyk7XG5cbmNvbnN0IEJhc2VDb250cm9sbGVyID0gcmVxdWlyZSgnLi9iYXNlLWNvbnRyb2xsZXInKTtcblxuLy8gbWltaWMgbWF4IGBmdW5jdGlvbmAgaW50ZXJhY3Rpb25zXG5jbGFzcyBCcmVha3BvaW50U3RhdGUgZXh0ZW5kcyBCYXNlU3RhdGUge1xuICBjb25zdHJ1Y3Rvcih0aW1lbGluZSkge1xuICAgIHN1cGVyKHRpbWVsaW5lKTtcblxuICAgIHRoaXMuY3VycmVudEVkaXRlZExheWVyID0gbnVsbDtcbiAgICB0aGlzLmN1cnJlbnRUYXJnZXQgPSBudWxsO1xuICB9XG5cbiAgZW50ZXIoKSB7fVxuICBleGl0KCkge31cblxuICBoYW5kbGVFdmVudChlKSB7XG4gICAgc3dpdGNoIChlLnR5cGUpIHtcbiAgICAgIGNhc2UgJ21vdXNlZG93bic6XG4gICAgICAgIHRoaXMub25Nb3VzZURvd24oZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnbW91c2Vtb3ZlJzpcbiAgICAgICAgdGhpcy5vbk1vdXNlTW92ZShlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdtb3VzZXVwJzpcbiAgICAgICAgdGhpcy5vbk1vdXNlVXAoZSk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIG9uTW91c2VEb3duKGUpIHtcbiAgICB0aGlzLm1vdXNlRG93biA9IHRydWU7XG4gICAgLy8ga2VlcCB0YXJnZXQgY29uc2lzdGVudCB3aXRoIG1vdXNlIGRvd25cbiAgICAvLyBATk9URTogbW92ZSB0aGlzIHRvIFN1cmZhY2UgP1xuICAgIHRoaXMuY3VycmVudFRhcmdldCA9IGUudGFyZ2V0O1xuXG4gICAgdGhpcy5sYXllcnMuZm9yRWFjaCgobGF5ZXIpID0+IHtcbiAgICAgIGxheWVyLnVuc2VsZWN0KGxheWVyLml0ZW1zLm5vZGVzKCkpO1xuICAgICAgY29uc3QgaXRlbSA9IGxheWVyLmhhc0l0ZW0oZS50YXJnZXQpO1xuXG4gICAgICBpZiAoaXRlbSA9PT0gbnVsbCkge1xuICAgICAgICAvLyBjcmVhdGUgYW4gaXRlbVxuICAgICAgICBjb25zdCBkYXR1bSA9IFtcbiAgICAgICAgICBlLnggLyB0aGlzLnRpbWVsaW5lLndpZHRoLFxuICAgICAgICAgIDEgLSAoZS55IC8gbGF5ZXIucGFyYW1zLmhlaWdodClcbiAgICAgICAgXTtcblxuICAgICAgICBsYXllci5kYXRhLnB1c2goZGF0dW0pO1xuXG4gICAgICAgIHRoaXMudGltZWxpbmUuZHJhdygpO1xuICAgICAgICB0aGlzLnRpbWVsaW5lLnVwZGF0ZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gaWYgc2hpZnQgaXMgcHJlc3NlZCwgcmVtb3ZlIHRoZSBpdGVtXG4gICAgICAgIGlmIChlLm9yaWdpbmFsRXZlbnQuc2hpZnRLZXkpIHtcbiAgICAgICAgICBjb25zdCBkYXRhID0gbGF5ZXIuZGF0YTtcbiAgICAgICAgICBkYXRhLnNwbGljZShkYXRhLmluZGV4T2YoaXRlbS5kYXR1bSgpKSwgMSk7XG5cbiAgICAgICAgICB0aGlzLnRpbWVsaW5lLmRyYXcoKTtcbiAgICAgICAgICB0aGlzLnRpbWVsaW5lLnVwZGF0ZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuY3VycmVudEVkaXRlZExheWVyID0gbGF5ZXI7XG4gICAgICAgICAgbGF5ZXIuc2VsZWN0KGl0ZW0ubm9kZSgpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgb25Nb3VzZU1vdmUoZSkge1xuICAgIGlmICghdGhpcy5tb3VzZURvd24gfHzCoCF0aGlzLmN1cnJlbnRFZGl0ZWRMYXllcikgeyByZXR1cm47IH1cblxuICAgIGNvbnN0IGxheWVyID0gdGhpcy5jdXJyZW50RWRpdGVkTGF5ZXI7XG4gICAgY29uc3QgaXRlbXMgPSBsYXllci5zZWxlY3RlZEl0ZW1zO1xuICAgIC8vIHRoZSBsb29wIHNob3VsZCBiZSBpbiBsYXllciB0byBtYXRjaCBzZWxlY3QgLyB1bnNlbGVjdCBBUElcbiAgICBpdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICBsYXllci5lZGl0KGl0ZW0sIGUuZHgsIGUuZHksIHRoaXMuY3VycmVudFRhcmdldCk7XG4gICAgfSk7XG5cbiAgICBsYXllci51cGRhdGUoaXRlbXMpO1xuICB9XG5cbiAgb25Nb3VzZVVwKGUpIHtcbiAgICB0aGlzLmN1cnJlbnRFZGl0ZWRMYXllciA9IG51bGw7XG4gICAgdGhpcy5tb3VzZURvd24gPSBmYWxzZTtcbiAgfVxufVxuXG5cbmNsYXNzIEJyZWFrcG9pbnQgZXh0ZW5kcyBCYXNlQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKGxlZ2VuZCwgZGVmYXVsdERvdHMgPSBbXSwgJGNvbnRhaW5lciA9IG51bGwsIGNhbGxiYWNrID0gbnVsbCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy50eXBlID0gJ2JyZWFrcG9pbnQnO1xuICAgIHRoaXMubGVnZW5kID0gbGVnZW5kO1xuXG4gICAgdGhpcy5kb3RzID0gZGVmYXVsdERvdHM7XG4gICAgLy8gY29uc29sZS5sb2codGhpcy5kb3RzKTtcblxuICAgIHN1cGVyLl9hcHBseU9wdGlvbm5hbFBhcmFtZXRlcnMoJGNvbnRhaW5lciwgY2FsbGJhY2spO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGxldCBjb250ZW50ID0gYFxuICAgICAgPHNwYW4gY2xhc3M9XCJsZWdlbmRcIj4ke3RoaXMubGVnZW5kfTwvc3Bhbj5cbiAgICAgIDxkaXYgY2xhc3M9XCJpbm5lci13cmFwcGVyIHRpbWVsaW5lXCI+PC9kaXY+XG4gICAgYDtcblxuICAgIHRoaXMuJGVsID0gc3VwZXIucmVuZGVyKCk7XG4gICAgdGhpcy4kZWwuY2xhc3NMaXN0LmFkZCh0aGlzLnR5cGUpO1xuICAgIHRoaXMuJGVsLmlubmVySFRNTCA9IGNvbnRlbnQ7XG5cbiAgICB0aGlzLiR0aW1lbGluZSA9IHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoJy50aW1lbGluZScpO1xuICAgIC8vIGNyZWF0ZSBhIHRpbWVsaW5lIHdpdGggYSBicmVha3BvaW50IGZ1bmN0aW9uXG4gICAgdGhpcy50aW1lbGluZSA9IG5ldyBUaW1lbGluZSh7IGR1cmF0aW9uOiAxIH0pO1xuICAgIHRoaXMudGltZWxpbmUucmVnaXN0ZXJDb250YWluZXIoJ21haW4nLCB0aGlzLiR0aW1lbGluZSwgeyBoZWlnaHQ6IDMwMCB9KTtcblxuICAgIGNvbnN0IGJyZWFrcG9pbnRUaW1lQ29udGV4dCA9IG5ldyBUaW1lQ29udGV4dCh0aGlzLnRpbWVsaW5lLnRpbWVDb250ZXh0KTtcbiAgICB0aGlzLmJyZWFrcG9pbnRMYXllciA9IG5ldyBMYXllcignY29sbGVjdGlvbicsIHRoaXMuZG90cywgeyBoZWlnaHQ6IDMwMCB9KTtcbiAgICB0aGlzLmJyZWFrcG9pbnRMYXllci5zZXRUaW1lQ29udGV4dChicmVha3BvaW50VGltZUNvbnRleHQpO1xuXG4gICAgdGhpcy5icmVha3BvaW50TGF5ZXIuY29uZmlndXJlU2hhcGUoRG90LCB7XG4gICAgICBjb2xvcjogKGQpID0+ICcjZmZmZmZmJyxcbiAgICAgIGN4OiAoZCwgdiA9IG51bGwpID0+IHtcbiAgICAgICAgaWYgKHYgIT09IG51bGwpIHsgZFswXSA9IHY7IH1cbiAgICAgICAgcmV0dXJuIGRbMF07XG4gICAgICB9LFxuICAgICAgY3k6IChkLCB2ID0gbnVsbCkgPT4ge1xuICAgICAgICBpZiAodiAhPT0gbnVsbCkgeyBkWzFdID0gdjsgfVxuICAgICAgICByZXR1cm4gZFsxXTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuYnJlYWtwb2ludExheWVyLmNvbmZpZ3VyZUNvbW1vblNoYXBlKExpbmUsIHtcbiAgICAgIGN4OiAoZCwgdiA9IG51bGwpID0+IHtcbiAgICAgICAgaWYgKHYgIT09IG51bGwpIHsgZFswXSA9IHY7IH1cbiAgICAgICAgcmV0dXJuIGRbMF07XG4gICAgICB9LFxuICAgICAgY3k6IChkLCB2ID0gbnVsbCkgPT4ge1xuICAgICAgICBpZiAodiAhPT0gbnVsbCkgeyBkWzFdID0gdjsgfVxuICAgICAgICByZXR1cm4gZFsxXTtcbiAgICAgIH1cbiAgICB9LCB7XG4gICAgICBjb2xvcjogJyNmZmZmZmYnXG4gICAgfSk7XG5cbiAgICB0aGlzLmJyZWFrcG9pbnRMYXllci5zZXRCZWhhdmlvcihuZXcgQnJlYWtwb2ludEJlaGF2aW9yKCkpO1xuXG4gICAgLy8gY2xhbXAgZG90IHggLyB5IHZhbHVlc1xuICAgIHRoaXMuYnJlYWtwb2ludExheWVyLm9uKCdlZGl0JywgZnVuY3Rpb24oc2hhcGUsIGRhdHVtKSB7XG4gICAgICBkYXR1bVswXSA9IE1hdGgubWF4KDAsIE1hdGgubWluKGRhdHVtWzBdLCAxKSk7XG4gICAgICBkYXR1bVsxXSA9IE1hdGgubWF4KDAsIE1hdGgubWluKGRhdHVtWzFdLCAxKSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLnRpbWVsaW5lLmFkZExheWVyKHRoaXMuYnJlYWtwb2ludExheWVyLCAnbWFpbicpO1xuXG4gICAgdGhpcy50aW1lbGluZS5yZW5kZXIoKTtcbiAgICB0aGlzLnRpbWVsaW5lLmRyYXcoKTtcbiAgICB0aGlzLnRpbWVsaW5lLnVwZGF0ZSgpO1xuXG4gICAgdGhpcy50aW1lbGluZS5zZXRTdGF0ZShuZXcgQnJlYWtwb2ludFN0YXRlKHRoaXMudGltZWxpbmUpKTtcblxuICAgIGNvbnNvbGUubG9nKHRoaXMuZG90cyk7XG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XG5cbiAgICByZXR1cm4gdGhpcy4kZWw7XG4gIH1cblxuICBvblJlc2l6ZSgpIHtcbiAgICBzdXBlci5vblJlc2l6ZSgpO1xuXG4gICAgY29uc3Qgd2lkdGggPSB0aGlzLiR0aW1lbGluZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcbiAgICB0aGlzLnRpbWVsaW5lLndpZHRoID0gd2lkdGg7XG4gICAgdGhpcy50aW1lbGluZS51cGRhdGUoKTtcbiAgfVxuXG4gIGJpbmRFdmVudHMoKSB7XG4gICAgdGhpcy50aW1lbGluZS5vbigndXBkYXRlJywgKCkgPT4geyB0aGlzLmVtaXQoJ2NoYW5nZScsIHRoaXMuZG90cyk7IH0pO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQnJlYWtwb2ludDtcbiJdfQ==