const events = require('events');
const styles = require('./utils/styles');
// store all instance in a stack
const stack = new Set();
let theme;
// add a single listener on window to trigger update
window.addEventListener('resize', function() {
  stack.forEach((controller) => controller._onResize());
});

class BaseController extends events.EventEmitter {
  constructor() {
    super();
    // insert style sheet on first controller created
    if (stack.size === 0) { styles.insertStyleSheet(); }
    stack.add(this);
  }

  static set theme(value) {
    stack.forEach((controller) => controller.$el.classList.remove(theme));
    theme = value;
    stack.forEach((controller) => controller.$el.classList.add(theme));
  }

  _applyOptionnalParameters($container = null, callback = null) {
    if ($container) {
      if (typeof $container === 'string') {
        $container = document.querySelector($container);
      }

      $container.appendChild(this.render());
      setTimeout(() => this._onResize(), 0);
    }

    if (callback) { this.on('change', callback); }
  }

  render() {
    this.$el = document.createElement('label', theme);
    this.$el.classList.add(styles.ns);

    return this.$el;
  }

  _onResize() {
    const boundingRect = this.$el.getBoundingClientRect();
    const width = boundingRect.width;
    let method = width > 600 ? 'remove' : 'add';

    this.$el.classList[method]('small');
  }

  /**
   *  Interface
   */
  bindEvents() {}
}

// default theme to `light`
BaseController.theme = 'light';

module.exports = BaseController;
