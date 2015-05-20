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
    this.$el.classList.add(styles.ns, 'title');
    this.$el.innerHTML = content;

    this.$legend = this.$el.querySelector('.legend');

    this.addStyles();

    return this.$el;
  }

  addStyles() {
    styles.insertRules('.title', styles.containerStyles);
    styles.insertRules('.title', styles.titleContainerStyles);
    styles.insertRules('.title .legend', styles.titleStyles);
  }
}

module.exports = Title;
