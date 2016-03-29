import * as _styles from './utils/styles';
export const styles = _styles;
// expose for plugins
import _BaseController from './components/base-controller';
export const BaseController = _BaseController;

export { default as Buttons } from './components/buttons';
export { default as Text } from './components/text';
export { default as NumberBox } from './components/number-box';
export { default as SelectButtons } from './components/select-buttons';
export { default as SelectList } from './components/select-list';
export { default as Slider } from './components/slider';
export { default as Title } from './components/title';
export { default as Toggle } from './components/toggle';
// Breakpoint: require('./dist/breakpoint'),
export function setTheme(theme) {
  _BaseController.theme = theme;
};

export function disableStyles() {
  _styles.disable();
};

