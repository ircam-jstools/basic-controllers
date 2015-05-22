new wavesBasicControllers.Title('Title example', '#container');

new wavesBasicControllers.Buttons('Buttons example', ['light', 'dark'], '#container', function(theme) {
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

new wavesBasicControllers.Toggle('Toggle example', false, '#container', function(value) {
  console.log('TOGGLE =>', value);
});

new wavesBasicControllers.Title('Sliders', '#container');

new wavesBasicControllers.Slider('Slider large', 20, 1000, 1, 537, 'Hz', 'large', '#container', function(value) {
  console.log('SLIDER LARGE =>', value);
});

new wavesBasicControllers.Slider('Slider default / medium', 20, 1000, 1, 225, 'm.s<sup>-1</sup>', 'default', '#container', function(value) {
  console.log('SLIDER DEFAULT =>', value);
});

new wavesBasicControllers.Slider('Slider small', 20, 1000, 1, 660, '', 'small', '#container', function(value) {
  console.log('SLIDER SMALL =>', value);
});