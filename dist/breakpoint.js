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

          _this.timeline.drawLayerShapes();
          _this.timeline.update();
        } else {
          // if shift is pressed, remove the item
          if (e.originalEvent.shiftKey) {
            var data = layer.data;
            var datum = layer.getDatumFromItem(item);
            data.splice(data.indexOf(datum), 1);

            _this.timeline.drawLayerShapes();
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
      this.timeline.registerContainer(this.$timeline, { height: 300 });

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

      this.timeline.addLayer(this.breakpointLayer);

      this.timeline.drawLayerShapes();
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
//# sourceMappingURL=data:application/json;base64,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QyxDQUFDO09BQy9DLENBQUMsQ0FBQzs7QUFFSCxVQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7O0FBRTdDLFVBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxFQUFFLENBQUM7QUFDaEMsVUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7QUFFdkIsVUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7O0FBRTNELFVBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQzs7QUFFbEIsYUFBTyxJQUFJLENBQUMsR0FBRyxDQUFDO0tBQ2pCOzs7V0FFTyxvQkFBRztBQUNULGlDQTFFRSxVQUFVLDBDQTBFSzs7QUFFakIsVUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLEtBQUssQ0FBQztBQUMzRCxVQUFJLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3hDLFVBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQztBQUN0QyxVQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO0tBQ3hCOzs7V0FFUyxzQkFBRzs7O0FBQ1gsVUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLFlBQU07QUFBRSxlQUFLLElBQUksQ0FBQyxRQUFRLEVBQUUsT0FBSyxJQUFJLENBQUMsQ0FBQztPQUFFLENBQUMsQ0FBQztLQUN2RTs7O1NBcEZHLFVBQVU7R0FBUyxjQUFjOztBQXVGdkMsTUFBTSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUMiLCJmaWxlIjoiZXM2L2JyZWFrcG9pbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBUaW1lbGluZSA9IHJlcXVpcmUoJ3dhdmVzLXVpL2Rpc3QvY29yZS90aW1lbGluZScpO1xuY29uc3QgTGF5ZXIgPSByZXF1aXJlKCd3YXZlcy11aS9kaXN0L2NvcmUvbGF5ZXInKTtcbmNvbnN0IExheWVyVGltZUNvbnRleHQgPSByZXF1aXJlKCd3YXZlcy11aS9kaXN0L2NvcmUvbGF5ZXItdGltZS1jb250ZXh0Jyk7XG5jb25zdCBMaW5lID0gcmVxdWlyZSgnd2F2ZXMtdWkvZGlzdC9zaGFwZXMvbGluZScpO1xuY29uc3QgRG90ID0gcmVxdWlyZSgnd2F2ZXMtdWkvZGlzdC9zaGFwZXMvZG90Jyk7XG5jb25zdCBCcmVha3BvaW50QmVoYXZpb3IgPSByZXF1aXJlKCd3YXZlcy11aS9kaXN0L2JlaGF2aW9ycy9icmVha3BvaW50LWJlaGF2aW9yJyk7XG5jb25zdCBCYXNlU3RhdGUgPSByZXF1aXJlKCd3YXZlcy11aS9kaXN0L3RpbWVsaW5lLXN0YXRlcy9iYXNlLXN0YXRlJyk7XG5cbmNvbnN0IEJhc2VDb250cm9sbGVyID0gcmVxdWlyZSgnLi9iYXNlLWNvbnRyb2xsZXInKTtcblxuLy8gbWltaWMgbWF4IGBmdW5jdGlvbmAgaW50ZXJhY3Rpb25zXG5jbGFzcyBCcmVha3BvaW50U3RhdGUgZXh0ZW5kcyBCYXNlU3RhdGUge1xuICBjb25zdHJ1Y3Rvcih0aW1lbGluZSkge1xuICAgIHN1cGVyKHRpbWVsaW5lKTtcblxuICAgIHRoaXMuY3VycmVudEVkaXRlZExheWVyID0gbnVsbDtcbiAgICB0aGlzLmN1cnJlbnRUYXJnZXQgPSBudWxsO1xuICB9XG5cbiAgZW50ZXIoKSB7fVxuICBleGl0KCkge31cblxuICBoYW5kbGVFdmVudChlKSB7XG4gICAgc3dpdGNoIChlLnR5cGUpIHtcbiAgICAgIGNhc2UgJ21vdXNlZG93bic6XG4gICAgICAgIHRoaXMub25Nb3VzZURvd24oZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnbW91c2Vtb3ZlJzpcbiAgICAgICAgdGhpcy5vbk1vdXNlTW92ZShlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdtb3VzZXVwJzpcbiAgICAgICAgdGhpcy5vbk1vdXNlVXAoZSk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIG9uTW91c2VEb3duKGUpIHtcbiAgICB0aGlzLm1vdXNlRG93biA9IHRydWU7XG4gICAgLy8ga2VlcCB0YXJnZXQgY29uc2lzdGVudCB3aXRoIG1vdXNlIGRvd25cbiAgICB0aGlzLmN1cnJlbnRUYXJnZXQgPSBlLnRhcmdldDtcblxuICAgIHRoaXMubGF5ZXJzLmZvckVhY2goKGxheWVyKSA9PiB7XG4gICAgICBsYXllci51bnNlbGVjdCgpO1xuICAgICAgY29uc3QgaXRlbSA9IGxheWVyLmdldEl0ZW1Gcm9tRE9NRWxlbWVudChlLnRhcmdldCk7XG5cbiAgICAgIGlmIChpdGVtID09PSBudWxsKSB7XG4gICAgICAgIC8vIGNyZWF0ZSBhbiBpdGVtXG4gICAgICAgIGNvbnN0IGRhdHVtID0gW1xuICAgICAgICAgIGUueCAvIHRoaXMudGltZWxpbmUuY29udGFpbmVyc1dpZHRoLFxuICAgICAgICAgIDEgLSAoZS55IC8gbGF5ZXIucGFyYW1zLmhlaWdodClcbiAgICAgICAgXTtcblxuICAgICAgICBsYXllci5kYXRhLnB1c2goZGF0dW0pO1xuXG4gICAgICAgIHRoaXMudGltZWxpbmUuZHJhd0xheWVyU2hhcGVzKCk7XG4gICAgICAgIHRoaXMudGltZWxpbmUudXBkYXRlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBpZiBzaGlmdCBpcyBwcmVzc2VkLCByZW1vdmUgdGhlIGl0ZW1cbiAgICAgICAgaWYgKGUub3JpZ2luYWxFdmVudC5zaGlmdEtleSkge1xuICAgICAgICAgIGNvbnN0IGRhdGEgPSBsYXllci5kYXRhO1xuICAgICAgICAgIGNvbnN0IGRhdHVtID0gbGF5ZXIuZ2V0RGF0dW1Gcm9tSXRlbShpdGVtKTtcbiAgICAgICAgICBkYXRhLnNwbGljZShkYXRhLmluZGV4T2YoZGF0dW0pLCAxKTtcblxuICAgICAgICAgIHRoaXMudGltZWxpbmUuZHJhd0xheWVyU2hhcGVzKCk7XG4gICAgICAgICAgdGhpcy50aW1lbGluZS51cGRhdGUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmN1cnJlbnRFZGl0ZWRMYXllciA9IGxheWVyO1xuICAgICAgICAgIGxheWVyLnNlbGVjdChpdGVtKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgb25Nb3VzZU1vdmUoZSkge1xuICAgIGlmICghdGhpcy5tb3VzZURvd24gfHzCoCF0aGlzLmN1cnJlbnRFZGl0ZWRMYXllcikgeyByZXR1cm47IH1cblxuICAgIGNvbnN0IGxheWVyID0gdGhpcy5jdXJyZW50RWRpdGVkTGF5ZXI7XG4gICAgY29uc3QgaXRlbXMgPSBsYXllci5zZWxlY3RlZEl0ZW1zO1xuICAgIC8vIHRoZSBsb29wIHNob3VsZCBiZSBpbiBsYXllciB0byBtYXRjaCBzZWxlY3QgLyB1bnNlbGVjdCBBUElcbiAgICBpdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICBsYXllci5lZGl0KGl0ZW0sIGUuZHgsIGUuZHksIHRoaXMuY3VycmVudFRhcmdldCk7XG4gICAgfSk7XG5cbiAgICBsYXllci51cGRhdGUoaXRlbXMpO1xuICB9XG5cbiAgb25Nb3VzZVVwKGUpIHtcbiAgICB0aGlzLmN1cnJlbnRFZGl0ZWRMYXllciA9IG51bGw7XG4gICAgdGhpcy5tb3VzZURvd24gPSBmYWxzZTtcbiAgfVxufVxuXG4vLyBAVE9ETyBoYW5kbGUgdGhlbWUgYEJhc2VDb250cm9sbGVyLnRoZW1lYFxuY2xhc3MgQnJlYWtwb2ludCBleHRlbmRzIEJhc2VDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IobGVnZW5kLCBkZWZhdWx0RG90cyA9IFtdLCAkY29udGFpbmVyID0gbnVsbCwgY2FsbGJhY2sgPSBudWxsKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnR5cGUgPSAnYnJlYWtwb2ludCc7XG4gICAgdGhpcy5sZWdlbmQgPSBsZWdlbmQ7XG5cbiAgICB0aGlzLmRvdHMgPSBkZWZhdWx0RG90cztcblxuICAgIHN1cGVyLl9hcHBseU9wdGlvbm5hbFBhcmFtZXRlcnMoJGNvbnRhaW5lciwgY2FsbGJhY2spO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGxldCBjb250ZW50ID0gYFxuICAgICAgPHNwYW4gY2xhc3M9XCJsZWdlbmRcIj4ke3RoaXMubGVnZW5kfTwvc3Bhbj5cbiAgICAgIDxkaXYgY2xhc3M9XCJpbm5lci13cmFwcGVyIHRpbWVsaW5lXCI+PC9kaXY+XG4gICAgYDtcblxuICAgIHRoaXMuJGVsID0gc3VwZXIucmVuZGVyKCk7XG4gICAgdGhpcy4kZWwuY2xhc3NMaXN0LmFkZCh0aGlzLnR5cGUpO1xuICAgIHRoaXMuJGVsLmlubmVySFRNTCA9IGNvbnRlbnQ7XG5cbiAgICB0aGlzLiR0aW1lbGluZSA9IHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoJy50aW1lbGluZScpO1xuICAgIC8vIGNyZWF0ZSBhIHRpbWVsaW5lIHdpdGggYSBicmVha3BvaW50IGZ1bmN0aW9uXG4gICAgdGhpcy50aW1lbGluZSA9IG5ldyBUaW1lbGluZSgpO1xuICAgIHRoaXMudGltZWxpbmUucmVnaXN0ZXJDb250YWluZXIodGhpcy4kdGltZWxpbmUsIHsgaGVpZ2h0OiAzMDAgfSk7XG5cbiAgICBjb25zdCBicmVha3BvaW50VGltZUNvbnRleHQgPSBuZXcgTGF5ZXJUaW1lQ29udGV4dCh0aGlzLnRpbWVsaW5lLnRpbWVDb250ZXh0KTtcbiAgICB0aGlzLmJyZWFrcG9pbnRMYXllciA9IG5ldyBMYXllcignY29sbGVjdGlvbicsIHRoaXMuZG90cywgeyBoZWlnaHQ6IDMwMCB9KTtcbiAgICB0aGlzLmJyZWFrcG9pbnRMYXllci5zZXRUaW1lQ29udGV4dChicmVha3BvaW50VGltZUNvbnRleHQpO1xuXG4gICAgY29uc3QgY3hBY2Nlc3NvciA9IChkLCB2ID0gbnVsbCkgPT4ge1xuICAgICAgaWYgKHYgIT09IG51bGwpIHsgZFswXSA9IHY7IH1cbiAgICAgIHJldHVybiBkWzBdO1xuICAgIH07XG5cbiAgICBjb25zdCBjeUFjY2Vzc29yID0gKGQsIHYgPSBudWxsKSA9PiB7XG4gICAgICBpZiAodiAhPT0gbnVsbCkgeyBkWzFdID0gdjsgfVxuICAgICAgcmV0dXJuIGRbMV07XG4gICAgfTtcblxuICAgIHRoaXMuYnJlYWtwb2ludExheWVyLmNvbmZpZ3VyZVNoYXBlKERvdCwge1xuICAgICAgY29sb3I6IChkKSA9PiAnI2ZmZmZmZicsXG4gICAgICBjeDogY3hBY2Nlc3NvcixcbiAgICAgIGN5OiBjeUFjY2Vzc29yXG4gICAgfSk7XG5cbiAgICB0aGlzLmJyZWFrcG9pbnRMYXllci5jb25maWd1cmVDb21tb25TaGFwZShMaW5lLCB7XG4gICAgICBjeDogY3hBY2Nlc3NvcixcbiAgICAgIGN5OiBjeUFjY2Vzc29yXG4gICAgfSwge1xuICAgICAgY29sb3I6ICcjZmZmZmZmJ1xuICAgIH0pO1xuXG4gICAgdGhpcy5icmVha3BvaW50TGF5ZXIuc2V0QmVoYXZpb3IobmV3IEJyZWFrcG9pbnRCZWhhdmlvcigpKTtcblxuICAgIC8vIGNsYW1wIGRvdCB4IC8geSB2YWx1ZXNcbiAgICB0aGlzLmJyZWFrcG9pbnRMYXllci5vbignZWRpdCcsIGZ1bmN0aW9uKHNoYXBlLCBkYXR1bSkge1xuICAgICAgZGF0dW1bMF0gPSBNYXRoLm1heCgwLCBNYXRoLm1pbihkYXR1bVswXSwgMSkpO1xuICAgICAgZGF0dW1bMV0gPSBNYXRoLm1heCgwLCBNYXRoLm1pbihkYXR1bVsxXSwgMSkpO1xuICAgIH0pO1xuXG4gICAgdGhpcy50aW1lbGluZS5hZGRMYXllcih0aGlzLmJyZWFrcG9pbnRMYXllcik7XG5cbiAgICB0aGlzLnRpbWVsaW5lLmRyYXdMYXllclNoYXBlcygpO1xuICAgIHRoaXMudGltZWxpbmUudXBkYXRlKCk7XG5cbiAgICB0aGlzLnRpbWVsaW5lLnNldFN0YXRlKG5ldyBCcmVha3BvaW50U3RhdGUodGhpcy50aW1lbGluZSkpO1xuXG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XG5cbiAgICByZXR1cm4gdGhpcy4kZWw7XG4gIH1cblxuICBvblJlc2l6ZSgpIHtcbiAgICBzdXBlci5vblJlc2l6ZSgpO1xuXG4gICAgY29uc3Qgd2lkdGggPSB0aGlzLiR0aW1lbGluZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcbiAgICB0aGlzLnRpbWVsaW5lLnNldENvbnRhaW5lcnNXaWR0aCh3aWR0aCk7XG4gICAgdGhpcy50aW1lbGluZS5waXhlbHNQZXJTZWNvbmQgPSB3aWR0aDtcbiAgICB0aGlzLnRpbWVsaW5lLnVwZGF0ZSgpO1xuICB9XG5cbiAgYmluZEV2ZW50cygpIHtcbiAgICB0aGlzLnRpbWVsaW5lLm9uKCd1cGRhdGUnLCAoKSA9PiB7IHRoaXMuZW1pdCgnY2hhbmdlJywgdGhpcy5kb3RzKTsgfSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBCcmVha3BvaW50O1xuIl19