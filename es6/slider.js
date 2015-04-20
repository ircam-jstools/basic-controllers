const events = require('events');
const styles = require('./utils/styles');

class Slider extends events.EventEmitter {
  constructor(legend, min = 0, max = 1, step = 0.01, defaultValue = 0, unit = '', $container = null, callback = null) {
    super();

    this.legend = legend;
    this.min = min;
    this.max = max;
    this.step = step;
    this.unit = unit;
    this._value = defaultValue;

    if ($container) { $container.appendChild(this.render()); }
    if (callback) { this.on('change', callback); }
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
    let content = `<span class="legend">${this.legend}</span>` +
      `<input type="range" min="${this.min}" max="${this.max}" step="${this.step}" value="${this.value}" /> ` +
      `<input type="number" min="${this.min}" max="${this.max}" step="${this.step}" value="${this.value}" /> ` +
      `<span class="unit">${this.unit}</span>`;

    this.$el = document.createElement('legend');
    this.$el.innerHTML = content;

    this.$legend  = this.$el.querySelector('.legend');
    this.$range  = this.$el.querySelector(`input[type="range"]`);
    this.$number = this.$el.querySelector(`input[type="number"]`);
    this.$unit   = this.$el.querySelector('.unit');

    this.bindEvents();
    this.addStyles();

    return this.$el;
  }

  addStyles() {
    for (let attr in styles.containerStyles) {
      this.$el.style[attr] = styles.containerStyles[attr];
    }

    for (let attr in styles.legendStyles) {
      this.$legend.style[attr] = styles.legendStyles[attr];
    }

    for (let attr in styles.rangeStyles) {
      this.$range.style[attr] = styles.rangeStyles[attr];
    }

    for (let attr in styles.numberStyles) {
      this.$number.style[attr] = styles.numberStyles[attr];
    }

    for (let attr in styles.unitStyles) {
      this.$unit.style[attr] = styles.unitStyles[attr];
    }
  }

  bindEvents() {
    this.$range.addEventListener('input', () => {
      let value = this.$range.value;
      this.$number.value = value;
      this.value = value;

      this.emit('change', value);
    }, false);

    this.$number.addEventListener('input', () => {
      let value = this.$number.value;
      this.$range.value = value;
      this.value = value;

      this.emit('change', value);
    }, false);
  }
}

module.exports = Slider;
