import BaseController from './BaseController';
import * as elements from '../utils/elements';

/**
 * @module basic-controllers
 */

const defaults = {
  legend: '&nbsp;',
  defaultState: 'opened',
  container: null,
};

/**
 * Create a group of controllers.
 *
 * @param {Object} options - Override default parameters.
 * @param {String} label -
 */
class Group extends BaseController {
  constructor(options) {
    super(type, defaults, options);

    this._states = ['opened', 'closed'];
    super.initialize($container);
  }

  /**
   * State of the group (`'opened'` or `'closed'`).
   *
   * @type {String}
   */
  get state() {
    return this.params.state;
  }

  set state(value) {
    if (this._states.indexOf(value) === -1)
      throw new Error(`Invalid state "${value}"`);

    this.$el.classList.remove(this.params.state);
    this.$el.classList.add(value);

    this.params.state = value;
  }

  /** @private */
  render() {
    let content = `
      <div class="group-header">
        ${elements.smallArrowRight}
        ${elements.smallArrowBottom}
        <span class="label">${this.params.label}</span>
      </div>
      <div class="group-content"></div>
    `;

    this.$el = super.render();
    this.$el.innerHTML = content;
    this.$el.classList.add(this.params.state);

    this.$header = this.$el.querySelector('.group-header');
    this.$container = this.$el.querySelector('.group-content');

    this.bindEvents();

    return this.$el;
  }

  /** @private */
  bindEvents() {
    this.$header.addEventListener('click', () => {
      const state = this.params.state === 'closed' ? 'opened' : 'closed';
      this.state = state;
    });
  }
}

export default Group;
