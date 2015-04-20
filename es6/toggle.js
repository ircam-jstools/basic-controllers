const events = require('events');
const styles = require('./utils/styles');

class Toggle extends events.EventEmitter {
  constructor(legend, active = false, $container = false, callback = null) {
    super();

    this.legend = legend;
    this._active = active;


    if ($container) {
      if (typeof $container === 'string') {
        $container = document.querySelector($container);
      }

      $container.appendChild(this.render());
    }

    if (callback) { this.on('change', callback); }
  }

  set active(bool) {
    this._active = bool;
    this.updateBtn();
  }

  get active() {
    return this._active;
  }

  render() {
    let content = `<span class="legend">${this.legend}</span>` +
      `<div class="toggle-container"><div class="toggle-active">` +
        `<div class="x-1"></div><div class="x-2"></div>` +
      `</div></div>`;

    this.$el = document.createElement('label');
    this.$el.innerHTML = content;

    this.$legend = this.$el.querySelector('.legend');
    this.$toggleContainer = this.$el.querySelector('.toggle-container');
    this.$toggleActive = this.$el.querySelector('.toggle-active');

    // draw a nice pretty crosshair
    this.$x1 = this.$el.querySelector('.x-1');
    this.$x2 = this.$el.querySelector('.x-2');

    this.addStyles();
    this.bindEvents();

    // initialize
    this.active = this._active;

    return this.$el;
  }

  updateBtn() {
    var display = this.active ? 'block' : 'none';
    this.$toggleActive.style.display = display;
  }

  addStyles() {
    for (let attr in styles.containerStyles) {
      this.$el.style[attr] = styles.containerStyles[attr];
    }

    for (let attr in styles.legendStyles) {
      this.$legend.style[attr] = styles.legendStyles[attr];
    }

    for (let attr in styles.toggleContainer) {
      this.$toggleContainer.style[attr] = styles.toggleContainer[attr];
    }

    for (let attr in styles.toggleActive) {
      this.$toggleActive.style[attr] = styles.toggleActive[attr];
    }

    for (let attr in styles.x1) {
      this.$x1.style[attr] = styles.x1[attr];
    }

    for (let attr in styles.x2) {
      this.$x2.style[attr] = styles.x2[attr];
    }
  }

  bindEvents() {
    this.$toggleContainer.addEventListener('click', (e) => {
      e.preventDefault();
      var active = this.active ? false : true;
      this.active = active;

      this.emit('change', active);
    });
  }
}

module.exports = Toggle;