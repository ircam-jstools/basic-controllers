import BaseController from './base-controller';
import * as elements from '../utils/elements';

export default class SelectList extends BaseController {
  constructor(legend, options, defaultValue, $container = null, callback = null) {
    super();

    this.type = 'select-list';
    this.legend = legend;
    this.options = options;
    this._value = defaultValue;
    const currentIndex = this.options.indexOf(this._value);
    this._currentIndex = currentIndex === -1 ? 0 : currentIndex;
    this._maxIndex = this.options.length - 1;

    super._applyOptionnalParameters($container, callback);
  }

  get value() {
    return this._value;
  }

  set value(value) {
    this.$select.value = value;
    this._value = value;
    this._currentIndex = this.options.indexOf(value);
  }

  render() {
    const content = `
      <span class="legend">${this.legend}</span>
      <div class="inner-wrapper">
        ${elements.arrowLeft}
        <select>
        ${this.options.map((option, index) => {
          return `<option value="${option}">${option}</option>`;
        }).join('')}
        <select>
        ${elements.arrowRight}
      </div>
    `;

    this.$el = super.render(this.type);
    this.$el.classList.add('align-small');
    this.$el.innerHTML = content;

    this.$prev = this.$el.querySelector('.arrow-left');
    this.$next = this.$el.querySelector('.arrow-right');
    this.$select = this.$el.querySelector('select');
    // set to default value
    this.$select.value = this.options[this._currentIndex];
    this.bindEvents();

    return this.$el;
  }

  bindEvents() {
    this.$prev.addEventListener('click', () => {
      const index = this._currentIndex - 1;
      this.propagate(index);
    }, false);

    this.$next.addEventListener('click', () => {
      const index = this._currentIndex + 1;
      this.propagate(index);
    }, false);

    this.$select.addEventListener('change', () => {
      const value = this.$select.value;
      const index = this.options.indexOf(value);
      this.propagate(index);
    });
  }

  propagate(index) {
    if (index < 0 || index > this._maxIndex) { return; }

    const value = this.options[index];
    this._currentIndex = index;
    this.$select.value = value;

    this.emit('change', value);
  }
}





