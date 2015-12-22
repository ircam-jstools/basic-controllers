console.log(wavesBasicControllers);

new wavesBasicControllers.Title('Title', '#container');

new wavesBasicControllers.Buttons('Buttons', ['light', 'dark'], '#container', function(theme) {
  console.log('BUTTON =>', theme);
  wavesBasicControllers.setTheme(theme);

  switch (theme) {
    case 'light':
      document.body.style.backgroundColor = '#ffffff';
      break;
    case 'dark':
      document.body.style.backgroundColor = '#000';
      break;
  }
});

new wavesBasicControllers.Toggle('Toggle', false, '#container', function(value) {
  console.log('TOGGLE =>', value);
});

new wavesBasicControllers.NumberBox('NumberBox', 0, 10, 1, 5, '#container', function(value) {
  console.log('NUMBER =>', value);
});

new wavesBasicControllers.SelectList('SelectList', ['standby', 'run', 'end'], 'run', '#container', function(value) {
  console.log('SELECT LIST =>', value);
});

new wavesBasicControllers.SelectButtons('SelectButtons', ['standby', 'run', 'end'], 'run', '#container', function(value) {
  console.log('SELECT BUTTONS =>', value);
});

new wavesBasicControllers.Title('Sliders', '#container');

new wavesBasicControllers.Slider('Slider (large)', 20, 1000, 1, 537, 'Hz', 'large', '#container', function(value) {
  console.log('SLIDER LARGE =>', value);
});

new wavesBasicControllers.Slider('Slider (default / medium)', 20, 1000, 1, 225, 'm.s<sup>-1</sup>', 'default', '#container', function(value) {
  console.log('SLIDER DEFAULT =>', value);
});

new wavesBasicControllers.Slider('Slider (small)', 20, 1000, 1, 660, '', 'small', '#container', function(value) {
  console.log('SLIDER SMALL =>', value);
});