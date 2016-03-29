import BaseController from './base-controller';
import * as elements from '../utils/elements';

export default class SelectButtons extends BaseController {
  constructor(legend, options, defaultValue, $container = null, callback = null) {
    super();

    this.type = 'select-buttons';
    this.legend = legend; // non breakable space to keep rendering consistency
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

  }

  render() {
    const content = `
      <span class="legend">${this.legend}</span>
      <div class="inner-wrapper">
        ${elements.arrowLeft}
        ${this.options.map((option, index) => {
          return `
            <a href="#" class="btn" data-index="${index}" data-value="${option}">
              ${option}
            </a>`;
        }).join('')}
        ${elements.arrowRight}
      </div>
    `;

    this.$el = super.render(this.type);
    this.$el.innerHTML = content;

    this.$prev = this.$el.querySelector('.arrow-left');
    this.$next = this.$el.querySelector('.arrow-right');
    this.$btns = Array.from(this.$el.querySelectorAll('.btn'));
    this._highlightBtn(this._currentIndex);

    this.bindEvents();
    return this.$el;
  }

  bindEvents() {
    this.$prev.addEventListener('click', () => {
      const index = this._currentIndex - 1;
      this.propagate(index);
    });

    this.$next.addEventListener('click', () => {
      const index = this._currentIndex + 1;
      this.propagate(index);
    });

    this.$btns.forEach(($btn, index) => {
      $btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.propagate(index);
      });
    });
  }

  propagate(index) {
    if (index < 0 || index > this._maxIndex) { return; }

    this._currentIndex = index;
    this._value = this.options[index];
    this._highlightBtn(this._currentIndex);

    this.emit('change', this._value);
  }

  _highlightBtn(activeIndex) {
    this.$btns.forEach(($btn, index) => {
      $btn.classList.remove('active');

      if (activeIndex === index) {
        $btn.classList.add('active');
      }
    });
  }
}