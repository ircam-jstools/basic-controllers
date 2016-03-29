'use strict';

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Not exposed anymore, should be handled as a plugin or something.
 * waves-ui dependecies is too heavy for a use-case that is not proven
 */
var Timeline = require('waves-ui/dist/core/timeline');
var Layer = require('waves-ui/dist/core/layer');
var LayerTimeContext = require('waves-ui/dist/core/layer-time-context');
var Line = require('waves-ui/dist/shapes/line');
var Dot = require('waves-ui/dist/shapes/dot');
var BreakpointBehavior = require('waves-ui/dist/behaviors/breakpoint-behavior');
var BaseState = require('waves-ui/dist/states/base-state');
var BaseController = require('./base-controller');

// mimic max `function` interactions

var BreakpointState = function (_BaseState) {
  (0, _inherits3.default)(BreakpointState, _BaseState);

  function BreakpointState(timeline) {
    (0, _classCallCheck3.default)(this, BreakpointState);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(BreakpointState).call(this, timeline));

    _this.currentEditedLayer = null;
    _this.currentTarget = null;
    return _this;
  }

  (0, _createClass3.default)(BreakpointState, [{
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
      var _this2 = this;

      this.mouseDown = true;
      // keep target consistent with mouse down
      this.currentTarget = e.target;

      this.layers.forEach(function (layer) {
        layer.unselect();
        var item = layer.getItemFromDOMElement(e.target);

        if (item === null) {
          // create an item
          var datum = [e.x / _this2.timeline.visibleWidth, 1 - e.y / layer.params.height];

          layer.data.push(datum);

          _this2.timeline.tracks.render();
          _this2.timeline.tracks.update();
        } else {
          // if shift is pressed, remove the item
          if (e.originalEvent.shiftKey) {
            var data = layer.data;
            var _datum = layer.getDatumFromItem(item);
            data.splice(data.indexOf(_datum), 1);

            _this2.timeline.tracks.render();
            _this2.timeline.tracks.update();
          } else {
            _this2.currentEditedLayer = layer;
            layer.select(item);
          }
        }
      });
    }
  }, {
    key: 'onMouseMove',
    value: function onMouseMove(e) {
      var _this3 = this;

      if (!this.mouseDown || !this.currentEditedLayer) {
        return;
      }

      var layer = this.currentEditedLayer;
      var items = layer.selectedItems;
      // the loop should be in layer to match select / unselect API
      items.forEach(function (item) {
        layer.edit(item, e.dx, e.dy, _this3.currentTarget);
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
}(BaseState);

// @TODO handle theme `BaseController.theme`


var Breakpoint = function (_BaseController) {
  (0, _inherits3.default)(Breakpoint, _BaseController);

  function Breakpoint(legend) {
    var defaultDots = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
    var $container = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
    var callback = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];
    (0, _classCallCheck3.default)(this, Breakpoint);

    var _this4 = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Breakpoint).call(this));

    _this4.type = 'breakpoint';
    _this4.legend = legend;

    _this4.dots = defaultDots;

    (0, _get3.default)((0, _getPrototypeOf2.default)(Breakpoint.prototype), '_applyOptionnalParameters', _this4).call(_this4, $container, callback);
    return _this4;
  }

  (0, _createClass3.default)(Breakpoint, [{
    key: 'render',
    value: function render() {
      var content = '\n      <span class="legend">' + this.legend + '</span>\n      <div class="inner-wrapper timeline"></div>\n    ';

      var height = 300;

      this.$el = (0, _get3.default)((0, _getPrototypeOf2.default)(Breakpoint.prototype), 'render', this).call(this);
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
      (0, _get3.default)((0, _getPrototypeOf2.default)(Breakpoint.prototype), 'onResize', this).call(this);

      var width = this.$track.getBoundingClientRect().width;
      this.timeline.visibleWidth = width;
      this.timeline.pixelsPerSecond = width;
      this.timeline.tracks.update();
    }
  }, {
    key: 'bindEvents',
    value: function bindEvents() {
      var _this5 = this;

      this.timeline.on('update', function () {
        _this5.emit('change', _this5.dots);
      });
    }
  }]);
  return Breakpoint;
}(BaseController);

module.exports = Breakpoint;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJyZWFrcG9pbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJQSxJQUFNLFdBQVcsUUFBUSw2QkFBUixDQUFYO0FBQ04sSUFBTSxRQUFRLFFBQVEsMEJBQVIsQ0FBUjtBQUNOLElBQU0sbUJBQW1CLFFBQVEsdUNBQVIsQ0FBbkI7QUFDTixJQUFNLE9BQU8sUUFBUSwyQkFBUixDQUFQO0FBQ04sSUFBTSxNQUFNLFFBQVEsMEJBQVIsQ0FBTjtBQUNOLElBQU0scUJBQXFCLFFBQVEsNkNBQVIsQ0FBckI7QUFDTixJQUFNLFlBQVksUUFBUSxpQ0FBUixDQUFaO0FBQ04sSUFBTSxpQkFBaUIsUUFBUSxtQkFBUixDQUFqQjs7OztJQUdBOzs7QUFDSixXQURJLGVBQ0osQ0FBWSxRQUFaLEVBQXNCO3dDQURsQixpQkFDa0I7OzZGQURsQiw0QkFFSSxXQURjOztBQUdwQixVQUFLLGtCQUFMLEdBQTBCLElBQTFCLENBSG9CO0FBSXBCLFVBQUssYUFBTCxHQUFxQixJQUFyQixDQUpvQjs7R0FBdEI7OzZCQURJOzs0QkFRSTs7OzJCQUNEOzs7Z0NBRUssR0FBRztBQUNiLGNBQVEsRUFBRSxJQUFGO0FBQ04sYUFBSyxXQUFMO0FBQ0UsZUFBSyxXQUFMLENBQWlCLENBQWpCLEVBREY7QUFFRSxnQkFGRjtBQURGLGFBSU8sV0FBTDtBQUNFLGVBQUssV0FBTCxDQUFpQixDQUFqQixFQURGO0FBRUUsZ0JBRkY7QUFKRixhQU9PLFNBQUw7QUFDRSxlQUFLLFNBQUwsQ0FBZSxDQUFmLEVBREY7QUFFRSxnQkFGRjtBQVBGLE9BRGE7Ozs7Z0NBY0gsR0FBRzs7O0FBQ2IsV0FBSyxTQUFMLEdBQWlCLElBQWpCOztBQURhLFVBR2IsQ0FBSyxhQUFMLEdBQXFCLEVBQUUsTUFBRixDQUhSOztBQUtiLFdBQUssTUFBTCxDQUFZLE9BQVosQ0FBb0IsVUFBQyxLQUFELEVBQVc7QUFDN0IsY0FBTSxRQUFOLEdBRDZCO0FBRTdCLFlBQU0sT0FBTyxNQUFNLHFCQUFOLENBQTRCLEVBQUUsTUFBRixDQUFuQyxDQUZ1Qjs7QUFJN0IsWUFBSSxTQUFTLElBQVQsRUFBZTs7QUFFakIsY0FBTSxRQUFRLENBQ1osRUFBRSxDQUFGLEdBQU0sT0FBSyxRQUFMLENBQWMsWUFBZCxFQUNOLElBQUssRUFBRSxDQUFGLEdBQU0sTUFBTSxNQUFOLENBQWEsTUFBYixDQUZQLENBRlc7O0FBT2pCLGdCQUFNLElBQU4sQ0FBVyxJQUFYLENBQWdCLEtBQWhCLEVBUGlCOztBQVNqQixpQkFBSyxRQUFMLENBQWMsTUFBZCxDQUFxQixNQUFyQixHQVRpQjtBQVVqQixpQkFBSyxRQUFMLENBQWMsTUFBZCxDQUFxQixNQUFyQixHQVZpQjtTQUFuQixNQVdPOztBQUVMLGNBQUksRUFBRSxhQUFGLENBQWdCLFFBQWhCLEVBQTBCO0FBQzVCLGdCQUFNLE9BQU8sTUFBTSxJQUFOLENBRGU7QUFFNUIsZ0JBQU0sU0FBUSxNQUFNLGdCQUFOLENBQXVCLElBQXZCLENBQVIsQ0FGc0I7QUFHNUIsaUJBQUssTUFBTCxDQUFZLEtBQUssT0FBTCxDQUFhLE1BQWIsQ0FBWixFQUFpQyxDQUFqQyxFQUg0Qjs7QUFLNUIsbUJBQUssUUFBTCxDQUFjLE1BQWQsQ0FBcUIsTUFBckIsR0FMNEI7QUFNNUIsbUJBQUssUUFBTCxDQUFjLE1BQWQsQ0FBcUIsTUFBckIsR0FONEI7V0FBOUIsTUFPTztBQUNMLG1CQUFLLGtCQUFMLEdBQTBCLEtBQTFCLENBREs7QUFFTCxrQkFBTSxNQUFOLENBQWEsSUFBYixFQUZLO1dBUFA7U0FiRjtPQUprQixDQUFwQixDQUxhOzs7O2dDQXFDSCxHQUFHOzs7QUFDYixVQUFJLENBQUMsS0FBSyxTQUFMLElBQWtCLENBQUMsS0FBSyxrQkFBTCxFQUF5QjtBQUFFLGVBQUY7T0FBakQ7O0FBRUEsVUFBTSxRQUFRLEtBQUssa0JBQUwsQ0FIRDtBQUliLFVBQU0sUUFBUSxNQUFNLGFBQU47O0FBSkQsV0FNYixDQUFNLE9BQU4sQ0FBYyxVQUFDLElBQUQsRUFBVTtBQUN0QixjQUFNLElBQU4sQ0FBVyxJQUFYLEVBQWlCLEVBQUUsRUFBRixFQUFNLEVBQUUsRUFBRixFQUFNLE9BQUssYUFBTCxDQUE3QixDQURzQjtPQUFWLENBQWQsQ0FOYTs7QUFVYixZQUFNLE1BQU4sQ0FBYSxLQUFiLEVBVmE7Ozs7OEJBYUwsR0FBRztBQUNYLFdBQUssa0JBQUwsR0FBMEIsSUFBMUIsQ0FEVztBQUVYLFdBQUssU0FBTCxHQUFpQixLQUFqQixDQUZXOzs7U0EzRVQ7RUFBd0I7Ozs7O0lBa0Z4Qjs7O0FBQ0osV0FESSxVQUNKLENBQVksTUFBWixFQUEwRTtRQUF0RCxvRUFBYyxrQkFBd0M7UUFBcEMsbUVBQWEsb0JBQXVCO1FBQWpCLGlFQUFXLG9CQUFNO3dDQUR0RSxZQUNzRTs7OEZBRHRFLHdCQUNzRTs7QUFFeEUsV0FBSyxJQUFMLEdBQVksWUFBWixDQUZ3RTtBQUd4RSxXQUFLLE1BQUwsR0FBYyxNQUFkLENBSHdFOztBQUt4RSxXQUFLLElBQUwsR0FBWSxXQUFaLENBTHdFOztBQU94RSxxREFSRSx5RUFROEIsWUFBWSxTQUE1QyxDQVB3RTs7R0FBMUU7OzZCQURJOzs2QkFXSztBQUNQLFVBQUksNENBQ3FCLEtBQUssTUFBTCxvRUFEckIsQ0FERzs7QUFNUCxVQUFNLFNBQVMsR0FBVCxDQU5DOztBQVFQLFdBQUssR0FBTCxvREFuQkUsaURBbUJGLENBUk87QUFTUCxXQUFLLEdBQUwsQ0FBUyxTQUFULENBQW1CLEdBQW5CLENBQXVCLEtBQUssSUFBTCxDQUF2QixDQVRPO0FBVVAsV0FBSyxHQUFMLENBQVMsU0FBVCxHQUFxQixPQUFyQixDQVZPOztBQVlQLFdBQUssTUFBTCxHQUFjLEtBQUssR0FBTCxDQUFTLGFBQVQsQ0FBdUIsV0FBdkIsQ0FBZDs7QUFaTyxVQWNQLENBQUssUUFBTCxHQUFnQixJQUFJLFFBQUosRUFBaEIsQ0FkTztBQWVQLFdBQUssUUFBTCxDQUFjLFdBQWQsQ0FBMEIsS0FBSyxNQUFMLEVBQWEsTUFBdkMsRUFBK0MsTUFBL0MsRUFmTzs7QUFpQlAsVUFBTSx3QkFBd0IsSUFBSSxnQkFBSixDQUFxQixLQUFLLFFBQUwsQ0FBYyxXQUFkLENBQTdDLENBakJDO0FBa0JQLFdBQUssZUFBTCxHQUF1QixJQUFJLEtBQUosQ0FBVSxZQUFWLEVBQXdCLEtBQUssSUFBTCxFQUFXLEVBQUUsUUFBUSxNQUFSLEVBQXJDLENBQXZCLENBbEJPO0FBbUJQLFdBQUssZUFBTCxDQUFxQixjQUFyQixDQUFvQyxxQkFBcEMsRUFuQk87O0FBcUJQLFVBQU0sYUFBYSxTQUFiLFVBQWEsQ0FBQyxDQUFELEVBQWlCO1lBQWIsMERBQUksb0JBQVM7O0FBQ2xDLFlBQUksTUFBTSxJQUFOLEVBQVk7QUFBRSxZQUFFLENBQUYsSUFBTyxDQUFQLENBQUY7U0FBaEI7QUFDQSxlQUFPLEVBQUUsQ0FBRixDQUFQLENBRmtDO09BQWpCLENBckJaOztBQTBCUCxVQUFNLGFBQWEsU0FBYixVQUFhLENBQUMsQ0FBRCxFQUFpQjtZQUFiLDBEQUFJLG9CQUFTOztBQUNsQyxZQUFJLE1BQU0sSUFBTixFQUFZO0FBQUUsWUFBRSxDQUFGLElBQU8sQ0FBUCxDQUFGO1NBQWhCO0FBQ0EsZUFBTyxFQUFFLENBQUYsQ0FBUCxDQUZrQztPQUFqQixDQTFCWjs7QUErQlAsV0FBSyxlQUFMLENBQXFCLGNBQXJCLENBQW9DLEdBQXBDLEVBQXlDO0FBQ3ZDLGVBQU8sZUFBQyxDQUFEO2lCQUFPO1NBQVA7QUFDUCxZQUFJLFVBQUo7QUFDQSxZQUFJLFVBQUo7T0FIRixFQS9CTzs7QUFxQ1AsV0FBSyxlQUFMLENBQXFCLG9CQUFyQixDQUEwQyxJQUExQyxFQUFnRDtBQUM5QyxZQUFJLFVBQUo7QUFDQSxZQUFJLFVBQUo7T0FGRixFQUdHO0FBQ0QsZUFBTyxTQUFQO09BSkYsRUFyQ087O0FBNENQLFdBQUssZUFBTCxDQUFxQixXQUFyQixDQUFpQyxJQUFJLGtCQUFKLEVBQWpDOzs7QUE1Q08sVUErQ1AsQ0FBSyxlQUFMLENBQXFCLEVBQXJCLENBQXdCLE1BQXhCLEVBQWdDLFVBQVMsS0FBVCxFQUFnQixLQUFoQixFQUF1QjtBQUNyRCxjQUFNLENBQU4sSUFBVyxLQUFLLEdBQUwsQ0FBUyxDQUFULEVBQVksS0FBSyxHQUFMLENBQVMsTUFBTSxDQUFOLENBQVQsRUFBbUIsQ0FBbkIsQ0FBWixDQUFYLENBRHFEO0FBRXJELGNBQU0sQ0FBTixJQUFXLEtBQUssR0FBTCxDQUFTLENBQVQsRUFBWSxLQUFLLEdBQUwsQ0FBUyxNQUFNLENBQU4sQ0FBVCxFQUFtQixDQUFuQixDQUFaLENBQVgsQ0FGcUQ7T0FBdkIsQ0FBaEMsQ0EvQ087O0FBb0RQLFdBQUssUUFBTCxDQUFjLFFBQWQsQ0FBdUIsS0FBSyxlQUFMLEVBQXNCLE1BQTdDLEVBcERPOztBQXNEUCxXQUFLLFFBQUwsQ0FBYyxNQUFkLENBQXFCLE1BQXJCLEdBdERPO0FBdURQLFdBQUssUUFBTCxDQUFjLE1BQWQsQ0FBcUIsTUFBckIsR0F2RE87O0FBeURQLFdBQUssUUFBTCxDQUFjLEtBQWQsR0FBc0IsSUFBSSxlQUFKLENBQW9CLEtBQUssUUFBTCxDQUExQyxDQXpETzs7QUEyRFAsV0FBSyxVQUFMLEdBM0RPOztBQTZEUCxhQUFPLEtBQUssR0FBTCxDQTdEQTs7OzsrQkFnRUU7QUFDVCx1REE1RUUsbURBNEVGLENBRFM7O0FBR1QsVUFBTSxRQUFRLEtBQUssTUFBTCxDQUFZLHFCQUFaLEdBQW9DLEtBQXBDLENBSEw7QUFJVCxXQUFLLFFBQUwsQ0FBYyxZQUFkLEdBQTZCLEtBQTdCLENBSlM7QUFLVCxXQUFLLFFBQUwsQ0FBYyxlQUFkLEdBQWdDLEtBQWhDLENBTFM7QUFNVCxXQUFLLFFBQUwsQ0FBYyxNQUFkLENBQXFCLE1BQXJCLEdBTlM7Ozs7aUNBU0U7OztBQUNYLFdBQUssUUFBTCxDQUFjLEVBQWQsQ0FBaUIsUUFBakIsRUFBMkIsWUFBTTtBQUFFLGVBQUssSUFBTCxDQUFVLFFBQVYsRUFBb0IsT0FBSyxJQUFMLENBQXBCLENBQUY7T0FBTixDQUEzQixDQURXOzs7U0FwRlQ7RUFBbUI7O0FBeUZ6QixPQUFPLE9BQVAsR0FBaUIsVUFBakIiLCJmaWxlIjoiYnJlYWtwb2ludC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogTm90IGV4cG9zZWQgYW55bW9yZSwgc2hvdWxkIGJlIGhhbmRsZWQgYXMgYSBwbHVnaW4gb3Igc29tZXRoaW5nLlxuICogd2F2ZXMtdWkgZGVwZW5kZWNpZXMgaXMgdG9vIGhlYXZ5IGZvciBhIHVzZS1jYXNlIHRoYXQgaXMgbm90IHByb3ZlblxuICovXG5jb25zdCBUaW1lbGluZSA9IHJlcXVpcmUoJ3dhdmVzLXVpL2Rpc3QvY29yZS90aW1lbGluZScpO1xuY29uc3QgTGF5ZXIgPSByZXF1aXJlKCd3YXZlcy11aS9kaXN0L2NvcmUvbGF5ZXInKTtcbmNvbnN0IExheWVyVGltZUNvbnRleHQgPSByZXF1aXJlKCd3YXZlcy11aS9kaXN0L2NvcmUvbGF5ZXItdGltZS1jb250ZXh0Jyk7XG5jb25zdCBMaW5lID0gcmVxdWlyZSgnd2F2ZXMtdWkvZGlzdC9zaGFwZXMvbGluZScpO1xuY29uc3QgRG90ID0gcmVxdWlyZSgnd2F2ZXMtdWkvZGlzdC9zaGFwZXMvZG90Jyk7XG5jb25zdCBCcmVha3BvaW50QmVoYXZpb3IgPSByZXF1aXJlKCd3YXZlcy11aS9kaXN0L2JlaGF2aW9ycy9icmVha3BvaW50LWJlaGF2aW9yJyk7XG5jb25zdCBCYXNlU3RhdGUgPSByZXF1aXJlKCd3YXZlcy11aS9kaXN0L3N0YXRlcy9iYXNlLXN0YXRlJyk7XG5jb25zdCBCYXNlQ29udHJvbGxlciA9IHJlcXVpcmUoJy4vYmFzZS1jb250cm9sbGVyJyk7XG5cbi8vIG1pbWljIG1heCBgZnVuY3Rpb25gIGludGVyYWN0aW9uc1xuY2xhc3MgQnJlYWtwb2ludFN0YXRlIGV4dGVuZHMgQmFzZVN0YXRlIHtcbiAgY29uc3RydWN0b3IodGltZWxpbmUpIHtcbiAgICBzdXBlcih0aW1lbGluZSk7XG5cbiAgICB0aGlzLmN1cnJlbnRFZGl0ZWRMYXllciA9IG51bGw7XG4gICAgdGhpcy5jdXJyZW50VGFyZ2V0ID0gbnVsbDtcbiAgfVxuXG4gIGVudGVyKCkge31cbiAgZXhpdCgpIHt9XG5cbiAgaGFuZGxlRXZlbnQoZSkge1xuICAgIHN3aXRjaCAoZS50eXBlKSB7XG4gICAgICBjYXNlICdtb3VzZWRvd24nOlxuICAgICAgICB0aGlzLm9uTW91c2VEb3duKGUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ21vdXNlbW92ZSc6XG4gICAgICAgIHRoaXMub25Nb3VzZU1vdmUoZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnbW91c2V1cCc6XG4gICAgICAgIHRoaXMub25Nb3VzZVVwKGUpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBvbk1vdXNlRG93bihlKSB7XG4gICAgdGhpcy5tb3VzZURvd24gPSB0cnVlO1xuICAgIC8vIGtlZXAgdGFyZ2V0IGNvbnNpc3RlbnQgd2l0aCBtb3VzZSBkb3duXG4gICAgdGhpcy5jdXJyZW50VGFyZ2V0ID0gZS50YXJnZXQ7XG5cbiAgICB0aGlzLmxheWVycy5mb3JFYWNoKChsYXllcikgPT4ge1xuICAgICAgbGF5ZXIudW5zZWxlY3QoKTtcbiAgICAgIGNvbnN0IGl0ZW0gPSBsYXllci5nZXRJdGVtRnJvbURPTUVsZW1lbnQoZS50YXJnZXQpO1xuXG4gICAgICBpZiAoaXRlbSA9PT0gbnVsbCkge1xuICAgICAgICAvLyBjcmVhdGUgYW4gaXRlbVxuICAgICAgICBjb25zdCBkYXR1bSA9IFtcbiAgICAgICAgICBlLnggLyB0aGlzLnRpbWVsaW5lLnZpc2libGVXaWR0aCxcbiAgICAgICAgICAxIC0gKGUueSAvIGxheWVyLnBhcmFtcy5oZWlnaHQpXG4gICAgICAgIF07XG5cbiAgICAgICAgbGF5ZXIuZGF0YS5wdXNoKGRhdHVtKTtcblxuICAgICAgICB0aGlzLnRpbWVsaW5lLnRyYWNrcy5yZW5kZXIoKTtcbiAgICAgICAgdGhpcy50aW1lbGluZS50cmFja3MudXBkYXRlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBpZiBzaGlmdCBpcyBwcmVzc2VkLCByZW1vdmUgdGhlIGl0ZW1cbiAgICAgICAgaWYgKGUub3JpZ2luYWxFdmVudC5zaGlmdEtleSkge1xuICAgICAgICAgIGNvbnN0IGRhdGEgPSBsYXllci5kYXRhO1xuICAgICAgICAgIGNvbnN0IGRhdHVtID0gbGF5ZXIuZ2V0RGF0dW1Gcm9tSXRlbShpdGVtKTtcbiAgICAgICAgICBkYXRhLnNwbGljZShkYXRhLmluZGV4T2YoZGF0dW0pLCAxKTtcblxuICAgICAgICAgIHRoaXMudGltZWxpbmUudHJhY2tzLnJlbmRlcigpO1xuICAgICAgICAgIHRoaXMudGltZWxpbmUudHJhY2tzLnVwZGF0ZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuY3VycmVudEVkaXRlZExheWVyID0gbGF5ZXI7XG4gICAgICAgICAgbGF5ZXIuc2VsZWN0KGl0ZW0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBvbk1vdXNlTW92ZShlKSB7XG4gICAgaWYgKCF0aGlzLm1vdXNlRG93biB8fMKgIXRoaXMuY3VycmVudEVkaXRlZExheWVyKSB7IHJldHVybjsgfVxuXG4gICAgY29uc3QgbGF5ZXIgPSB0aGlzLmN1cnJlbnRFZGl0ZWRMYXllcjtcbiAgICBjb25zdCBpdGVtcyA9IGxheWVyLnNlbGVjdGVkSXRlbXM7XG4gICAgLy8gdGhlIGxvb3Agc2hvdWxkIGJlIGluIGxheWVyIHRvIG1hdGNoIHNlbGVjdCAvIHVuc2VsZWN0IEFQSVxuICAgIGl0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGxheWVyLmVkaXQoaXRlbSwgZS5keCwgZS5keSwgdGhpcy5jdXJyZW50VGFyZ2V0KTtcbiAgICB9KTtcblxuICAgIGxheWVyLnVwZGF0ZShpdGVtcyk7XG4gIH1cblxuICBvbk1vdXNlVXAoZSkge1xuICAgIHRoaXMuY3VycmVudEVkaXRlZExheWVyID0gbnVsbDtcbiAgICB0aGlzLm1vdXNlRG93biA9IGZhbHNlO1xuICB9XG59XG5cbi8vIEBUT0RPIGhhbmRsZSB0aGVtZSBgQmFzZUNvbnRyb2xsZXIudGhlbWVgXG5jbGFzcyBCcmVha3BvaW50IGV4dGVuZHMgQmFzZUNvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3RvcihsZWdlbmQsIGRlZmF1bHREb3RzID0gW10sICRjb250YWluZXIgPSBudWxsLCBjYWxsYmFjayA9IG51bGwpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMudHlwZSA9ICdicmVha3BvaW50JztcbiAgICB0aGlzLmxlZ2VuZCA9IGxlZ2VuZDtcblxuICAgIHRoaXMuZG90cyA9IGRlZmF1bHREb3RzO1xuXG4gICAgc3VwZXIuX2FwcGx5T3B0aW9ubmFsUGFyYW1ldGVycygkY29udGFpbmVyLCBjYWxsYmFjayk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgbGV0IGNvbnRlbnQgPSBgXG4gICAgICA8c3BhbiBjbGFzcz1cImxlZ2VuZFwiPiR7dGhpcy5sZWdlbmR9PC9zcGFuPlxuICAgICAgPGRpdiBjbGFzcz1cImlubmVyLXdyYXBwZXIgdGltZWxpbmVcIj48L2Rpdj5cbiAgICBgO1xuXG4gICAgY29uc3QgaGVpZ2h0ID0gMzAwO1xuXG4gICAgdGhpcy4kZWwgPSBzdXBlci5yZW5kZXIoKTtcbiAgICB0aGlzLiRlbC5jbGFzc0xpc3QuYWRkKHRoaXMudHlwZSk7XG4gICAgdGhpcy4kZWwuaW5uZXJIVE1MID0gY29udGVudDtcblxuICAgIHRoaXMuJHRyYWNrID0gdGhpcy4kZWwucXVlcnlTZWxlY3RvcignLnRpbWVsaW5lJyk7XG4gICAgLy8gY3JlYXRlIGEgdGltZWxpbmUgd2l0aCBhIGJyZWFrcG9pbnQgZnVuY3Rpb25cbiAgICB0aGlzLnRpbWVsaW5lID0gbmV3IFRpbWVsaW5lKCk7XG4gICAgdGhpcy50aW1lbGluZS5jcmVhdGVUcmFjayh0aGlzLiR0cmFjaywgaGVpZ2h0LCAnbWFpbicpO1xuXG4gICAgY29uc3QgYnJlYWtwb2ludFRpbWVDb250ZXh0ID0gbmV3IExheWVyVGltZUNvbnRleHQodGhpcy50aW1lbGluZS50aW1lQ29udGV4dCk7XG4gICAgdGhpcy5icmVha3BvaW50TGF5ZXIgPSBuZXcgTGF5ZXIoJ2NvbGxlY3Rpb24nLCB0aGlzLmRvdHMsIHsgaGVpZ2h0OiBoZWlnaHQgfSk7XG4gICAgdGhpcy5icmVha3BvaW50TGF5ZXIuc2V0VGltZUNvbnRleHQoYnJlYWtwb2ludFRpbWVDb250ZXh0KTtcblxuICAgIGNvbnN0IGN4QWNjZXNzb3IgPSAoZCwgdiA9IG51bGwpID0+IHtcbiAgICAgIGlmICh2ICE9PSBudWxsKSB7IGRbMF0gPSB2OyB9XG4gICAgICByZXR1cm4gZFswXTtcbiAgICB9O1xuXG4gICAgY29uc3QgY3lBY2Nlc3NvciA9IChkLCB2ID0gbnVsbCkgPT4ge1xuICAgICAgaWYgKHYgIT09IG51bGwpIHsgZFsxXSA9IHY7IH1cbiAgICAgIHJldHVybiBkWzFdO1xuICAgIH07XG5cbiAgICB0aGlzLmJyZWFrcG9pbnRMYXllci5jb25maWd1cmVTaGFwZShEb3QsIHtcbiAgICAgIGNvbG9yOiAoZCkgPT4gJyNmZmZmZmYnLFxuICAgICAgY3g6IGN4QWNjZXNzb3IsXG4gICAgICBjeTogY3lBY2Nlc3NvclxuICAgIH0pO1xuXG4gICAgdGhpcy5icmVha3BvaW50TGF5ZXIuY29uZmlndXJlQ29tbW9uU2hhcGUoTGluZSwge1xuICAgICAgY3g6IGN4QWNjZXNzb3IsXG4gICAgICBjeTogY3lBY2Nlc3NvclxuICAgIH0sIHtcbiAgICAgIGNvbG9yOiAnI2ZmZmZmZidcbiAgICB9KTtcblxuICAgIHRoaXMuYnJlYWtwb2ludExheWVyLnNldEJlaGF2aW9yKG5ldyBCcmVha3BvaW50QmVoYXZpb3IoKSk7XG5cbiAgICAvLyBjbGFtcCBkb3QgeCAvIHkgdmFsdWVzXG4gICAgdGhpcy5icmVha3BvaW50TGF5ZXIub24oJ2VkaXQnLCBmdW5jdGlvbihzaGFwZSwgZGF0dW0pIHtcbiAgICAgIGRhdHVtWzBdID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oZGF0dW1bMF0sIDEpKTtcbiAgICAgIGRhdHVtWzFdID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oZGF0dW1bMV0sIDEpKTtcbiAgICB9KTtcblxuICAgIHRoaXMudGltZWxpbmUuYWRkTGF5ZXIodGhpcy5icmVha3BvaW50TGF5ZXIsICdtYWluJyk7XG5cbiAgICB0aGlzLnRpbWVsaW5lLnRyYWNrcy5yZW5kZXIoKTtcbiAgICB0aGlzLnRpbWVsaW5lLnRyYWNrcy51cGRhdGUoKTtcblxuICAgIHRoaXMudGltZWxpbmUuc3RhdGUgPSBuZXcgQnJlYWtwb2ludFN0YXRlKHRoaXMudGltZWxpbmUpO1xuXG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XG5cbiAgICByZXR1cm4gdGhpcy4kZWw7XG4gIH1cblxuICBvblJlc2l6ZSgpIHtcbiAgICBzdXBlci5vblJlc2l6ZSgpO1xuXG4gICAgY29uc3Qgd2lkdGggPSB0aGlzLiR0cmFjay5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcbiAgICB0aGlzLnRpbWVsaW5lLnZpc2libGVXaWR0aCA9IHdpZHRoO1xuICAgIHRoaXMudGltZWxpbmUucGl4ZWxzUGVyU2Vjb25kID0gd2lkdGg7XG4gICAgdGhpcy50aW1lbGluZS50cmFja3MudXBkYXRlKCk7XG4gIH1cblxuICBiaW5kRXZlbnRzKCkge1xuICAgIHRoaXMudGltZWxpbmUub24oJ3VwZGF0ZScsICgpID0+IHsgdGhpcy5lbWl0KCdjaGFuZ2UnLCB0aGlzLmRvdHMpOyB9KTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEJyZWFrcG9pbnQ7XG4iXX0=