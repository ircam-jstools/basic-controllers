const events = require('events');
const styles = require('./utils/styles');

class Title extends events.EventEmitter {
  constructor(legend, $container = null) {
    super();

    this.legend = legend;

    if ($container) {
      if (typeof $container === 'string') {
        $container = document.querySelector($container);
      }

      $container.appendChild(this.render());
    }
  }

  render() {
    let content = `<span class="legend">${this.legend}</span>`;

    this.$el = document.createElement('label');
    this.$el.innerHTML = content;

    this.$legend = this.$el.querySelector('.legend');

    this.addStyles();

    return this.$el;
  }

  addStyles() {
    for (let attr in styles.containerStyles) {
      this.$el.style[attr] = styles.containerStyles[attr];
    }

    for (let attr in styles.legendStyles) {
      this.$legend.style[attr] = styles.legendStyles[attr];
    }

    for (let attr in styles.titleContainerStyles) {
      this.$buttonsContainer.style[attr] = styles.titleContainerStyles[attr];
    }
  }
}

module.exports = Title;
