const Timeline = require('waves-ui/dist/core/timeline');
const Layer = require('waves-ui/dist/core/layer');
const TimeContext = require('waves-ui/dist/core/time-context');
const Line = require('waves-ui/dist/shapes/line');
const Dot = require('waves-ui/dist/shapes/dot');
const BreakpointBehavior = require('waves-ui/dist/behaviors/breakpoint-behavior');

const BaseState = require('waves-ui/dist/timeline-states/base-state');
const EditionState = require('waves-ui/dist/timeline-states/edition-state');

const BaseController = require('./base-controller');

// mimic max `function` interactions
class BreakpointState extends BaseState {
  constructor(timeline) {
    super(timeline);

    this.currentEditedLayer = null;
    this.currentTarget = null;
  }

  enter() {}
  exit() {}

  handleEvent(e) {
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

  onMouseDown(e) {
    this.mouseDown = true;
    // keep target consistent with mouse down
    // @NOTE: move this to Surface ?
    this.currentTarget = e.target;

    this.layers.forEach((layer) => {
      layer.unselect(layer.items.nodes());
      const item = layer.hasItem(e.target);

      if (item === null) {
        // create an item
        const datum = [
          e.x / this.timeline.width,
          1 - (e.y / layer.params.height)
        ];

        layer.data.push(datum);

        this.timeline.draw();
        this.timeline.update();
      } else {
        // if shift is pressed, remove the item
        if (e.originalEvent.shiftKey) {
          const data = layer.data;
          data.splice(data.indexOf(item.datum()), 1);

          this.timeline.draw();
          this.timeline.update();
        } else {
          this.currentEditedLayer = layer;
          layer.select(item.node());
        }
      }
    });
  }

  onMouseMove(e) {
    if (!this.mouseDown || !this.currentEditedLayer) { return; }

    const layer = this.currentEditedLayer;
    const items = layer.selectedItems;
    // the loop should be in layer to match select / unselect API
    items.forEach((item) => {
      layer.edit(item, e.dx, e.dy, this.currentTarget);
    });

    layer.update(items);
  }

  onMouseUp(e) {
    this.currentEditedLayer = null;
    this.mouseDown = false;
  }
}


class Breakpoint extends BaseController {
  constructor(legend, defaultDots = [], $container = null, callback = null) {
    super();
    this.type = 'breakpoint';
    this.legend = legend;

    this.dots = defaultDots;
    // console.log(this.dots);

    super._applyOptionnalParameters($container, callback);
  }

  render() {
    let content = `
      <span class="legend">${this.legend}</span>
      <div class="inner-wrapper timeline"></div>
    `;

    this.$el = super.render();
    this.$el.classList.add(this.type);
    this.$el.innerHTML = content;

    this.$timeline = this.$el.querySelector('.timeline');
    // create a timeline with a breakpoint function
    this.timeline = new Timeline({ duration: 1 });
    this.timeline.registerContainer('main', this.$timeline, { height: 300 });

    const breakpointTimeContext = new TimeContext(this.timeline.timeContext);
    this.breakpointLayer = new Layer('collection', this.dots, { height: 300 });
    this.breakpointLayer.setTimeContext(breakpointTimeContext);

    this.breakpointLayer.configureShape(Dot, {
      color: (d) => '#ffffff',
      cx: (d, v = null) => {
        if (v !== null) { d[0] = v; }
        return d[0];
      },
      cy: (d, v = null) => {
        if (v !== null) { d[1] = v; }
        return d[1];
      }
    });

    this.breakpointLayer.configureCommonShape(Line, {
      cx: (d, v = null) => {
        if (v !== null) { d[0] = v; }
        return d[0];
      },
      cy: (d, v = null) => {
        if (v !== null) { d[1] = v; }
        return d[1];
      }
    }, {
      color: '#ffffff'
    });

    this.breakpointLayer.setBehavior(new BreakpointBehavior());

    // clamp dot x / y values
    this.breakpointLayer.on('edit', function(shape, datum) {
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

  onResize() {
    super.onResize();

    const width = this.$timeline.getBoundingClientRect().width;
    this.timeline.width = width;
    this.timeline.update();
  }

  bindEvents() {
    this.timeline.on('update', () => { this.emit('change', this.dots); });
  }
}

module.exports = Breakpoint;
