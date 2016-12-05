import BaseController from './BaseController';

/** @module basic-controller */

const defaults = {
  label: '&nbsp;',
  container: null,
};

/**
 * Title.
 *
 * @param {Object} config - Override default parameters.
 * @param {String} config.label - Label of the controller.
 * @param {String|Element|basic-controller~Group} [config.container=null] -
 *  Container of the controller.
 *
 * @example
 * import * as controller from 'basic-controllers';
 *
 * const title = new controllers.Title({
 *   label: 'My Title',
 *   container: '#container'
 * });
 */
class Title extends BaseController {
  constructor(config) {
    super('title', defaults, config);
    super.initialize();
  }

  /** @private */
  render() {
    const content = `<span class="label">${this.params.label}</span>`;

    this.$el = super.render();
    this.$el.innerHTML = content;

    return this.$el;
  }
}

export default Title;
