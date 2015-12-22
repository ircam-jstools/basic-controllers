import * as styles from './utils/styles';

// expose for plugins
import BaseController from './components/base-controller';
import Buttons from './components/buttons';
import SelectButtons from './components/select-buttons';
import SelectList from './components/select-list';
import Slider from './components/slider';
import Title from './components/title';
import Toggle from './components/toggle';
import NumberBox from './components/number-box';
// Breakpoint: require('./dist/breakpoint'),

export default {
  BaseController,
  Buttons,
  NumberBox,
  SelectButtons,
  SelectList,
  Slider,
  Title,
  Toggle,

  // global configuration
  setTheme(theme) {
    BaseController.theme = theme;
  },
  disableStyleSheet() {
    styles.disable();
  },
};