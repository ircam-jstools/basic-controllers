import BaseController from './BaseController';

/** @module basic-controllers */

const defaults = {
  label: '&nbsp;',
  values: null,
};

/**
 * List of buttons without state.
 *
 * @param {Object} options - Override default options.
 * @param {String} options.label - Label of the controller.
 * @param {Array} [options.values=null] - Values for each button.
 * @param {String|Element|basic-controller~Group} [options.container=null] -
 *  Container of the controller.
 * @param {Function} [options.callback=null] - Callback to be executed when the
 *  value changes.
 *
 * @example
 * import * as controllers from 'basic-controllers';
 *
 * const triggerButtons = new controllers.TriggerButtons({
 *   label: 'TriggerButtons',
 *   values: ['value 1', 'value 2', 'value 3'],
 *   container: '#container',
 *   callback: (value, index) => console.log(value, index),
 * });
 */
class TriggerButtons extends BaseController {
  constructor(options) {
    super('trigger-buttons', defaults, options);

    if (!Array.isArray(this.params.values))
      throw new Error('TriggerButton: Invalid option "values"');

    this._index = null;
    this._value = null;

    super.initialize();
  }

  /**
   * Last triggered button value.
   *
   * @readonly
   * @type {String}
   */
  get value() { return this._value; }

  /**
   * Last triggered button index.
   *
   * @readonly
   * @type {String}
   */
  get index() { return this._index; }

  /** @private */
  render() {
    const { label, values } = this.params;

    const content = `
      <span class="label">${label}</span>
      <div class="inner-wrapper">
        ${values.map((value, index) => {
          return `
            <a href="#" class="btn">
              ${value}
            </a>`;
        }).join('')}
      </div>`;

    this.$el = super.render();
    this.$el.innerHTML = content;

    this.$buttons = Array.from(this.$el.querySelectorAll('.btn'));
    this.bindEvents();

    return this.$el;
  }

  /** @private */
  bindEvents() {
    this.$buttons.forEach(($btn, index) => {
      const value = this.params.values[index];

      $btn.addEventListener('click', (e) => {
        e.preventDefault();

        this._value = value;
        this._index = index;

        this.executeListeners(value, index);
      });
    });
  }
}

export default TriggerButtons;
