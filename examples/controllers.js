new wavesBasicControllers.Title('Title example', '#container');

new wavesBasicControllers.Buttons('Buttons example', ['test 1', 'test 2', 'test 3'], '#container', function(value) {
  console.log('BUTTON =>', value);
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

new wavesBasicControllers.Slider('Slider small', 20, 1000, 1, 660, 'beats', 'small', '#container', function(value) {
  console.log('SLIDER SMALL =>', value);
});
