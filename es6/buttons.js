const events = require('events');
const styles = require('./utils/styles');

class Buttons extends events.EventEmitter {
  constructor(legend, labels, $container = null, callback = null) {
    super();

    this.legend = legend;
    this.labels = labels;

    console.log(this);
    if ($container) {
      if (typeof $container === 'string') {
        $container = document.querySelector($container);
      }

      $container.appendChild(this.render());
    }

    if (callback) { this.on('change', callback); }
  }

  render() {
    let content = `<span class="legend">${this.legend}</span>
      <div class="inner-wrapper">`;

    content += this.labels.map((label) => {
      return `<button data-label="${label}">${label}</button>`;
    }).join('');

    content += `</div>`;

    this.$el = document.createElement('label');
    this.$el.classList.add(styles.ns, 'buttons');
    this.$el.innerHTML = content;

    this.$legend = this.$el.querySelector('.legend');
    this.$buttonsContainer = this.$el.querySelector('.buttons-container');
    this.$buttons = Array.from(this.$el.querySelectorAll('button'));

    this.addStyles();
    this.bindEvents();

    return this.$el;
  }

  addStyles() {
    styles.insertRules('.buttons', styles.containerStyles);
    styles.insertRules('.buttons .legend', styles.legendStyles);
    styles.insertRules('.buttons .inner-wrapper', styles.innerWrapper);
    styles.insertRules('.buttons button', styles.buttonStyles);
    styles.insertRules('.buttons button.active', styles.buttonActiveStyles);
    // styles.insertRules('.buttons button:focus', styles.buttonFocusStyles);
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
