import BaseController from './BaseController';
import * as elements from '../utils/elements';

class Group extends BaseController {
  constructor(legend, defaultState = 'opened', $container = null) {
    super();

    this.type = 'group';
    this.legend = legend;
    this._state = defaultState;
    this.states = ['opened', 'closed'];

    super._applyOptionnalParameters($container);
  }

  get state() {
    return this._state;
  }

  set state(value) {
    if (this.states.indexOf(value) === -1)
      throw new Error(`Invalid state "${value}"`);

    this.$el.classList.remove(this._state);
    this.$el.classList.add(value);

    this._state = value;
  }

  render() {
    let content = `
      <div class="group-header">
        ${elements.smallArrowRight}
        ${elements.smallArrowBottom}
        <span class="legend">${this.legend}</span>
      </div>
      <div class="group-content"></div>
    `;

    this.$el = super.render(this.type);
    this.$el.innerHTML = content;
    this.$el.classList.add(this._state);

    this.$header = this.$el.querySelector('.group-header');
    this.$container = this.$el.querySelector('.group-content');

    this.bindEvents();
    console.log(this.$el);

    return this.$el;
  }

  bindEvents() {
    this.$header.addEventListener('click', () => {
      console.log('toggle')
      const state = this._state === 'closed' ? 'opened' : 'closed';
      this.state = state;
    });
  }
}

export default Group;
