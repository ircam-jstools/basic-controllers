import BaseController from './BaseController';
import * as guiComponents from 'gui-components';

class Slider extends BaseController {
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

    this._onSliderChange = this._onSliderChange.bind(this);

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
        <div class="range"></div>
        <div class="number-wrapper">
          <input type="number" class="number" min="${this.min}" max="${this.max}" step="${this.step}" value="${this.value}" />
          <span class="unit">${this.unit}</span>
        </div>
      </div>`;

    this.$el = super.render(this.type);
    this.$el.innerHTML = content;
    this.$el.classList.add(`slider-${this.size}`);

    this.$range = this.$el.querySelector('.range');
    this.$number = this.$el.querySelector(`input[type="number"]`);

    this.slider = new guiComponents.Slider({
      container: this.$range,
      callback: this._onSliderChange,
      min: this.min,
      max: this.max,
      step: this.step,
      default: this.value,
      foregroundColor: '#ababab',
    });

    this.bindEvents();

    return this.$el;
  }

  bindEvents() {
    this.$number.addEventListener('change', () => {
      const value = parseFloat(this.$number.value);
      this.slider.value = value;
      this._value = value;

      this._executeListeners(this._value);
    }, false);
  }

  onResize() {
    super.onResize();

    const { width, height } = this.$range.getBoundingClientRect();
    this.slider.resize(width, height);
  }

  _onSliderChange(value) {
    this.$number.value = value;
    this._value = value;

    this._executeListeners(this._value);
  }
}

export default Slider;
