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
    let content = `<span class="legend">${this.legend}</span>` +
      `<div class="buttons-container">`;

    content += this.labels.map((label) => {
      return `<button data-label="${label}">${label}</button>`;
    }).join('');

    content += `</button>`;

    this.$el = document.createElement('label');
    this.$el.innerHTML = content;

    this.$legend = this.$el.querySelector('.legend');
    this.$buttonsContainer = this.$el.querySelector('.buttons-container');
    this.$buttons = Array.from(this.$el.querySelectorAll('button'));

    this.addStyles();
    this.bindEvents();

    return this.$el;
  }

  addStyles() {
    for (let attr in styles.containerStyles) {
      this.$el.style[attr] = styles.containerStyles[attr];
    }

    for (let attr in styles.legendStyles) {
      this.$legend.style[attr] = styles.legendStyles[attr];
    }

    for (let attr in styles.buttonsContainerStyles) {
      this.$buttonsContainer.style[attr] = styles.buttonsContainerStyles[attr];
    }

    const buttonWidth = 100 / this.$buttons.length;
    this.$buttons.forEach((button) => {
      button.style.width = buttonWidth + '%';
      for (let attr in styles.buttonStyles) {
        button.style[attr] = styles.buttonStyles[attr];
      }
    });
  }

  bindEvents() {
    this.$buttons.forEach((button) => {
      const label = button.getAttribute('data-label');

      button.addEventListener('mousedown', (e) => {
        e.preventDefault();
        button.style.backgroundColor = styles.buttonStyles.clickedBackgroundColor;
      });

      button.addEventListener('mouseup', (e) => {
        e.preventDefault();
        button.style.backgroundColor = styles.buttonStyles.backgroundColor;
        this.emit('change', label);
      });
    });
  }
}

module.exports = Buttons;
