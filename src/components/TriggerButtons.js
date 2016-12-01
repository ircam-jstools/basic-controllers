import BaseController from './BaseController';

class TriggerButtons extends BaseController {
  constructor(legend, labels, $container = null, callback = null) {
    super();

    this.type = 'buttons';
    this.legend = legend || '&nbsp'; // non breakable space to keep rendering consistency
    this.labels = labels;
    this._index = null;
    this._value = null;

    super._applyOptionnalParameters($container, callback);
  }

  /**
   * Last triggered label
   * @type {String}
   */
  get value() {
    return this._value;
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

  bindEvents() {
    this.$buttons.forEach(($btn, index) => {
      const label = this.labels[index];

      $btn.addEventListener('click', (e) => {
        e.preventDefault();

        this._value = label;
        this._executeListeners(label, index);
      });
    });
  }
}

export default TriggerButtons;
