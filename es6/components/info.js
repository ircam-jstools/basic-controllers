import BaseController from './base-controller';


/**
 * Display a value, Read-only.
 */
export default class Info extends BaseController {
  constructor(legend, defaultValue, $container = null) {
    super();

    this.type = 'info';
    this.legend = legend;
    this._value = defaultValue;

    this._applyOptionnalParameters($container);
  }

  get value() {
    return this._value;
  }

  set value(value) {
    this.$input.value = value;
    this._value = value;
  }

  render() {
    const content = `
      <span class="legend">${this.legend}</span>
      <div class="inner-wrapper">
        <input class="text" type="text" value="${this._value}" readonly />
      </div>
    `;

    this.$el = super.render(this.type);
    this.$el.innerHTML = content;

    this.$input = this.$el.querySelector('.text');

    return this.$el;
  }
}