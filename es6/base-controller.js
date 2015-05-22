const events = require('events');
const styles = require('./utils/styles');
// store all instance in a stack
const stack = new Set();

// add a single listener on window to trigger update
window.addEventListener('resize', function() {
  stack.forEach((controller) => controller.onResize());
});

class BaseController extends events.EventEmitter {
  constructor() {
    super();
    stack.add(this);
  }

  _applyOptionnalParameters($container = null, callback = null) {
    if ($container) {
      if (typeof $container === 'string') {
        $container = document.querySelector($container);
      }

      $container.appendChild(this.render());
    }

    if (callback) { this.on('change', callback); }
  }

  render() {
    this.$el = document.createElement('label');
    this.$el.classList.add(styles.ns);
    this.onResize();

    return this.$el;
  }

  onResize() {
    const boundingRect = this.$el.getBoundingClientRect();
    const width = boundingRect.width;
    const method = width > 600 ? 'remove' : 'add';

    this.$el.classList[method]('small');
  }

  /**
   *  Interface
   */
  bindEvents() {}
}

module.exports = BaseController;
