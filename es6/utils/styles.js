// create a global stylesheet
let styleSheet;
// create a runtime css namespace
const ns = 'waves-basic-controllers';
const nsClass = `.${ns}`;
module.exports.ns = ns;

// create a style sheet to insert css rules
function createStyleSheet() {
  let styleEl = document.createElement('style');
  document.head.appendChild(styleEl);
  styleSheet = styleEl.sheet;
}

module.exports.insertRules = function(selector, styles) {
  if (!styleSheet) { createStyleSheet(); }

  selector = selector === null ? nsClass : `${nsClass}${selector}`;
  var props = [];

  for (let key in styles) {
    let values = styles[key];
    values = Array.isArray(values) ? values : [values];
    values.forEach((value) => props.push(`${key}: ${value}`));
  }

  const rule = `${selector} { ${props.join(';\n')} }`;
  styleSheet.insertRule(rule, styleSheet.cssRules.length);
};


// ---------------------------------------------
// common styles
// ---------------------------------------------

module.exports.containerStyles = {
  'width': '100%',
  'height': '30px',
  'padding': '3px',
  'margin': '2px',
  'background-color': '#efefef',
  'border': '1px solid #aaaaaa',
  'box-sizing': 'border-box',
  'border-radius': '2px',
  'display': 'block',
  'color': '#464646'
};

// @TODO remove
// module.exports.containerLargeStyles = {
//   width: '660px',
//   height: '30px',
//   display: 'block',
//   padding: '3px',
//   margin: '2px',
//   backgroundColor: '#efefef',
//   border: '1px solid #aaaaaa',
//   boxSizing: 'border-box'
// };

// module.exports.transparentContainerStyles = {
//   width: '660px',
//   height: '30px',
//   display: 'block',
//   padding: '8px 0px 0px 0px',
//   margin: '2px',
//   backgroundColor: 'transparent',
//   border: '0px',
//   boxSizing: 'border-box'
// };

module.exports.legendStyles = {
  'font': 'italic bold 12px arial',
  'line-height': '22px',
  'overflow': 'hidden',
  'text-align': 'right',
  'padding': '0 8px 0 0',
  'display': 'block',
  'box-sizing': 'border-box',
  'width': '24%',
  'float': 'left',
  'white-space': 'nowrap'
};

// Buttons styles
// @NOTE problem with strict mode => cannot redefine keys
module.exports.innerWrapper = {
  'display': ['-webkit-inline-flex', 'inline-flex'],
  '-webkit-flex-wrap': 'no-wrap',
  'flex-wrap': 'no-wrap',
  'width': '76%',
  'float': 'left'
};

// ---------------------------------------------
// Title styles
// ---------------------------------------------

module.exports.titleContainerStyles = {
  'border': 'none',
  'margin-bottom': 0,
  'padding-bottom': 0,
  'background-color': 'transparent',
  'height': '25px'
};

module.exports.titleStyles = {
  'font': 'normal bold 13px arial',
  'line-height': '22px',
  'height': '22px',
  'overflow': 'hidden',
  'text-align': 'left',
  'padding': '0 0 0 3px',
  'box-sizing': 'border-box',
  '-webkit-flex-grow': 1,
  'flex-grow': 1
};

// ---------------------------------------------
// Buttons styles
// ---------------------------------------------

module.exports.buttonStyles = {
  'font': 'normal normal 12px arial',
  'height': '22px',
  'border': 'none',
  'background-color': '#464646',
  'color': '#ffffff',
  'margin': '0 4px 0 0',
  'box-sizing': 'border-box',
  'border-radius': '2px',
  'cursor': 'pointer',
  '-webkit-flex-grow': 1,
  'flex-grow': 1
};

module.exports.buttonActiveStyles = {
  'background-color': '#686868'
};


// ---------------------------------------------
// Toggle container
// ---------------------------------------------

module.exports.toggleStyles = {
  'padding': 0,
  'margin': 0,
  'width': '19px',
  'height': '19px',
  'background-color': '#464646',
  'flex-row': 1,
  'position': 'relative',
  'top': '1px',
  'cursor': 'pointer',
  'border-radius': '2px'
};

module.exports.x = {
  'width': '1px',
  'height': '19px',
  'background-color': '#efefef',
  'position': 'absolute',
  'left': '9px',
  'display': 'none'
};

module.exports.xActive = {
  'display': 'block'
};

module.exports.x1 = {
  '-webkit-transform': 'rotate(45deg)',
  'transform': 'rotate(45deg)',
};

module.exports.x2 = {
  '-webkit-transform': 'rotate(-45deg)',
  'transform': 'rotate(-45deg)',
};

// ---------------------------------------------
// Slider styles
// ---------------------------------------------

module.exports.rangeDefaultStyles = {
  height: '22px',
  width: '200px',
  display: 'inline-block',
};

module.exports.rangeLargeStyles = {
  height: '22px',
  width: '400px',
  display: 'inline-block',
};

module.exports.numberStyles = {
  height: '22px',
  width: '54px',
  position: 'relative',
  top: '-7px',
  left: '5px',
  font: 'normal normal 12px arial',
  border: 'none',
  background: 'none',
  paddingLeft: '4px',
  display: 'inline-block',
  textAlign: 'right'
};

module.exports.unitStyles = {
  font: 'italic normal 12px arial',
  lineHeight: '22px',
  height: '22px',
  display: 'inline-block',
  position: 'relative',
  top: '-7px',
  paddingLeft: '5px',
  color: '#565656'
};

