import * as styles from '../utils/styles';
// store all instance in a controllers
const controllers = new Set();
let theme = 'light';

// add a single listener on window to trigger update
window.addEventListener('resize', function() {
  controllers.forEach((controller) => controller.onResize());
});

/**
 * Base class to create new controllers
 *
 * @memberof module:basicControllers
 */
class BaseController {
  constructor() {
    // insert styles when the first controller is created
    if (controllers.size === 0)
      styles.insertStyleSheet();

    controllers.add(this);

    this._listeners = new Set();
  }

  /**
   * Set the theme of the controllers
   * @type {String}
   */
  static set theme(value) {
    controllers.forEach((controller) => controller.$el.classList.remove(theme));
    theme = value;
    controllers.forEach((controller) => controller.$el.classList.add(theme));
  }

  /**
   * Get the theme of the controllers
   * @type {String}
   */
  static get theme() {
    return theme;
  }

  addListener(callback) {
    this._listeners.add(callback);
  }

  removeListener(callback) {
    this._listeners.remove(callback);
  }

  _executeListeners(...values) {
    this._listeners.forEach((callback) => callback(...values));
  }

  /** @private */
  _applyOptionnalParameters($container = null, callback = null) {
    if ($container) {
      // css selector
      if (typeof $container === 'string')
        $container = document.querySelector($container);
      // group
      else if ($container instanceof BaseController && $container.$container)
        $container = $container.$container;

      $container.appendChild(this.render());
      this.onRender();
    }

    if (callback)
      this.addListener(callback);
  }

  /** @private */
  render(type = null) {
    this.$el = document.createElement('label');
    this.$el.classList.add(styles.ns, theme);
    if (type !== null) { this.$el.classList.add(type); }

    return this.$el;
  }

  /** @private */
  onRender() {
    setTimeout(() => this.onResize(), 0);
  }

  /** @private */
  onResize() {
    const boundingRect = this.$el.getBoundingClientRect();
    const width = boundingRect.width;
    const method = width > 600 ? 'remove' : 'add';

    this.$el.classList[method]('small');
  }

  /** @private */
  bindEvents() {}
}

export default BaseController;
