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
    let content = `<span class="legend">${this.legend}</span>
      <div class="inner-wrapper">
        <div class="toggle-container">
          <div class="x x1"></div><div class="x x2"></div>
        </div>
      </div>`;

    this.$el = document.createElement('label');
    this.$el.classList.add(styles.ns, 'toggle');
    this.$el.innerHTML = content;

    this.$legend = this.$el.querySelector('.legend');
    this.$innerWrapper = this.$el.querySelector('.inner-wrapper');
    this.$toggle = this.$el.querySelector('.toggle-container');

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
    var method = this.active ? 'add' : 'remove';
    this.$toggle.classList[method]('active');
  }

  addStyles() {
    styles.insertRules('.toggle', styles.containerStyles);
    styles.insertRules('.toggle .legend', styles.legendStyles);
    styles.insertRules('.toggle .inner-wrapper', styles.innerWrapper);
    styles.insertRules('.toggle .toggle-container', styles.toggleStyles);

    styles.insertRules('.toggle .toggle-container .x', styles.x);
    styles.insertRules('.toggle .toggle-container .x1', styles.x1);
    styles.insertRules('.toggle .toggle-container .x2', styles.x2);
    styles.insertRules('.toggle .toggle-container.active .x', styles.xActive);
  }

  bindEvents() {
    this.$toggle.addEventListener('click', (e) => {
      e.preventDefault();
      var active = this.active ? false : true;
      this.active = active;

      this.emit('change', active);
    });
  }
}

module.exports = Toggle;