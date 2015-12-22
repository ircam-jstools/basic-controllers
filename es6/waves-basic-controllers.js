import * as styles from './utils/styles';

// expose for plugins
import BaseController from './components/base-controller';
import Buttons from './components/buttons';
import Info from './components/info';
import NumberBox from './components/number-box';
import SelectButtons from './components/select-buttons';
import SelectList from './components/select-list';
import Slider from './components/slider';
import Title from './components/title';
import Toggle from './components/toggle';
// Breakpoint: require('./dist/breakpoint'),

export default {
  BaseController,
  Buttons,
  Info,
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
  disableStyles() {
    styles.disable();
  },
};