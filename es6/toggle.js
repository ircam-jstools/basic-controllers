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
    this._updateBtn();
  }

  get active() { return this._active; }

  _updateBtn() {
    var method = this.active ? 'add' : 'remove';
    this.$toggle.classList[method]('active');
  }

  render() {
    let content = `
      <span class="legend">${this.legend}</span>
      <div class="inner-wrapper">
        <div class="toggle-container">
          <div class="x x1"></div><div class="x x2"></div>
        </div>
      </div>`;

    this.$el = document.createElement('label');
    this.$el.classList.add(styles.ns, 'toggle');
    this.$el.innerHTML = content;

    this.$toggle = this.$el.querySelector('.toggle-container');
    this.bindEvents();
    this.active = this._active; // initialize state

    return this.$el;
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