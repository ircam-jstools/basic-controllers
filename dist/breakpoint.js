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
var BaseState = require('waves-ui/dist/timeline-states/base-state');

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
          var datum = [e.x / _this.timeline.containersWidth, 1 - e.y / layer.params.height];

          layer.data.push(datum);

          _this.timeline.draw();
          _this.timeline.update();
        } else {
          // if shift is pressed, remove the item
          if (e.originalEvent.shiftKey) {
            var data = layer.data;
            var datum = layer.getDatumFromItem(item);
            data.splice(data.indexOf(datum), 1);

            _this.timeline.draw();
            _this.timeline.update();
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
      this.timeline = new Timeline();
      this.timeline.registerContainer('main', this.$timeline, { height: 300 });

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

      this.timeline.render();
      this.timeline.draw();
      this.timeline.update();

      this.timeline.setState(new BreakpointState(this.timeline));

      this.bindEvents();

      return this.$el;
    }
  }, {
    key: 'onResize',
    value: function onResize() {
      _get(Object.getPrototypeOf(Breakpoint.prototype), 'onResize', this).call(this);

      var width = this.$timeline.getBoundingClientRect().width;
      this.timeline.setContainersWidth(width);
      this.timeline.pixelsPerSecond = width;
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
//# sourceMappingURL=data:application/json;base64,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QUMsQ0FBQyxDQUFDLENBQUM7T0FDL0MsQ0FBQyxDQUFDOztBQUVILFVBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsTUFBTSxDQUFDLENBQUM7O0FBRXJELFVBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDdkIsVUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUNyQixVQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDOztBQUV2QixVQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLGVBQWUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzs7QUFFM0QsVUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDOztBQUVsQixhQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7S0FDakI7OztXQUVPLG9CQUFHO0FBQ1QsaUNBNUVFLFVBQVUsMENBNEVLOztBQUVqQixVQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLHFCQUFxQixFQUFFLENBQUMsS0FBSyxDQUFDO0FBQzNELFVBQUksQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDeEMsVUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO0FBQ3RDLFVBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7S0FDeEI7OztXQUVTLHNCQUFHOzs7QUFDWCxVQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsWUFBTTtBQUFFLGVBQUssSUFBSSxDQUFDLFFBQVEsRUFBRSxPQUFLLElBQUksQ0FBQyxDQUFDO09BQUUsQ0FBQyxDQUFDO0tBQ3ZFOzs7U0F0RkcsVUFBVTtHQUFTLGNBQWM7O0FBeUZ2QyxNQUFNLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQyIsImZpbGUiOiJlczYvYnJlYWtwb2ludC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IFRpbWVsaW5lID0gcmVxdWlyZSgnd2F2ZXMtdWkvZGlzdC9jb3JlL3RpbWVsaW5lJyk7XG5jb25zdCBMYXllciA9IHJlcXVpcmUoJ3dhdmVzLXVpL2Rpc3QvY29yZS9sYXllcicpO1xuY29uc3QgTGF5ZXJUaW1lQ29udGV4dCA9IHJlcXVpcmUoJ3dhdmVzLXVpL2Rpc3QvY29yZS9sYXllci10aW1lLWNvbnRleHQnKTtcbmNvbnN0IExpbmUgPSByZXF1aXJlKCd3YXZlcy11aS9kaXN0L3NoYXBlcy9saW5lJyk7XG5jb25zdCBEb3QgPSByZXF1aXJlKCd3YXZlcy11aS9kaXN0L3NoYXBlcy9kb3QnKTtcbmNvbnN0IEJyZWFrcG9pbnRCZWhhdmlvciA9IHJlcXVpcmUoJ3dhdmVzLXVpL2Rpc3QvYmVoYXZpb3JzL2JyZWFrcG9pbnQtYmVoYXZpb3InKTtcbmNvbnN0IEJhc2VTdGF0ZSA9IHJlcXVpcmUoJ3dhdmVzLXVpL2Rpc3QvdGltZWxpbmUtc3RhdGVzL2Jhc2Utc3RhdGUnKTtcblxuY29uc3QgQmFzZUNvbnRyb2xsZXIgPSByZXF1aXJlKCcuL2Jhc2UtY29udHJvbGxlcicpO1xuXG4vLyBtaW1pYyBtYXggYGZ1bmN0aW9uYCBpbnRlcmFjdGlvbnNcbmNsYXNzIEJyZWFrcG9pbnRTdGF0ZSBleHRlbmRzIEJhc2VTdGF0ZSB7XG4gIGNvbnN0cnVjdG9yKHRpbWVsaW5lKSB7XG4gICAgc3VwZXIodGltZWxpbmUpO1xuXG4gICAgdGhpcy5jdXJyZW50RWRpdGVkTGF5ZXIgPSBudWxsO1xuICAgIHRoaXMuY3VycmVudFRhcmdldCA9IG51bGw7XG4gIH1cblxuICBlbnRlcigpIHt9XG4gIGV4aXQoKSB7fVxuXG4gIGhhbmRsZUV2ZW50KGUpIHtcbiAgICBzd2l0Y2ggKGUudHlwZSkge1xuICAgICAgY2FzZSAnbW91c2Vkb3duJzpcbiAgICAgICAgdGhpcy5vbk1vdXNlRG93bihlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdtb3VzZW1vdmUnOlxuICAgICAgICB0aGlzLm9uTW91c2VNb3ZlKGUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ21vdXNldXAnOlxuICAgICAgICB0aGlzLm9uTW91c2VVcChlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgb25Nb3VzZURvd24oZSkge1xuICAgIHRoaXMubW91c2VEb3duID0gdHJ1ZTtcbiAgICAvLyBrZWVwIHRhcmdldCBjb25zaXN0ZW50IHdpdGggbW91c2UgZG93blxuICAgIHRoaXMuY3VycmVudFRhcmdldCA9IGUudGFyZ2V0O1xuXG4gICAgdGhpcy5sYXllcnMuZm9yRWFjaCgobGF5ZXIpID0+IHtcbiAgICAgIGxheWVyLnVuc2VsZWN0KCk7XG4gICAgICBjb25zdCBpdGVtID0gbGF5ZXIuZ2V0SXRlbUZyb21ET01FbGVtZW50KGUudGFyZ2V0KTtcblxuICAgICAgaWYgKGl0ZW0gPT09IG51bGwpIHtcbiAgICAgICAgLy8gY3JlYXRlIGFuIGl0ZW1cbiAgICAgICAgY29uc3QgZGF0dW0gPSBbXG4gICAgICAgICAgZS54IC8gdGhpcy50aW1lbGluZS5jb250YWluZXJzV2lkdGgsXG4gICAgICAgICAgMSAtIChlLnkgLyBsYXllci5wYXJhbXMuaGVpZ2h0KVxuICAgICAgICBdO1xuXG4gICAgICAgIGxheWVyLmRhdGEucHVzaChkYXR1bSk7XG5cbiAgICAgICAgdGhpcy50aW1lbGluZS5kcmF3KCk7XG4gICAgICAgIHRoaXMudGltZWxpbmUudXBkYXRlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBpZiBzaGlmdCBpcyBwcmVzc2VkLCByZW1vdmUgdGhlIGl0ZW1cbiAgICAgICAgaWYgKGUub3JpZ2luYWxFdmVudC5zaGlmdEtleSkge1xuICAgICAgICAgIGNvbnN0IGRhdGEgPSBsYXllci5kYXRhO1xuICAgICAgICAgIGNvbnN0IGRhdHVtID0gbGF5ZXIuZ2V0RGF0dW1Gcm9tSXRlbShpdGVtKTtcbiAgICAgICAgICBkYXRhLnNwbGljZShkYXRhLmluZGV4T2YoZGF0dW0pLCAxKTtcblxuICAgICAgICAgIHRoaXMudGltZWxpbmUuZHJhdygpO1xuICAgICAgICAgIHRoaXMudGltZWxpbmUudXBkYXRlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5jdXJyZW50RWRpdGVkTGF5ZXIgPSBsYXllcjtcbiAgICAgICAgICBsYXllci5zZWxlY3QoaXRlbSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIG9uTW91c2VNb3ZlKGUpIHtcbiAgICBpZiAoIXRoaXMubW91c2VEb3duIHx8wqAhdGhpcy5jdXJyZW50RWRpdGVkTGF5ZXIpIHsgcmV0dXJuOyB9XG5cbiAgICBjb25zdCBsYXllciA9IHRoaXMuY3VycmVudEVkaXRlZExheWVyO1xuICAgIGNvbnN0IGl0ZW1zID0gbGF5ZXIuc2VsZWN0ZWRJdGVtcztcbiAgICAvLyB0aGUgbG9vcCBzaG91bGQgYmUgaW4gbGF5ZXIgdG8gbWF0Y2ggc2VsZWN0IC8gdW5zZWxlY3QgQVBJXG4gICAgaXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgbGF5ZXIuZWRpdChpdGVtLCBlLmR4LCBlLmR5LCB0aGlzLmN1cnJlbnRUYXJnZXQpO1xuICAgIH0pO1xuXG4gICAgbGF5ZXIudXBkYXRlKGl0ZW1zKTtcbiAgfVxuXG4gIG9uTW91c2VVcChlKSB7XG4gICAgdGhpcy5jdXJyZW50RWRpdGVkTGF5ZXIgPSBudWxsO1xuICAgIHRoaXMubW91c2VEb3duID0gZmFsc2U7XG4gIH1cbn1cblxuLy8gQFRPRE8gaGFuZGxlIHRoZW1lIGBCYXNlQ29udHJvbGxlci50aGVtZWBcbmNsYXNzIEJyZWFrcG9pbnQgZXh0ZW5kcyBCYXNlQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKGxlZ2VuZCwgZGVmYXVsdERvdHMgPSBbXSwgJGNvbnRhaW5lciA9IG51bGwsIGNhbGxiYWNrID0gbnVsbCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy50eXBlID0gJ2JyZWFrcG9pbnQnO1xuICAgIHRoaXMubGVnZW5kID0gbGVnZW5kO1xuXG4gICAgdGhpcy5kb3RzID0gZGVmYXVsdERvdHM7XG4gICAgLy8gY29uc29sZS5sb2codGhpcy5kb3RzKTtcblxuICAgIHN1cGVyLl9hcHBseU9wdGlvbm5hbFBhcmFtZXRlcnMoJGNvbnRhaW5lciwgY2FsbGJhY2spO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGxldCBjb250ZW50ID0gYFxuICAgICAgPHNwYW4gY2xhc3M9XCJsZWdlbmRcIj4ke3RoaXMubGVnZW5kfTwvc3Bhbj5cbiAgICAgIDxkaXYgY2xhc3M9XCJpbm5lci13cmFwcGVyIHRpbWVsaW5lXCI+PC9kaXY+XG4gICAgYDtcblxuICAgIHRoaXMuJGVsID0gc3VwZXIucmVuZGVyKCk7XG4gICAgdGhpcy4kZWwuY2xhc3NMaXN0LmFkZCh0aGlzLnR5cGUpO1xuICAgIHRoaXMuJGVsLmlubmVySFRNTCA9IGNvbnRlbnQ7XG5cbiAgICB0aGlzLiR0aW1lbGluZSA9IHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoJy50aW1lbGluZScpO1xuICAgIC8vIGNyZWF0ZSBhIHRpbWVsaW5lIHdpdGggYSBicmVha3BvaW50IGZ1bmN0aW9uXG4gICAgdGhpcy50aW1lbGluZSA9IG5ldyBUaW1lbGluZSgpO1xuICAgIHRoaXMudGltZWxpbmUucmVnaXN0ZXJDb250YWluZXIoJ21haW4nLCB0aGlzLiR0aW1lbGluZSwgeyBoZWlnaHQ6IDMwMCB9KTtcblxuICAgIGNvbnN0IGJyZWFrcG9pbnRUaW1lQ29udGV4dCA9IG5ldyBMYXllclRpbWVDb250ZXh0KHRoaXMudGltZWxpbmUudGltZUNvbnRleHQpO1xuICAgIHRoaXMuYnJlYWtwb2ludExheWVyID0gbmV3IExheWVyKCdjb2xsZWN0aW9uJywgdGhpcy5kb3RzLCB7IGhlaWdodDogMzAwIH0pO1xuICAgIHRoaXMuYnJlYWtwb2ludExheWVyLnNldFRpbWVDb250ZXh0KGJyZWFrcG9pbnRUaW1lQ29udGV4dCk7XG5cbiAgICBjb25zdCBjeEFjY2Vzc29yID0gKGQsIHYgPSBudWxsKSA9PiB7XG4gICAgICBpZiAodiAhPT0gbnVsbCkgeyBkWzBdID0gdjsgfVxuICAgICAgcmV0dXJuIGRbMF07XG4gICAgfTtcblxuICAgIGNvbnN0IGN5QWNjZXNzb3IgPSAoZCwgdiA9IG51bGwpID0+IHtcbiAgICAgIGlmICh2ICE9PSBudWxsKSB7IGRbMV0gPSB2OyB9XG4gICAgICByZXR1cm4gZFsxXTtcbiAgICB9O1xuXG4gICAgdGhpcy5icmVha3BvaW50TGF5ZXIuY29uZmlndXJlU2hhcGUoRG90LCB7XG4gICAgICBjb2xvcjogKGQpID0+ICcjZmZmZmZmJyxcbiAgICAgIGN4OiBjeEFjY2Vzc29yLFxuICAgICAgY3k6IGN5QWNjZXNzb3JcbiAgICB9KTtcblxuICAgIHRoaXMuYnJlYWtwb2ludExheWVyLmNvbmZpZ3VyZUNvbW1vblNoYXBlKExpbmUsIHtcbiAgICAgIGN4OiBjeEFjY2Vzc29yLFxuICAgICAgY3k6IGN5QWNjZXNzb3JcbiAgICB9LCB7XG4gICAgICBjb2xvcjogJyNmZmZmZmYnXG4gICAgfSk7XG5cbiAgICB0aGlzLmJyZWFrcG9pbnRMYXllci5zZXRCZWhhdmlvcihuZXcgQnJlYWtwb2ludEJlaGF2aW9yKCkpO1xuXG4gICAgLy8gY2xhbXAgZG90IHggLyB5IHZhbHVlc1xuICAgIHRoaXMuYnJlYWtwb2ludExheWVyLm9uKCdlZGl0JywgZnVuY3Rpb24oc2hhcGUsIGRhdHVtKSB7XG4gICAgICBkYXR1bVswXSA9IE1hdGgubWF4KDAsIE1hdGgubWluKGRhdHVtWzBdLCAxKSk7XG4gICAgICBkYXR1bVsxXSA9IE1hdGgubWF4KDAsIE1hdGgubWluKGRhdHVtWzFdLCAxKSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLnRpbWVsaW5lLmFkZExheWVyKHRoaXMuYnJlYWtwb2ludExheWVyLCAnbWFpbicpO1xuXG4gICAgdGhpcy50aW1lbGluZS5yZW5kZXIoKTtcbiAgICB0aGlzLnRpbWVsaW5lLmRyYXcoKTtcbiAgICB0aGlzLnRpbWVsaW5lLnVwZGF0ZSgpO1xuXG4gICAgdGhpcy50aW1lbGluZS5zZXRTdGF0ZShuZXcgQnJlYWtwb2ludFN0YXRlKHRoaXMudGltZWxpbmUpKTtcblxuICAgIHRoaXMuYmluZEV2ZW50cygpO1xuXG4gICAgcmV0dXJuIHRoaXMuJGVsO1xuICB9XG5cbiAgb25SZXNpemUoKSB7XG4gICAgc3VwZXIub25SZXNpemUoKTtcblxuICAgIGNvbnN0IHdpZHRoID0gdGhpcy4kdGltZWxpbmUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG4gICAgdGhpcy50aW1lbGluZS5zZXRDb250YWluZXJzV2lkdGgod2lkdGgpO1xuICAgIHRoaXMudGltZWxpbmUucGl4ZWxzUGVyU2Vjb25kID0gd2lkdGg7XG4gICAgdGhpcy50aW1lbGluZS51cGRhdGUoKTtcbiAgfVxuXG4gIGJpbmRFdmVudHMoKSB7XG4gICAgdGhpcy50aW1lbGluZS5vbigndXBkYXRlJywgKCkgPT4geyB0aGlzLmVtaXQoJ2NoYW5nZScsIHRoaXMuZG90cyk7IH0pO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQnJlYWtwb2ludDtcbiJdfQ==