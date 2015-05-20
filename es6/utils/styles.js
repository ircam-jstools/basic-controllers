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
    const value = styles[key];
    props.push(`${key}: ${value}`);
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
  'display': 'block',
  'padding': '3px',
  'margin': '2px',
  'background-color': '#efefef',
  'border': '1px solid #aaaaaa',
  'box-sizing': 'border-box',
  'border-radius': '2px',
  'display': 'inline-flex',
  'flex-wrap': 'no-wrap'
};

// @TODO remove
module.exports.containerLargeStyles = {
  width: '660px',
  height: '30px',
  display: 'block',
  padding: '3px',
  margin: '2px',
  backgroundColor: '#efefef',
  border: '1px solid #aaaaaa',
  boxSizing: 'border-box'
};

module.exports.transparentContainerStyles = {
  width: '660px',
  height: '30px',
  display: 'block',
  padding: '8px 0px 0px 0px',
  margin: '2px',
  backgroundColor: 'transparent',
  border: '0px',
  boxSizing: 'border-box'
};

module.exports.legendStyles = {
  'color': '#464646',
  'font': 'italic bold 12px arial',
  'line-height': '22px',
  'overflow': 'hidden',
  'text-align': 'right',
  'padding': '0 6px 0 0',
  'flex-grow': 1
};

// Buttons styles
module.exports.innerWrapper = {
  'display': 'inline-flex',
  'flex-wrap': 'no-wrap',
  'flex-grow': 4
};

// ---------------------------------------------
// Title styles
// ---------------------------------------------

module.exports.titleContainerStyles = {
  display: 'inline-block',
  width: '660px',
  position: 'relative',
  top: '-8px',
  padding: '8px 0px 0px 0px'
};

module.exports.titleStyles = {
  color: '#464646',
  font: 'normal bold 12px arial',
  lineHeight: '22px',
  height: '22px',
  display: 'inline-block',
  width: '660px',
  overflow: 'hidden',
  textAlign: 'left',
  padding: 0,
  paddingLeft: '3px',
  boxSizing: 'border-box'
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
  'margin-right': '4px',
  'box-sizing': 'border-box',
  'border-radius': '2px',
  'cursor': 'pointer',
  'flex-grow': 1
};

module.exports.buttonActiveStyles = {
  'background-color': '#686868'
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

// ---------------------------------------------
// Toggle container
// ---------------------------------------------

module.exports.toggleContainer = {
  padding: 0,
  margin: 0,
  width: '19px',
  height: '19px',
  backgroundColor: '#464646',
  display: 'inline-block',
  cursor: 'pointer',
  position: 'relative',
  top: '-1px'
};

module.exports.toggleActive = {
  padding: 0,
  margin: 0,
  width: '19px',
  height: '19px',
  // backgroundColor: 'green'
};

module.exports.x1 = {
  width: '1px',
  height: '19px',
  transform: 'rotate(45deg)',
  backgroundColor: '#efefef',
  position: 'relative',
  left: '9px'
};

module.exports.x2 = {
  width: '1px',
  height: '19px',
  transform: 'rotate(-45deg)',
  backgroundColor: '#efefef',
  position: 'relative',
  left: '9px',
  top: '-19px'
};

