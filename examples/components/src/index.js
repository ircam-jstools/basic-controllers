import * as controllers from '../../../dist/index';

// components
const title1 = new controllers.Title({
  label: 'Title',
  container: '#container'
});

const triggerButtons = new controllers.TriggerButtons({
  label: 'TriggerButtons',
  options: ['light', 'grey', 'dark'],
  container: '#container',
  callback: (theme) => {
    console.log('Button =>', theme);

    switch (theme) {
      case 'light':
        document.body.style.backgroundColor = '#ffffff';
        break;
      case 'grey':
        document.body.style.backgroundColor = '#000000';
        break;
      case 'dark':
        document.body.style.backgroundColor = '#000000';
        break;
    }

    controllers.setTheme(theme);
  },
});

const numberBox = new controllers.NumberBox({
  label: 'NumberBox',
  min: 0,
  max: 10,
  step: 0.1,
  default: 5,
  container: '#container',
  callback: (value) => console.log('Number =>', value),
});

const toggle = new controllers.Toggle({
  label: 'Toggle',
  active: false,
  container: '#container',
  callback: (active) => {
    console.log('Toggle =>', active);

    if (active)
      numberBox.value = Math.PI;
  }
});

const info = new controllers.Text({
  label: 'Info',
  default: 'read-only value',
  readonly: true,
  container: '#container',
});

const text = new controllers.Text({
  label: 'Text',
  default: 'default value',
  readonly: false,
  container: '#container',
  callback: (value) => {
    console.log('Text =>', value);
    info.value = value;
  },
});

const selectList = new controllers.SelectList({
  label: 'SelectList',
  options: ['standby', 'run', 'end'],
  default: 'run',
  container: '#container',
  callback: (value) => {
    console.log('SelectList =>', value);

    info.value = value;
    selectButtons.value = value;
  },
});

const selectButtons = new controllers.SelectButtons({
  label: 'SelectButtons',
  options: ['standby', 'run', 'end'],
  default: 'run',
  container: '#container',
  callback: (value) => {
    console.log('SelectButtons =>', value);

    info.value = value;
    selectList.value = value;
  }
});

// group
const group = new controllers.Group({
  label: 'Group',
  default: 'opened',
  container: '#container'
});

const groupSlider = new controllers.Slider({
  label: 'Group Slider',
  min: 20,
  max: 1000,
  step: 1,
  default: 200,
  unit: 'Hz',
  size: 'large',
  container: group,
  callback: (value) => console.log('Group - Slider =>', value),
});

const groupText = new controllers.Text({
  label: 'Group Text',
  default: 'text input',
  readonly: false,
  container: group,
  callback: (value) => console.log('Group - Text =>', value),
});

// // sliders
const title2 = new controllers.Title({
  label: 'Sliders',
  container: '#container',
});

const sliderLarge = new controllers.Slider({
  label: 'Slider (large)',
  min: 20,
  max: 1000,
  step: 1,
  default: 537,
  unit: 'Hz',
  size: 'large',
  container: '#container',
  callback: (value) => console.log('Slider (large) =>', value),
});

const sliderMedium = new controllers.Slider({
  label: 'Slider (default / medium)',
  min: 20,
  max: 1000,
  step: 1,
  default: 225,
  unit: 'm.s<sup>-1</sup>',
  size: 'medium',
  container: '#container',
  callback: (value) => console.log('Slider (default) =>', value),
});

const sliderSmall = new controllers.Slider({
  label: 'Slider (small)',
  min: 20,
  max: 1000,
  step: 1,
  default: 660,
  size: 'small',
  container: '#container',
  callback: (value) => console.log('Slider (small) =>', value),
});

const title3 = new controllers.Title({
  label: 'DragNDrop',
  container: '#container',
});

const dragNDrop = new controllers.DragAndDrop({
  container: '#container',
  callback: (results) => console.log(results),
});
