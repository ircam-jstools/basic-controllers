import BaseController from './base-controller';

export default class Buttons extends BaseController {
  constructor(legend, labels, $container = null, callback = null) {
    super();

    this.type = 'buttons';
    this.legend = legend || '&nbsp'; // non breakable space to keep rendering consistency
    this.labels = labels;
    this._index = null;

    super._applyOptionnalParameters($container, callback);
  }

  render() {
    let content = `
      <span class="legend">${this.legend}</span>
      <div class="inner-wrapper">
        ${this.labels.map((label, index) => {
          return `
            <a href="#" class="btn">
              ${label}
            </a>`;
        }).join('')}
      </div>`;

    this.$el = super.render(this.type);
    this.$el.innerHTML = content;

    this.$buttons = Array.from(this.$el.querySelectorAll('.btn'));
    this.bindEvents();

    return this.$el;
  }

  set value(value) {

  }

  get value() {

  }

  bindEvents() {
    this.$buttons.forEach(($btn, index) => {
      const label = this.labels[index];

      $btn.addEventListener('click', (e) => {
        this.emit('change', label);
        e.preventDefault();
      });
    });
  }
}
