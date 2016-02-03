import pkg from '../../package.json';
import styles from '../css/styles.js';

export const ns = pkg.name;

const nsClass = `.${ns}`;
let _disable = false;

export function disable() {
  _disable = true;
}

export function insertStyleSheet() {
  if (_disable) { return; }
  const $style = document.createElement('style');

  $style.setAttribute('data-namespace', ns);
  $style.innerHTML = styles;

  document.body.appendChild($style);
}

