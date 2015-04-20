const events = require('events');
const styles = require('./utils/styles');

class Title extends events.EventEmitter {
  constructor(title, $container = null) {
    super();

    this.title = title;

    if ($container) {
      if (typeof $container === 'string') {
        $container = document.querySelector($container);
      }

      $container.appendChild(this.render());
    }
  }

  render() {
    let content = `<span class="title">${this.title}</span>` +
      `<div class="title-container">`;

    this.$el = document.createElement('label');
    this.$el.innerHTML = content;

    this.$title = this.$el.querySelector('.title');
    this.$titleContainer = this.$el.querySelector('.title-container');

    this.addStyles();

    return this.$el;
  }

  addStyles() {
    for (let attr in styles.containerStyles) {
      this.$el.style[attr] = styles.containerStyles[attr];
    }

    for (let attr in styles.titleStyles) {
      this.$title.style[attr] = styles.titleStyles[attr];
    }

    for (let attr in styles.titleContainerStyles) {
      this.$titleContainer.style[attr] = styles.titleContainerStyles[attr];
    }
  }
}

module.exports = Title;
