const events = require('events');
const styles = require('./utils/styles');

class Slider extends events.EventEmitter {
  constructor(legend, min = 0, max = 1, step = 0.01, defaultValue = 0, unit = '', size = 'default', $container = null, callback = null) {
    super();

    this.legend = legend;
    this.min = min;
    this.max = max;
    this.step = step;
    this.unit = unit;
    this.size = size;
    this._value = defaultValue;

    if ($container) {
      if (typeof $container === 'string') {
        $container = document.querySelector($container);
      }

      $container.appendChild(this.render());
    }

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
    let content = `<span class="legend">${this.legend}</span>
      <div class="inner-wrapper ${this.size}">
        <input class="range" type="range" min="${this.min}" max="${this.max}" step="${this.step}" value="${this.value}" />

        <div class="number-controller">
          <input type="number" class="number" min="${this.min}" max="${this.max}" step="${this.step}" value="${this.value}" />
          <span class="unit">${this.unit}</span>
        </div>
      </div>`;

    this.$el = document.createElement('label');
    this.$el.classList.add(styles.ns, 'slider');
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
    styles.insertRules('.slider', styles.containerStyles);
    styles.insertRules('.slider .legend', styles.legendStyles);

    styles.insertRules('.slider .inner-wrapper', styles.innerWrapper);
    // styles.insertRules('.slider .inner-wrapper', styles.sliderInnerWrapper);

    styles.insertRules('.slider .inner-wrapper .range', styles.rangeDefaultStyles);
    styles.insertRules('.slider .inner-wrapper.large .range', styles.rangeLargeStyles);
    styles.insertRules('.slider .inner-wrapper.small .range', styles.rangeSmallStyles);

    styles.insertRules('.slider .inner-wrapper .number-controller', styles.numberDefaultController);
    styles.insertRules('.slider .inner-wrapper.large .number-controller', styles.numberController);
    styles.insertRules('.slider .inner-wrapper.small .number-controller', styles.numberController);

    styles.insertRules('.slider .inner-wrapper .number-controller .number', styles.numberStyles);
    styles.insertRules('.slider .inner-wrapper .number-controller .unit', styles.unitStyles);
  }

  bindEvents() {
    this.$range.addEventListener('input', () => {
      let value = parseFloat(this.$range.value);
      this.$number.value = value;
      this.value = value;

      this.emit('change', value);
    }, false);

    this.$number.addEventListener('change', () => {
      let value = parseFloat(this.$number.value);
      this.$range.value = value;
      this.value = value;

      this.emit('change', value);
    }, false);
  }
}

module.exports = Slider;
