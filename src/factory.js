import Group from './components/Group';
import NumberBox from './components/NumberBox';
import SelectButtons from './components/SelectButtons';
import SelectList from './components/SelectList';
import Slider from './components/Slider';
import Text from './components/Text';
import Title from './components/Title';
import Toggle from './components/Toggle';
import TriggerButtons from './components/TriggerButtons';

const typeCtorMap = {
  'group': Group,
  'number-box': NumberBox,
  'select-buttons': SelectButtons,
  'select-list': SelectList,
  'slider': Slider,
  'text': Text,
  'title': Title,
  'toggle': Toggle,
  'trigger-buttons': TriggerButtons,
};

function create(container, definitions) {
  definitions.forEach((def, index) => {
    const type = def.type;
    const ctor = typeCtorMap[type];
    const config = Object.assign({}, def);

    //
    config.container = container;
    delete config.type;

    const component = new ctor(config);

    if (type === 'group')
      create(component, config.elements);
  });
}

export default create;
