import * as _styles from './utils/styles';
export const styles = _styles;
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

export function setTheme(theme) {
  _BaseController.theme = theme;
};

export function disableStyles() {
  _styles.disable();
};

