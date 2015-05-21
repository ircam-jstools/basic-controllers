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

    return this.$el;
  }
}

module.exports = Title;
