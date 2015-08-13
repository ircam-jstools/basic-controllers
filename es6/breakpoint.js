const Timeline = require('waves-ui/dist/core/timeline');
const Layer = require('waves-ui/dist/core/layer');
const LayerTimeContext = require('waves-ui/dist/core/layer-time-context');
const Line = require('waves-ui/dist/shapes/line');
const Dot = require('waves-ui/dist/shapes/dot');
const BreakpointBehavior = require('waves-ui/dist/behaviors/breakpoint-behavior');
const BaseState = require('waves-ui/dist/states/base-state');

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
    this.currentTarget = e.target;

    this.layers.forEach((layer) => {
      layer.unselect();
      const item = layer.getItemFromDOMElement(e.target);

      if (item === null) {
        // create an item
        const datum = [
          e.x / this.timeline.visibleWidth,
          1 - (e.y / layer.params.height)
        ];

        layer.data.push(datum);

        this.timeline.tracks.render();
        this.timeline.tracks.update();
      } else {
        // if shift is pressed, remove the item
        if (e.originalEvent.shiftKey) {
          const data = layer.data;
          const datum = layer.getDatumFromItem(item);
          data.splice(data.indexOf(datum), 1);

          this.timeline.tracks.render();
          this.timeline.tracks.update();
        } else {
          this.currentEditedLayer = layer;
          layer.select(item);
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

// @TODO handle theme `BaseController.theme`
class Breakpoint extends BaseController {
  constructor(legend, defaultDots = [], $container = null, callback = null) {
    super();
    this.type = 'breakpoint';
    this.legend = legend;

    this.dots = defaultDots;

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
    this.timeline = new Timeline();
    const track = this.timeline.createTrack(this.$timeline, 300, 'main');

    const breakpointTimeContext = new LayerTimeContext(this.timeline.timeContext);
    this.breakpointLayer = new Layer('collection', this.dots, { height: 300 });
    this.breakpointLayer.setTimeContext(breakpointTimeContext);

    const cxAccessor = (d, v = null) => {
      if (v !== null) { d[0] = v; }
      return d[0];
    };

    const cyAccessor = (d, v = null) => {
      if (v !== null) { d[1] = v; }
      return d[1];
    };

    this.breakpointLayer.configureShape(Dot, {
      color: (d) => '#ffffff',
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
    this.breakpointLayer.on('edit', function(shape, datum) {
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

  onResize() {
    super.onResize();

    const width = this.$timeline.getBoundingClientRect().width;
    this.timeline.visibleWidth = width;
    this.timeline.pixelsPerSecond = width;
    this.timeline.tracks.update();
  }

  bindEvents() {
    this.timeline.on('update', () => { this.emit('change', this.dots); });
  }
}

module.exports = Breakpoint;
