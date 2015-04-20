const events = require('events');

const containerStyles = {
  width: '440px',
  height: '30px',
  display: 'block',
  padding: '4px',
  margin: '2px',
  backgroundColor: '#efefef',
  border: '1px solid #aaaaaa',
};

const legendStyles = {
  color: '#464646',
  font: 'normal bold 12px arial',
  lineHeight: '22px',
  height: '22px',
  display: 'inline-block',
  width: '140px',
  overflow: 'hidden',
  textAlign: 'right',
  padding: 0,
  paddingRight: '6px'
};

const rangeStyles = {
  height: '22px',
  width: '200px',
  display: 'inline-block',
};

const numberStyles = {
  height: '22px',
  width: '54px',
  position: 'relative',
  top: '-7px',
  left: '5px',
  font: 'normal normal 12px arial',
  border: 'none',
  background: 'none',
  paddingLeft: '4px',
  display: 'inline-block',
};

const unitStyles = {
  font: 'italic normal 12px arial',
  lineHeight: '22px',
  height: '22px',
  display: 'inline-block',
  position: 'relative',
  top: '-7px',
  paddingLeft: '5px',
  color: '#565656'
};

class Slider extends events.EventEmitter {
  constructor(legend, min = 0, max = 1, step = 0.01, defaultValue = 0, unit = '') {
    super();

    this.legend = legend;
    this.min = min;
    this.max = max;
    this.step = step;
    this.unit = unit;
    this._value = defaultValue;
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
    for (let attr in containerStyles) {
      this.$el.style[attr] = containerStyles[attr];
    }

    for (let attr in legendStyles) {
      this.$legend.style[attr] = legendStyles[attr];
    }

    for (let attr in rangeStyles) {
      this.$range.style[attr] = rangeStyles[attr];
    }

    for (let attr in numberStyles) {
      this.$number.style[attr] = numberStyles[attr];
    }

    for (let attr in unitStyles) {
      this.$unit.style[attr] = unitStyles[attr];
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
