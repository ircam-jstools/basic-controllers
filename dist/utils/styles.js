'use strict';

var _Map = require('babel-runtime/core-js/map')['default'];

var pkg = require('../../package.json');
var styles = require('../css/styles.js');
// create a global stylesheet
var styleSheet = undefined;
// create a runtime css namespace
var ns = pkg.name;
var nsClass = '.' + ns;
var cssMap = new _Map();

module.exports.ns = ns;

module.exports.insertStyleSheet = function () {
  for (var _len = arguments.length, names = Array(_len), _key = 0; _key < _len; _key++) {
    names[_key] = arguments[_key];
  }

  var $style = document.createElement('style');

  $style.setAttribute('data-created-by', ns);
  $style.innerHTML = styles;

  document.body.appendChild($style);
};

// remove all the folowing...

// create a style sheet to insert css rules
function createStyleSheet() {
  var styleEl = document.createElement('style');
  document.head.appendChild(styleEl);
  styleSheet = styleEl.sheet;
}

module.exports.insertRules = function (selector, styles) {
  if (!styleSheet) {
    createStyleSheet();
  }

  selector = selector === null ? nsClass : '' + nsClass + '' + selector;
  var props = [];

  var _loop = function (key) {
    var values = styles[key];
    values = Array.isArray(values) ? values : [values];
    values.forEach(function (value) {
      return props.push('' + key + ': ' + value);
    });
  };

  for (var key in styles) {
    _loop(key);
  }

  var rule = '' + selector + ' { ' + props.join(';\n') + ' }';

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
  'flex-grow': 3 };

// large
module.exports.rangeLargeStyles = {
  '-webkit-flex-grow': 50,
  'flex-grow': 50
};

module.exports.numberLargeController = {
  '-webkit-flex-grow': 1,
  'flex-grow': 1 };

// small
module.exports.rangeSmallStyles = {
  '-webkit-flex-grow': 1,
  'flex-grow': 1
};

module.exports.numberSmallController = {
  '-webkit-flex-grow': 7,
  'flex-grow': 7 };

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
//# sourceMappingURL=data:application/json;base64,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U0FBTyxFQUFFLFNBQVM7Q0FDbkIsQ0FBQyIsImZpbGUiOiJlczYvdXRpbHMvc3R5bGVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgcGtnID0gcmVxdWlyZSgnLi4vLi4vcGFja2FnZS5qc29uJyk7XG5jb25zdCBzdHlsZXMgPSByZXF1aXJlKCcuLi9jc3Mvc3R5bGVzLmpzJyk7XG4vLyBjcmVhdGUgYSBnbG9iYWwgc3R5bGVzaGVldFxubGV0IHN0eWxlU2hlZXQ7XG4vLyBjcmVhdGUgYSBydW50aW1lIGNzcyBuYW1lc3BhY2VcbmNvbnN0IG5zID0gcGtnLm5hbWU7XG5jb25zdCBuc0NsYXNzID0gYC4ke25zfWA7XG5jb25zdCBjc3NNYXAgPSBuZXcgTWFwKCk7XG5cbm1vZHVsZS5leHBvcnRzLm5zID0gbnM7XG5cbm1vZHVsZS5leHBvcnRzLmluc2VydFN0eWxlU2hlZXQgPSBmdW5jdGlvbiguLi5uYW1lcykge1xuICBjb25zdCAkc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuXG4gICRzdHlsZS5zZXRBdHRyaWJ1dGUoJ2RhdGEtY3JlYXRlZC1ieScsIG5zKTtcbiAgJHN0eWxlLmlubmVySFRNTCA9IHN0eWxlcztcblxuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKCRzdHlsZSk7XG59XG5cbi8vIHJlbW92ZSBhbGwgdGhlIGZvbG93aW5nLi4uXG5cbi8vIGNyZWF0ZSBhIHN0eWxlIHNoZWV0IHRvIGluc2VydCBjc3MgcnVsZXNcbmZ1bmN0aW9uIGNyZWF0ZVN0eWxlU2hlZXQoKSB7XG4gIGNvbnN0IHN0eWxlRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHN0eWxlRWwpO1xuICBzdHlsZVNoZWV0ID0gc3R5bGVFbC5zaGVldDtcbn1cblxubW9kdWxlLmV4cG9ydHMuaW5zZXJ0UnVsZXMgPSBmdW5jdGlvbihzZWxlY3Rvciwgc3R5bGVzKSB7XG4gIGlmICghc3R5bGVTaGVldCkgeyBjcmVhdGVTdHlsZVNoZWV0KCk7IH1cblxuICBzZWxlY3RvciA9IHNlbGVjdG9yID09PSBudWxsID8gbnNDbGFzcyA6IGAke25zQ2xhc3N9JHtzZWxlY3Rvcn1gO1xuICB2YXIgcHJvcHMgPSBbXTtcblxuICBmb3IgKGxldCBrZXkgaW4gc3R5bGVzKSB7XG4gICAgbGV0IHZhbHVlcyA9IHN0eWxlc1trZXldO1xuICAgIHZhbHVlcyA9IEFycmF5LmlzQXJyYXkodmFsdWVzKSA/IHZhbHVlcyA6IFt2YWx1ZXNdO1xuICAgIHZhbHVlcy5mb3JFYWNoKCh2YWx1ZSkgPT4gcHJvcHMucHVzaChgJHtrZXl9OiAke3ZhbHVlfWApKTtcbiAgfVxuXG4gIGNvbnN0IHJ1bGUgPSBgJHtzZWxlY3Rvcn0geyAke3Byb3BzLmpvaW4oJztcXG4nKX0gfWA7XG5cbiAgLy8gd3JpdGUgYSBydWxlIG9ubHkgb25jZVxuICBpZiAoY3NzTWFwLmhhcyhydWxlKSAmJiBjc3NNYXAuZ2V0KHJ1bGUpID09PSBzZWxlY3Rvcikge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNzc01hcC5zZXQocnVsZSwgc2VsZWN0b3IpO1xuICAvLyBzdHlsZVNoZWV0Lmluc2VydFJ1bGUocnVsZSwgc3R5bGVTaGVldC5jc3NSdWxlcy5sZW5ndGgpO1xufTtcblxuXG5cbm1vZHVsZS5leHBvcnRzLnJhbmdlRGVmYXVsdFN0eWxlcyA9IHtcbiAgJ2hlaWdodCc6ICcyMnB4JyxcbiAgJ2Rpc3BsYXknOiAnaW5saW5lLWJsb2NrJyxcbiAgJ21hcmdpbic6IDAsXG4gICctd2Via2l0LWZsZXgtZ3Jvdyc6IDQsXG4gICdmbGV4LWdyb3cnOiA0XG59O1xuXG5tb2R1bGUuZXhwb3J0cy5udW1iZXJEZWZhdWx0Q29udHJvbGxlciA9IHtcbiAgJ2Rpc3BsYXknOiAnaW5saW5lJyxcbiAgJ2hlaWdodCc6ICcyMnB4JyxcbiAgJ3RleHQtYWxpZ24nOiAncmlnaHQnLFxuICAnLXdlYmtpdC1mbGV4LWdyb3cnOiAzLFxuICAnZmxleC1ncm93JzogMyxcbn07XG5cbi8vIGxhcmdlXG5tb2R1bGUuZXhwb3J0cy5yYW5nZUxhcmdlU3R5bGVzID0ge1xuICAnLXdlYmtpdC1mbGV4LWdyb3cnOiA1MCxcbiAgJ2ZsZXgtZ3Jvdyc6IDUwXG59O1xuXG5tb2R1bGUuZXhwb3J0cy5udW1iZXJMYXJnZUNvbnRyb2xsZXIgPSB7XG4gICctd2Via2l0LWZsZXgtZ3Jvdyc6IDEsXG4gICdmbGV4LWdyb3cnOiAxLFxufTtcblxuLy8gc21hbGxcbm1vZHVsZS5leHBvcnRzLnJhbmdlU21hbGxTdHlsZXMgPSB7XG4gICctd2Via2l0LWZsZXgtZ3Jvdyc6IDEsXG4gICdmbGV4LWdyb3cnOiAxXG59O1xuXG5tb2R1bGUuZXhwb3J0cy5udW1iZXJTbWFsbENvbnRyb2xsZXIgPSB7XG4gICctd2Via2l0LWZsZXgtZ3Jvdyc6IDcsXG4gICdmbGV4LWdyb3cnOiA3LFxufTtcblxuXG5tb2R1bGUuZXhwb3J0cy5udW1iZXJTdHlsZXMgPSB7XG4gICdoZWlnaHQnOiAnMjJweCcsXG4gICd3aWR0aCc6ICc1NHB4JyxcbiAgJ3Bvc2l0aW9uJzogJ3JlbGF0aXZlJyxcbiAgJ2xlZnQnOiAnNXB4JyxcbiAgJ2ZvbnQnOiAnbm9ybWFsIG5vcm1hbCAxMnB4IGFyaWFsJyxcbiAgJ2JvcmRlcic6ICdub25lJyxcbiAgJ2JhY2tncm91bmQnOiAnbm9uZScsXG4gICdwYWRkaW5nJzogJzAgMCAwIDRweCcsXG4gICdkaXNwbGF5JzogJ2lubGluZS1ibG9jaycsXG4gICd0ZXh0LWFsaWduJzogJ3JpZ2h0J1xufTtcblxubW9kdWxlLmV4cG9ydHMudW5pdFN0eWxlcyA9IHtcbiAgJ2ZvbnQnOiAnaXRhbGljIG5vcm1hbCAxMnB4IGFyaWFsJyxcbiAgJ2xpbmVIZWlnaHQnOiAnMjJweCcsXG4gICdoZWlnaHQnOiAnMjJweCcsXG4gICd3aWR0aCc6ICczMHB4JyxcbiAgJ2Rpc3BsYXknOiAnaW5saW5lLWJsb2NrJyxcbiAgJ3Bvc2l0aW9uJzogJ3JlbGF0aXZlJyxcbiAgJ3BhZGRpbmctbGVmdCc6ICc1cHgnLFxuICAncGFkZGluZy1yaWdodCc6ICc1cHgnLFxuICAnY29sb3InOiAnIzU2NTY1Nidcbn07XG5cbiJdfQ==