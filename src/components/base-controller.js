import events from 'events';
import * as styles from '../utils/styles';
// store all instance in a stack
const stack = new Set();
let theme = 'light';

// add a single listener on window to trigger update
window.addEventListener('resize', function() {
  stack.forEach((controller) => controller.onResize());
});

export default class BaseController extends events.EventEmitter {
  constructor() {
    super();

    if (stack.size === 0) {
      styles.insertStyleSheet();
    }

    stack.add(this);
  }

  static set theme(value) {
    stack.forEach((controller) => controller.$el.classList.remove(theme));
    theme = value;
    stack.forEach((controller) => controller.$el.classList.add(theme));
  }

  static get theme() {
    return theme;
  }

  _applyOptionnalParameters($container = null, callback = null) {
    if ($container) {
      if (typeof $container === 'string') {
        $container = document.querySelector($container);
      }

      $container.appendChild(this.render());
      this.onRender();
    }

    if (callback) { this.on('change', callback); }
  }

  render(type = null) {
    this.$el = document.createElement('label');
    this.$el.classList.add(styles.ns, theme);
    if (type !== null) { this.$el.classList.add(type); }

    return this.$el;
  }

  onRender() {
    setTimeout(() => this.onResize(), 0);
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

