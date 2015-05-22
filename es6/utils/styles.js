const pkg = require('../../package.json');
const styles = require('../css/styles.js');

const ns = pkg.name;
const nsClass = `.${ns}`;

module.exports.insertStyleSheet = function(...names) {
  const $style = document.createElement('style');

  $style.setAttribute('data-namespace', ns);
  $style.innerHTML = styles;

  // allow overriding by adding styles in <body>
  document.head.appendChild($style);
};

module.exports.ns = ns;
