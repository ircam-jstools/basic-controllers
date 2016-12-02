import * as _styles from './utils/styles';
export const styles = _styles;

/**
 * @module basic-controllers
 */

// expose for plugins
import _BaseController from './components/BaseController';
export const BaseController = _BaseController;

export { default as Group } from './components/Group';
export { default as NumberBox } from './components/NumberBox';
export { default as SelectButtons } from './components/SelectButtons';
export { default as SelectList } from './components/SelectList';
export { default as Slider } from './components/Slider';
export { default as Text } from './components/Text';
export { default as Title } from './components/Title';
export { default as Toggle } from './components/Toggle';
export { default as TriggerButtons } from './components/TriggerButtons';

/**
 * Change the theme of the controllers, currently 3 themes are available:
 *  - 'light' (default)
 *  - 'grey'
 *  - 'dark'
 *
 * @param {String} theme - Name of the theme.
 */
export function setTheme(theme) {
  _BaseController.theme = theme;
};

/**
 * Disable default styling (expect a broken ui)
 */
export function disableStyles() {
  _styles.disable();
};

