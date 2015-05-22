const BaseController = require('./base-controller');

class Buttons extends BaseController {
  constructor(legend, labels, $container = null, callback = null) {
    super();

    this.type = 'buttons';
    this.legend = legend;
    this.labels = labels;

    super._applyOptionnalParameters($container, callback);
  }

  render() {
    let content = `
      <span class="legend">${this.legend}</span>
      <div class="inner-wrapper">
        ${this.labels.map((label) => `<button data-label="${label}">${label}</button>`).join('')}
      </div>`;

    this.$el = super.render();
    this.$el.classList.add(this.type);
    this.$el.innerHTML = content;

    this.$buttons = Array.from(this.$el.querySelectorAll('button'));
    this.bindEvents();

    return this.$el;
  }

  bindEvents() {
    this.$buttons.forEach((button) => {
      const label = button.getAttribute('data-label');

      button.addEventListener('mousedown', (e) => {
        e.preventDefault();
        button.classList.add('active');
      });

      button.addEventListener('mouseup', (e) => {
        e.preventDefault();
        button.classList.remove('active');
        this.emit('change', label);
      });
    });
  }
}

module.exports = Buttons;
