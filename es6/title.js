const BaseController = require('./base-controller');
const styles = require('./utils/styles');

class Title extends BaseController {
  constructor(legend, $container = null) {
    super();

    this.type = 'title';
    this.legend = legend;

    super._applyOptionnalParameters($container);
  }

  render() {
    let content = `<span class="legend">${this.legend}</span>`;

    this.$el = super.render();
    this.$el.classList.add(this.type);
    this.$el.innerHTML = content;

    return this.$el;
  }
}

module.exports = Title;
