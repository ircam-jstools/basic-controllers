import BaseController from './BaseController';
import * as elements from '../utils/elements';

/** @module basic-controllers */

const defaults = {
  label: '&bnsp;',
  active: false,
  container: null,
  callback: null,
};

/**
 * On/Off controller.
 *
 * @param {Object} options - Override default options.
 * @param {String} options.label - Label of the controller.
 * @param {Array} [options.active=false] - Default state of the toggle.
 * @param {String|Element|basic-controller~Group} [options.container=null] -
 *  Container of the controller.
 * @param {Function} [options.callback=null] - Callback to be executed when the
 *  value changes.
 *
 * @example
 * import * as controllers from 'basic-controllers';
 *
 * const toggle = new controllers.Toggle({
 *   label: 'My Toggle',
 *   active: false,
 *   container: '#container',
 *   callback: (active) => console.log(active),
 * });
 */
class Toggle extends BaseController {
  constructor(options) {
    super('toggle', defaults, options);

    this._active = this.params.active;

    super.initialize();
  }

  /**
   * Value of the toggle
   * @type {Boolean}
   */
  set value(bool) {
    this.active = bool;
  }

  get value() {
    return this._active;
  }

  /**
   * Alias for `value`.
   * @type {Boolean}
   */
  set active(bool) {
    this._active = bool;
    this._updateBtn();
  }

  get active() {
    return this._active;
  }

  /** @private */
  _updateBtn() {
    var method = this.active ? 'add' : 'remove';
    this.$toggle.classList[method]('active');
  }

  /** @private */
  render() {
    let content = `
      <span class="label">${this.params.label}</span>
      <div class="inner-wrapper">
        ${elements.toggle}
      </div>`;

    this.$el = super.render();
    this.$el.classList.add('align-small');
    this.$el.innerHTML = content;

    this.$toggle = this.$el.querySelector('.toggle-element');
    // initialize state
    this.active = this._active;
    this.bindEvents();

    return this.$el;
  }

  /** @private */
  bindEvents() {
    this.$toggle.addEventListener('click', (e) => {
      e.preventDefault();

      this.active = !this.active;
      this.executeListeners(this._active);
    });
  }
}

export default Toggle;
