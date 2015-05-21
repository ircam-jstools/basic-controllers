const events = require('events');
const styles = require('./utils/styles');

class Buttons extends events.EventEmitter {
  constructor(legend, labels, $container = null, callback = null) {
    super();

    this.legend = legend;
    this.labels = labels;

    // styles.insertStyleSheet();

    if ($container) {
      if (typeof $container === 'string') {
        $container = document.querySelector($container);
      }

      $container.appendChild(this.render());
    }

    if (callback) { this.on('change', callback); }
  }

  render() {
    let content = `
      <span class="legend">${this.legend}</span>
      <div class="inner-wrapper">
        ${this.labels.map((label) => `<button data-label="${label}">${label}</button>`).join('')}
      </div>`;

    this.$el = document.createElement('label');
    this.$el.classList.add(styles.ns, 'buttons');
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
