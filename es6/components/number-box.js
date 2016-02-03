import BaseController from './base-controller';
import * as elements from '../utils/elements';

export default class NumberBox extends BaseController {
  constructor(legend, min = 0, max = 1, step = 0.01, defaultValue = 0, $container = null, callback = null) {
    super();

    this.type = 'number-box';
    this.legend = legend;
    this.min = 0;
    this.max = max;
    this.step = step;
    this._value = defaultValue;
    this._isIntStep = (step % 1 === 0);

    super._applyOptionnalParameters($container, callback);
  }

  get value() {
    return this._value;
  }

  set value(value) {
    value = this._isIntStep ? parseInt(value, 10) : parseFloat(value);
    value = Math.min(this.max, Math.max(this.min, value));
    this.$number.value = value;

    this._value = value;
  }

  render() {
    const content = `
      <span class="legend">${this.legend}</span>
      <div class="inner-wrapper">
        ${elements.arrowLeft}
        <input class="number" type="number" min="${this.min}" max="${this.max}" step="${this.step}" value="${this._value}" />
        ${elements.arrowRight}
      </div>
    `;

    this.$el = super.render(this.type);
    this.$el.classList.add('align-small');
    this.$el.innerHTML = content;

    this.$prev = this.$el.querySelector('.arrow-left');
    this.$next = this.$el.querySelector('.arrow-right');
    this.$number = this.$el.querySelector('input[type="number"]');

    this.bindEvents();

    return this.$el;
  }

  bindEvents() {
    this.$prev.addEventListener('click', (e) => {
      const decimals = this.step.toString().split('.')[1];
      const exp = decimals ? decimals.length : 0;
      const mult = Math.pow(10, exp);

      const intValue = Math.floor(this.value * mult + 0.5);
      const intStep = Math.floor(this.step * mult + 0.5);
      const value = (intValue - intStep) / mult;

      this.propagate(value);
    }, false);

    this.$next.addEventListener('click', (e) => {
      const decimals = this.step.toString().split('.')[1];
      const exp = decimals ? decimals.length : 0;
      const mult = Math.pow(10, exp);

      const intValue = Math.floor(this.value * mult + 0.5);
      const intStep = Math.floor(this.step * mult + 0.5);
      const value = (intValue + intStep) / mult;

      this.propagate(value);
    }, false);

    this.$number.addEventListener('change', (e) => {
      let value = this.$number.value;
      value = this._isIntStep ? parseInt(value, 10) : parseFloat(value);
      value = Math.min(this.max, Math.max(this.min, value));

      this.propagate(value);
    }, false);
  }

  propagate(value) {
    if (value === this._value) { return; }

    this._value = value;
    this.$number.value = value;

    this.emit('change', this._value);
  }
}
