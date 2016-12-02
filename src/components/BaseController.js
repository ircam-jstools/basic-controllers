import * as styles from '../utils/styles';

// keep track of all instaciated controllers
const controllers = new Set();
// default theme
let theme = 'light';

/**
 * @module basic-controllers
 */

/**
 * Base class to create new controllers
 */
class BaseController {
  constructor(type, defaults, options) {
    this.type = type;
    this.params = Object.assign({}, defaults, options);
    // insert styles and listen window resize when the first controller is created
    if (controllers.size === 0) {
      styles.insertStyleSheet();

      window.addEventListener('resize', function() {
        controllers.forEach((controller) => controller.onResize());
      });
    }

    controllers.add(this);

    this._listeners = new Set();
  }

  /**
   * Theme of the controllers
   * @type {String}
   * @private
   */
  static set theme(value) {
    controllers.forEach((controller) => controller.$el.classList.remove(theme));
    theme = value;
    controllers.forEach((controller) => controller.$el.classList.add(theme));
  }

  static get theme() {
    return theme;
  }

  /**
   * Mandatory method to be called at the end of a constructor.
   * @private
   */
  initialize() {
    const callback = this.params.callback;
    let $container = this.params.container;

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

  /**
   * Add a listener to the controller.
   *
   * @param {Function} callback - Function to be applied when the controller
   *  state change.
   */
  addListener(callback) {
    this._listeners.add(callback);
  }

  /**
   * Remove a listener from the controller.
   *
   * @param {Function} callback - Function to remove from the listeners.
   */
  removeListener(callback) {
    this._listeners.remove(callback);
  }

  /** @private */
  executeListeners(...values) {
    this._listeners.forEach((callback) => callback(...values));
  }

  /** @private */
  render(type = null) {
    this.$el = document.createElement('label');
    this.$el.classList.add(styles.ns, theme);

    if (type !== null)
      this.$el.classList.add(type);

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
