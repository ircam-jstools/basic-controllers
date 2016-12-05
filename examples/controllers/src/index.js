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
      numberBox.value = 0;
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
  }
});

// const selectList = new controllers.SelectList('SelectList', ['standby', 'run', 'end'], 'run', '#container', function(value) {
//   console.log('SelectList =>', value);

//   info.value = value;
//   selectButtons.value = value;
// });

// const selectButtons = new controllers.SelectButtons('SelectButtons', ['standby', 'run', 'end'], 'run', '#container', function(value) {
//   console.log('SelectButtons =>', value);

//   info.value = value;
//   selectList.value = value;
// });

// // group
// const group = new controllers.Group('Group', 'opened', '#container');

// const groupSlider = new controllers.Slider('Group Slider', 20, 1000, 1, 200, 'Hz', 'large', group, function(value) {
//   console.log('Group - Slider =>', value);
// });

// const groupText = new controllers.Text('Group Text', 'text input', false,  group, (value) => {
//   console.log('Group - Text =>', value);
//   info.value = value;
// });

// // sliders
// const title2 = new controllers.Title('Sliders', '#container');

// const sliderLarge = new controllers.Slider('Slider (large)', 20, 1000, 1, 537, 'Hz', 'large', '#container', function(value) {
//   console.log('Slider (large) =>', value);
// });

// const sliderDefault = new controllers.Slider('Slider (default / medium)', 20, 1000, 1, 225, 'm.s<sup>-1</sup>', 'default', '#container', function(value) {
//   console.log('Slider (default) =>', value);
// });

// const sliderSmall = new controllers.Slider('Slider (small)', 20, 1000, 1, 660, '', 'small', '#container', function(value) {
//   console.log('Slider (small) =>', value);
// });
