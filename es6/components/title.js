import BaseController from './base-controller';
import styles from '../utils/styles';


export default class Title extends BaseController {
  constructor(legend, $container = null) {
    super();

    this.type = 'title';
    this.legend = legend;

    super._applyOptionnalParameters($container);
  }

  render() {
    let content = `<span class="legend">${this.legend}</span>`;

    this.$el = super.render(this.type);
    this.$el.innerHTML = content;

    return this.$el;
  }
}

