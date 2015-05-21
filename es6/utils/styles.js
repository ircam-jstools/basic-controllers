const pkg = require('../../package.json');
const styles = require('../css/styles.js');
// create a global stylesheet
let styleSheet;
// create a runtime css namespace
const ns = pkg.name;
const nsClass = `.${ns}`;
const cssMap = new Map();

module.exports.ns = ns;

module.exports.insertStyleSheet = function(...names) {
  const $style = document.createElement('style');

  $style.setAttribute('data-created-by', ns);
  $style.innerHTML = styles;

  document.body.appendChild($style);
}

// remove all the folowing...

// create a style sheet to insert css rules
function createStyleSheet() {
  const styleEl = document.createElement('style');
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

  // write a rule only once
  if (cssMap.has(rule) && cssMap.get(rule) === selector) {
    return;
  }

  cssMap.set(rule, selector);
  // styleSheet.insertRule(rule, styleSheet.cssRules.length);
};



module.exports.rangeDefaultStyles = {
  'height': '22px',
  'display': 'inline-block',
  'margin': 0,
  '-webkit-flex-grow': 4,
  'flex-grow': 4
};

module.exports.numberDefaultController = {
  'display': 'inline',
  'height': '22px',
  'text-align': 'right',
  '-webkit-flex-grow': 3,
  'flex-grow': 3,
};

// large
module.exports.rangeLargeStyles = {
  '-webkit-flex-grow': 50,
  'flex-grow': 50
};

module.exports.numberLargeController = {
  '-webkit-flex-grow': 1,
  'flex-grow': 1,
};

// small
module.exports.rangeSmallStyles = {
  '-webkit-flex-grow': 1,
  'flex-grow': 1
};

module.exports.numberSmallController = {
  '-webkit-flex-grow': 7,
  'flex-grow': 7,
};


module.exports.numberStyles = {
  'height': '22px',
  'width': '54px',
  'position': 'relative',
  'left': '5px',
  'font': 'normal normal 12px arial',
  'border': 'none',
  'background': 'none',
  'padding': '0 0 0 4px',
  'display': 'inline-block',
  'text-align': 'right'
};

module.exports.unitStyles = {
  'font': 'italic normal 12px arial',
  'lineHeight': '22px',
  'height': '22px',
  'width': '30px',
  'display': 'inline-block',
  'position': 'relative',
  'padding-left': '5px',
  'padding-right': '5px',
  'color': '#565656'
};

