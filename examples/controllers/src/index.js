import * as controllers from '../../../dist/index';

const title1 = new controllers.Title('Title', '#container');

const triggerButtons = new controllers.TriggerButtons('TriggerButtons', ['light', 'dark', 'soundworks'], '#container', function(theme) {
  console.log('Button =>', theme);
  controllers.setTheme(theme);

  switch (theme) {
    case 'light':
      document.body.style.backgroundColor = '#ffffff';
      break;
    case 'dark':
    case 'soundworks':
      document.body.style.backgroundColor = '#000';
      break;
  }
});

const numberBox = new controllers.NumberBox('NumberBox', 0, 10, 1, 5, '#container', function(value) {
  console.log('Number =>', value);
});

const toggle = new controllers.Toggle('Toggle', false, '#container', function(active) {
  console.log('Toggle =>', active);

  if (active)
    numberBox.value = 0;
});

const info = new controllers.Text('Info', 'read-only value', true, '#container');

const text = new controllers.Text('Text', 'changable value', false,  '#container', (value) => {
  console.log('Text =>', value);
  info.value = value;
});

const selectList = new controllers.SelectList('SelectList', ['standby', 'run', 'end'], 'run', '#container', function(value) {
  console.log('SelectList =>', value);

  info.value = value;
  selectButtons.value = value;
});

const selectButtons = new controllers.SelectButtons('SelectButtons', ['standby', 'run', 'end'], 'run', '#container', function(value) {
  console.log('SelectButtons =>', value);

  info.value = value;
  selectList.value = value;
});

const title2 = new controllers.Title('Sliders', '#container');

const sliderLarge = new controllers.Slider('Slider (large)', 20, 1000, 1, 537, 'Hz', 'large', '#container', function(value) {
  console.log('Slider (large) =>', value);
});

const sliderDefault = new controllers.Slider('Slider (default / medium)', 20, 1000, 1, 225, 'm.s<sup>-1</sup>', 'default', '#container', function(value) {
  console.log('Slider (default) =>', value);
});

const sliderSmall = new controllers.Slider('Slider (small)', 20, 1000, 1, 660, '', 'small', '#container', function(value) {
  console.log('Slider (small) =>', value);
});
