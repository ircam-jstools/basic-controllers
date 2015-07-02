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

      var breakpointTimeContext = new TimeContext(this.timeline.timeContext);
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
//# sourceMappingURL=data:application/json;base64,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QUFDLENBQUMsQ0FBQztPQUMvQyxDQUFDLENBQUM7O0FBRUgsVUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxNQUFNLENBQUMsQ0FBQzs7QUFFckQsVUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUN2QixVQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ3JCLFVBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7O0FBRXZCLFVBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksZUFBZSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDOztBQUUzRCxVQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7O0FBRWxCLGFBQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztLQUNqQjs7O1dBRU8sb0JBQUc7QUFDVCxpQ0E1RUUsVUFBVSwwQ0E0RUs7O0FBRWpCLFVBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxLQUFLLENBQUM7QUFDM0QsVUFBSSxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN4QyxVQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7QUFDdEMsVUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztLQUN4Qjs7O1dBRVMsc0JBQUc7OztBQUNYLFVBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxZQUFNO0FBQUUsZUFBSyxJQUFJLENBQUMsUUFBUSxFQUFFLE9BQUssSUFBSSxDQUFDLENBQUM7T0FBRSxDQUFDLENBQUM7S0FDdkU7OztTQXRGRyxVQUFVO0dBQVMsY0FBYzs7QUF5RnZDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDIiwiZmlsZSI6ImVzNi9icmVha3BvaW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgVGltZWxpbmUgPSByZXF1aXJlKCd3YXZlcy11aS9kaXN0L2NvcmUvdGltZWxpbmUnKTtcbmNvbnN0IExheWVyID0gcmVxdWlyZSgnd2F2ZXMtdWkvZGlzdC9jb3JlL2xheWVyJyk7XG5jb25zdCBUaW1lQ29udGV4dCA9IHJlcXVpcmUoJ3dhdmVzLXVpL2Rpc3QvY29yZS90aW1lLWNvbnRleHQnKTtcbmNvbnN0IExpbmUgPSByZXF1aXJlKCd3YXZlcy11aS9kaXN0L3NoYXBlcy9saW5lJyk7XG5jb25zdCBEb3QgPSByZXF1aXJlKCd3YXZlcy11aS9kaXN0L3NoYXBlcy9kb3QnKTtcbmNvbnN0IEJyZWFrcG9pbnRCZWhhdmlvciA9IHJlcXVpcmUoJ3dhdmVzLXVpL2Rpc3QvYmVoYXZpb3JzL2JyZWFrcG9pbnQtYmVoYXZpb3InKTtcbmNvbnN0IEJhc2VTdGF0ZSA9IHJlcXVpcmUoJ3dhdmVzLXVpL2Rpc3QvdGltZWxpbmUtc3RhdGVzL2Jhc2Utc3RhdGUnKTtcblxuY29uc3QgQmFzZUNvbnRyb2xsZXIgPSByZXF1aXJlKCcuL2Jhc2UtY29udHJvbGxlcicpO1xuXG4vLyBtaW1pYyBtYXggYGZ1bmN0aW9uYCBpbnRlcmFjdGlvbnNcbmNsYXNzIEJyZWFrcG9pbnRTdGF0ZSBleHRlbmRzIEJhc2VTdGF0ZSB7XG4gIGNvbnN0cnVjdG9yKHRpbWVsaW5lKSB7XG4gICAgc3VwZXIodGltZWxpbmUpO1xuXG4gICAgdGhpcy5jdXJyZW50RWRpdGVkTGF5ZXIgPSBudWxsO1xuICAgIHRoaXMuY3VycmVudFRhcmdldCA9IG51bGw7XG4gIH1cblxuICBlbnRlcigpIHt9XG4gIGV4aXQoKSB7fVxuXG4gIGhhbmRsZUV2ZW50KGUpIHtcbiAgICBzd2l0Y2ggKGUudHlwZSkge1xuICAgICAgY2FzZSAnbW91c2Vkb3duJzpcbiAgICAgICAgdGhpcy5vbk1vdXNlRG93bihlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdtb3VzZW1vdmUnOlxuICAgICAgICB0aGlzLm9uTW91c2VNb3ZlKGUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ21vdXNldXAnOlxuICAgICAgICB0aGlzLm9uTW91c2VVcChlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgb25Nb3VzZURvd24oZSkge1xuICAgIHRoaXMubW91c2VEb3duID0gdHJ1ZTtcbiAgICAvLyBrZWVwIHRhcmdldCBjb25zaXN0ZW50IHdpdGggbW91c2UgZG93blxuICAgIHRoaXMuY3VycmVudFRhcmdldCA9IGUudGFyZ2V0O1xuXG4gICAgdGhpcy5sYXllcnMuZm9yRWFjaCgobGF5ZXIpID0+IHtcbiAgICAgIGxheWVyLnVuc2VsZWN0KCk7XG4gICAgICBjb25zdCBpdGVtID0gbGF5ZXIuZ2V0SXRlbUZyb21ET01FbGVtZW50KGUudGFyZ2V0KTtcblxuICAgICAgaWYgKGl0ZW0gPT09IG51bGwpIHtcbiAgICAgICAgLy8gY3JlYXRlIGFuIGl0ZW1cbiAgICAgICAgY29uc3QgZGF0dW0gPSBbXG4gICAgICAgICAgZS54IC8gdGhpcy50aW1lbGluZS5jb250YWluZXJzV2lkdGgsXG4gICAgICAgICAgMSAtIChlLnkgLyBsYXllci5wYXJhbXMuaGVpZ2h0KVxuICAgICAgICBdO1xuXG4gICAgICAgIGxheWVyLmRhdGEucHVzaChkYXR1bSk7XG5cbiAgICAgICAgdGhpcy50aW1lbGluZS5kcmF3KCk7XG4gICAgICAgIHRoaXMudGltZWxpbmUudXBkYXRlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBpZiBzaGlmdCBpcyBwcmVzc2VkLCByZW1vdmUgdGhlIGl0ZW1cbiAgICAgICAgaWYgKGUub3JpZ2luYWxFdmVudC5zaGlmdEtleSkge1xuICAgICAgICAgIGNvbnN0IGRhdGEgPSBsYXllci5kYXRhO1xuICAgICAgICAgIGNvbnN0IGRhdHVtID0gbGF5ZXIuZ2V0RGF0dW1Gcm9tSXRlbShpdGVtKTtcbiAgICAgICAgICBkYXRhLnNwbGljZShkYXRhLmluZGV4T2YoZGF0dW0pLCAxKTtcblxuICAgICAgICAgIHRoaXMudGltZWxpbmUuZHJhdygpO1xuICAgICAgICAgIHRoaXMudGltZWxpbmUudXBkYXRlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5jdXJyZW50RWRpdGVkTGF5ZXIgPSBsYXllcjtcbiAgICAgICAgICBsYXllci5zZWxlY3QoaXRlbSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIG9uTW91c2VNb3ZlKGUpIHtcbiAgICBpZiAoIXRoaXMubW91c2VEb3duIHx8wqAhdGhpcy5jdXJyZW50RWRpdGVkTGF5ZXIpIHsgcmV0dXJuOyB9XG5cbiAgICBjb25zdCBsYXllciA9IHRoaXMuY3VycmVudEVkaXRlZExheWVyO1xuICAgIGNvbnN0IGl0ZW1zID0gbGF5ZXIuc2VsZWN0ZWRJdGVtcztcbiAgICAvLyB0aGUgbG9vcCBzaG91bGQgYmUgaW4gbGF5ZXIgdG8gbWF0Y2ggc2VsZWN0IC8gdW5zZWxlY3QgQVBJXG4gICAgaXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgbGF5ZXIuZWRpdChpdGVtLCBlLmR4LCBlLmR5LCB0aGlzLmN1cnJlbnRUYXJnZXQpO1xuICAgIH0pO1xuXG4gICAgbGF5ZXIudXBkYXRlKGl0ZW1zKTtcbiAgfVxuXG4gIG9uTW91c2VVcChlKSB7XG4gICAgdGhpcy5jdXJyZW50RWRpdGVkTGF5ZXIgPSBudWxsO1xuICAgIHRoaXMubW91c2VEb3duID0gZmFsc2U7XG4gIH1cbn1cblxuLy8gQFRPRE8gaGFuZGxlIHRoZW1lIGBCYXNlQ29udHJvbGxlci50aGVtZWBcbmNsYXNzIEJyZWFrcG9pbnQgZXh0ZW5kcyBCYXNlQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKGxlZ2VuZCwgZGVmYXVsdERvdHMgPSBbXSwgJGNvbnRhaW5lciA9IG51bGwsIGNhbGxiYWNrID0gbnVsbCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy50eXBlID0gJ2JyZWFrcG9pbnQnO1xuICAgIHRoaXMubGVnZW5kID0gbGVnZW5kO1xuXG4gICAgdGhpcy5kb3RzID0gZGVmYXVsdERvdHM7XG4gICAgLy8gY29uc29sZS5sb2codGhpcy5kb3RzKTtcblxuICAgIHN1cGVyLl9hcHBseU9wdGlvbm5hbFBhcmFtZXRlcnMoJGNvbnRhaW5lciwgY2FsbGJhY2spO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGxldCBjb250ZW50ID0gYFxuICAgICAgPHNwYW4gY2xhc3M9XCJsZWdlbmRcIj4ke3RoaXMubGVnZW5kfTwvc3Bhbj5cbiAgICAgIDxkaXYgY2xhc3M9XCJpbm5lci13cmFwcGVyIHRpbWVsaW5lXCI+PC9kaXY+XG4gICAgYDtcblxuICAgIHRoaXMuJGVsID0gc3VwZXIucmVuZGVyKCk7XG4gICAgdGhpcy4kZWwuY2xhc3NMaXN0LmFkZCh0aGlzLnR5cGUpO1xuICAgIHRoaXMuJGVsLmlubmVySFRNTCA9IGNvbnRlbnQ7XG5cbiAgICB0aGlzLiR0aW1lbGluZSA9IHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoJy50aW1lbGluZScpO1xuICAgIC8vIGNyZWF0ZSBhIHRpbWVsaW5lIHdpdGggYSBicmVha3BvaW50IGZ1bmN0aW9uXG4gICAgdGhpcy50aW1lbGluZSA9IG5ldyBUaW1lbGluZSgpO1xuICAgIHRoaXMudGltZWxpbmUucmVnaXN0ZXJDb250YWluZXIoJ21haW4nLCB0aGlzLiR0aW1lbGluZSwgeyBoZWlnaHQ6IDMwMCB9KTtcblxuICAgIGNvbnN0IGJyZWFrcG9pbnRUaW1lQ29udGV4dCA9IG5ldyBUaW1lQ29udGV4dCh0aGlzLnRpbWVsaW5lLnRpbWVDb250ZXh0KTtcbiAgICB0aGlzLmJyZWFrcG9pbnRMYXllciA9IG5ldyBMYXllcignY29sbGVjdGlvbicsIHRoaXMuZG90cywgeyBoZWlnaHQ6IDMwMCB9KTtcbiAgICB0aGlzLmJyZWFrcG9pbnRMYXllci5zZXRUaW1lQ29udGV4dChicmVha3BvaW50VGltZUNvbnRleHQpO1xuXG4gICAgY29uc3QgY3hBY2Nlc3NvciA9IChkLCB2ID0gbnVsbCkgPT4ge1xuICAgICAgaWYgKHYgIT09IG51bGwpIHsgZFswXSA9IHY7IH1cbiAgICAgIHJldHVybiBkWzBdO1xuICAgIH07XG5cbiAgICBjb25zdCBjeUFjY2Vzc29yID0gKGQsIHYgPSBudWxsKSA9PiB7XG4gICAgICBpZiAodiAhPT0gbnVsbCkgeyBkWzFdID0gdjsgfVxuICAgICAgcmV0dXJuIGRbMV07XG4gICAgfTtcblxuICAgIHRoaXMuYnJlYWtwb2ludExheWVyLmNvbmZpZ3VyZVNoYXBlKERvdCwge1xuICAgICAgY29sb3I6IChkKSA9PiAnI2ZmZmZmZicsXG4gICAgICBjeDogY3hBY2Nlc3NvcixcbiAgICAgIGN5OiBjeUFjY2Vzc29yXG4gICAgfSk7XG5cbiAgICB0aGlzLmJyZWFrcG9pbnRMYXllci5jb25maWd1cmVDb21tb25TaGFwZShMaW5lLCB7XG4gICAgICBjeDogY3hBY2Nlc3NvcixcbiAgICAgIGN5OiBjeUFjY2Vzc29yXG4gICAgfSwge1xuICAgICAgY29sb3I6ICcjZmZmZmZmJ1xuICAgIH0pO1xuXG4gICAgdGhpcy5icmVha3BvaW50TGF5ZXIuc2V0QmVoYXZpb3IobmV3IEJyZWFrcG9pbnRCZWhhdmlvcigpKTtcblxuICAgIC8vIGNsYW1wIGRvdCB4IC8geSB2YWx1ZXNcbiAgICB0aGlzLmJyZWFrcG9pbnRMYXllci5vbignZWRpdCcsIGZ1bmN0aW9uKHNoYXBlLCBkYXR1bSkge1xuICAgICAgZGF0dW1bMF0gPSBNYXRoLm1heCgwLCBNYXRoLm1pbihkYXR1bVswXSwgMSkpO1xuICAgICAgZGF0dW1bMV0gPSBNYXRoLm1heCgwLCBNYXRoLm1pbihkYXR1bVsxXSwgMSkpO1xuICAgIH0pO1xuXG4gICAgdGhpcy50aW1lbGluZS5hZGRMYXllcih0aGlzLmJyZWFrcG9pbnRMYXllciwgJ21haW4nKTtcblxuICAgIHRoaXMudGltZWxpbmUucmVuZGVyKCk7XG4gICAgdGhpcy50aW1lbGluZS5kcmF3KCk7XG4gICAgdGhpcy50aW1lbGluZS51cGRhdGUoKTtcblxuICAgIHRoaXMudGltZWxpbmUuc2V0U3RhdGUobmV3IEJyZWFrcG9pbnRTdGF0ZSh0aGlzLnRpbWVsaW5lKSk7XG5cbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcblxuICAgIHJldHVybiB0aGlzLiRlbDtcbiAgfVxuXG4gIG9uUmVzaXplKCkge1xuICAgIHN1cGVyLm9uUmVzaXplKCk7XG5cbiAgICBjb25zdCB3aWR0aCA9IHRoaXMuJHRpbWVsaW5lLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xuICAgIHRoaXMudGltZWxpbmUuc2V0Q29udGFpbmVyc1dpZHRoKHdpZHRoKTtcbiAgICB0aGlzLnRpbWVsaW5lLnBpeGVsc1BlclNlY29uZCA9IHdpZHRoO1xuICAgIHRoaXMudGltZWxpbmUudXBkYXRlKCk7XG4gIH1cblxuICBiaW5kRXZlbnRzKCkge1xuICAgIHRoaXMudGltZWxpbmUub24oJ3VwZGF0ZScsICgpID0+IHsgdGhpcy5lbWl0KCdjaGFuZ2UnLCB0aGlzLmRvdHMpOyB9KTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEJyZWFrcG9pbnQ7XG4iXX0=