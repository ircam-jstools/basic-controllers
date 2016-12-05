import BaseController from './BaseController';

const defaults = {
  label: '&nbsp;',
  default: '',
  readonly: false,
  container: null,
  callback: null,
}

/**
 * Text controller.
 *
 * @param {Object} options - Override default options.
 * @param {String} options.label - Label of the controller.
 * @param {Array} [options.default=''] - Default value of the controller.
 * @param {Array} [options.readonly=false] - Define if the controller is readonly.
 * @param {String|Element|basic-controller~Group} [options.container=null] -
 *  Container of the controller.
 * @param {Function} [options.callback=null] - Callback to be executed when the
 *  value changes.
 *
 * @example
 * import * as controllers from 'basic-contollers';
 *
 * const text = new controllers.Text({
 *   label: 'My Text',
 *   default: 'default value',
 *   readonly: false,
 *   container: '#container',
 *   callback: (value) => console.log(value),
 * });
 */
class Text extends BaseController {
  constructor(options) {
    super('text', defaults, options);

    this._value = this.params.default;
    this.initialize();
  }

  get value() {
    return this._value;
  }

  set value(value) {
    this.$input.value = value;
    this._value = value;
  }

  render() {
    const readonly = this.params.readonly ? 'readonly' : '';
    const content = `
      <span class="label">${this.params.label}</span>
      <div class="inner-wrapper">
        <input class="text" type="text" value="${this._value}" ${readonly} />
      </div>
    `;

    this.$el = super.render();
    this.$el.innerHTML = content;
    this.$input = this.$el.querySelector('.text');

    this.bindEvents();
    return this.$el;
  }

  bindEvents() {
    this.$input.addEventListener('keyup', () => {
      this._value = this.$input.value;
      this.executeListeners(this._value);
    }, false);
  }
}

export default Text;
