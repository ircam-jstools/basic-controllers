import BaseController from './base-controller';


/**
 * Display a value, Read-only.
 */
export default class Text extends BaseController {
  constructor(legend, defaultValue, readonly = true, $container = null, callback = null) {
    super();

    this.type = 'text';
    this.legend = legend;
    this._readonly = readonly;
    this._value = defaultValue;

    this._applyOptionnalParameters($container, callback);
  }

  get value() {
    return this._value;
  }

  set value(value) {
    this.$input.value = value;
    this._value = value;
  }

  render() {
    const readonly = this._readonly ? 'readonly' : ''
    const content = `
      <span class="legend">${this.legend}</span>
      <div class="inner-wrapper">
        <input class="text" type="text" value="${this._value}" ${readonly} />
      </div>
    `;

    this.$el = super.render(this.type);
    this.$el.innerHTML = content;

    this.$input = this.$el.querySelector('.text');

    this.bindEvents();

    return this.$el;
  }

  bindEvents() {
    this.$input.addEventListener('keyup', () => {
      this._value = this.$input.value;
      this.emit('change', this._value);
    }, false);
  }
}
