import BaseController from './base-controller';

export default class Slider extends BaseController {
  constructor(legend, min = 0, max = 1, step = 0.01, defaultValue = 0, unit = '', size = 'default', $container = null, callback = null) {
    super();

    this.type = 'slider';
    this.legend = legend;
    this.min = min;
    this.max = max;
    this.step = step;
    this.unit = unit;
    this.size = size;
    this._value = defaultValue;

    super._applyOptionnalParameters($container, callback);
  }

  set value(value) {
    this._value = value;

    if (this.$number && this.$range) {
      this.$number.value = this.value;
      this.$range.value = this.value;
    }
  }

  get value() {
    return this._value;
  }

  render() {
    const content = `
      <span class="legend">${this.legend}</span>
      <div class="inner-wrapper">
        <input class="range" type="range" min="${this.min}" max="${this.max}" step="${this.step}" value="${this.value}" />
        <div class="number-wrapper">
          <input type="number" class="number" min="${this.min}" max="${this.max}" step="${this.step}" value="${this.value}" />
          <span class="unit">${this.unit}</span>
        </div>
      </div>`;

    this.$el = super.render(this.type);
    this.$el.innerHTML = content;
    this.$el.classList.add(`slider-${this.size}`);

    this.$range  = this.$el.querySelector(`input[type="range"]`);
    this.$number = this.$el.querySelector(`input[type="number"]`);

    this.bindEvents();

    return this.$el;
  }

  bindEvents() {
    this.$range.addEventListener('input', () => {
      const value = parseFloat(this.$range.value);
      this.$number.value = value;
      this.value = value;

      this.emit('change', value);
    }, false);

    this.$number.addEventListener('change', () => {
      // @todo - should handle min and max
      const value = parseFloat(this.$number.value);
      this.$range.value = value;
      this.value = value;

      this.emit('change', value);
    }, false);
  }
}

