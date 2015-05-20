// create a global stylesheet
'use strict';

var styleSheet = undefined;
// create a runtime css namespace
var ns = 'waves-basic-controllers';
var nsClass = '.' + ns;

module.exports.ns = ns;

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
  'padding-top': '6px',
  'background-color': 'transparent',
  'height': '25px'
};

module.exports.titleStyles = {
  'font': 'normal bold 13px arial',
  'line-height': '22px',
  'height': '22px',
  'overflow': 'hidden',
  'text-align': 'left',
  // 'padding': '0 0 0 3px',
  'padding': '0',
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
  'transform': 'rotate(45deg)' };

module.exports.x2 = {
  '-webkit-transform': 'rotate(-45deg)',
  'transform': 'rotate(-45deg)' };

// ---------------------------------------------
// Slider styles
// ---------------------------------------------

// module.exports.sliderInnerWrapper = {
//   'justify-context': 'space-between',
// };

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
//# sourceMappingURL=data:application/json;base64,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RUFBRSxFQUFFO0NBQ2hCLENBQUM7O0FBRUYsTUFBTSxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsR0FBRztBQUNyQyxxQkFBbUIsRUFBRSxDQUFDO0FBQ3RCLGFBQVcsRUFBRSxDQUFDLEVBQ2YsQ0FBQzs7O0FBR0YsTUFBTSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsR0FBRztBQUNoQyxxQkFBbUIsRUFBRSxDQUFDO0FBQ3RCLGFBQVcsRUFBRSxDQUFDO0NBQ2YsQ0FBQzs7QUFFRixNQUFNLENBQUMsT0FBTyxDQUFDLHFCQUFxQixHQUFHO0FBQ3JDLHFCQUFtQixFQUFFLENBQUM7QUFDdEIsYUFBVyxFQUFFLENBQUMsRUFDZixDQUFDOztBQUdGLE1BQU0sQ0FBQyxPQUFPLENBQUMsWUFBWSxHQUFHO0FBQzVCLFVBQVEsRUFBRSxNQUFNO0FBQ2hCLFNBQU8sRUFBRSxNQUFNO0FBQ2YsWUFBVSxFQUFFLFVBQVU7QUFDdEIsUUFBTSxFQUFFLEtBQUs7QUFDYixRQUFNLEVBQUUsMEJBQTBCO0FBQ2xDLFVBQVEsRUFBRSxNQUFNO0FBQ2hCLGNBQVksRUFBRSxNQUFNO0FBQ3BCLFdBQVMsRUFBRSxXQUFXO0FBQ3RCLFdBQVMsRUFBRSxjQUFjO0FBQ3pCLGNBQVksRUFBRSxPQUFPO0NBQ3RCLENBQUM7O0FBRUYsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEdBQUc7QUFDMUIsUUFBTSxFQUFFLDBCQUEwQjtBQUNsQyxjQUFZLEVBQUUsTUFBTTtBQUNwQixVQUFRLEVBQUUsTUFBTTtBQUNoQixTQUFPLEVBQUUsTUFBTTtBQUNmLFdBQVMsRUFBRSxjQUFjO0FBQ3pCLFlBQVUsRUFBRSxVQUFVO0FBQ3RCLGdCQUFjLEVBQUUsS0FBSztBQUNyQixpQkFBZSxFQUFFLEtBQUs7QUFDdEIsU0FBTyxFQUFFLFNBQVM7Q0FDbkIsQ0FBQyIsImZpbGUiOiJlczYvdXRpbHMvc3R5bGVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gY3JlYXRlIGEgZ2xvYmFsIHN0eWxlc2hlZXRcbmxldCBzdHlsZVNoZWV0O1xuLy8gY3JlYXRlIGEgcnVudGltZSBjc3MgbmFtZXNwYWNlXG5jb25zdCBucyA9ICd3YXZlcy1iYXNpYy1jb250cm9sbGVycyc7XG5jb25zdCBuc0NsYXNzID0gYC4ke25zfWA7XG5cbm1vZHVsZS5leHBvcnRzLm5zID0gbnM7XG5cbi8vIGNyZWF0ZSBhIHN0eWxlIHNoZWV0IHRvIGluc2VydCBjc3MgcnVsZXNcbmZ1bmN0aW9uIGNyZWF0ZVN0eWxlU2hlZXQoKSB7XG4gIGxldCBzdHlsZUVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsKTtcbiAgc3R5bGVTaGVldCA9IHN0eWxlRWwuc2hlZXQ7XG59XG5cbm1vZHVsZS5leHBvcnRzLmluc2VydFJ1bGVzID0gZnVuY3Rpb24oc2VsZWN0b3IsIHN0eWxlcykge1xuICBpZiAoIXN0eWxlU2hlZXQpIHsgY3JlYXRlU3R5bGVTaGVldCgpOyB9XG5cbiAgc2VsZWN0b3IgPSBzZWxlY3RvciA9PT0gbnVsbCA/IG5zQ2xhc3MgOiBgJHtuc0NsYXNzfSR7c2VsZWN0b3J9YDtcbiAgdmFyIHByb3BzID0gW107XG5cbiAgZm9yIChsZXQga2V5IGluIHN0eWxlcykge1xuICAgIGxldCB2YWx1ZXMgPSBzdHlsZXNba2V5XTtcbiAgICB2YWx1ZXMgPSBBcnJheS5pc0FycmF5KHZhbHVlcykgPyB2YWx1ZXMgOiBbdmFsdWVzXTtcbiAgICB2YWx1ZXMuZm9yRWFjaCgodmFsdWUpID0+IHByb3BzLnB1c2goYCR7a2V5fTogJHt2YWx1ZX1gKSk7XG4gIH1cblxuICBjb25zdCBydWxlID0gYCR7c2VsZWN0b3J9IHsgJHtwcm9wcy5qb2luKCc7XFxuJyl9IH1gO1xuICBzdHlsZVNoZWV0Lmluc2VydFJ1bGUocnVsZSwgc3R5bGVTaGVldC5jc3NSdWxlcy5sZW5ndGgpO1xufTtcblxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIGNvbW1vbiBzdHlsZXNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5tb2R1bGUuZXhwb3J0cy5jb250YWluZXJTdHlsZXMgPSB7XG4gICd3aWR0aCc6ICcxMDAlJyxcbiAgJ2hlaWdodCc6ICczMHB4JyxcbiAgJ3BhZGRpbmcnOiAnM3B4JyxcbiAgJ21hcmdpbic6ICcycHgnLFxuICAnYmFja2dyb3VuZC1jb2xvcic6ICcjZWZlZmVmJyxcbiAgJ2JvcmRlcic6ICcxcHggc29saWQgI2FhYWFhYScsXG4gICdib3gtc2l6aW5nJzogJ2JvcmRlci1ib3gnLFxuICAnYm9yZGVyLXJhZGl1cyc6ICcycHgnLFxuICAnZGlzcGxheSc6ICdibG9jaycsXG4gICdjb2xvcic6ICcjNDY0NjQ2J1xufTtcblxubW9kdWxlLmV4cG9ydHMubGVnZW5kU3R5bGVzID0ge1xuICAnZm9udCc6ICdpdGFsaWMgYm9sZCAxMnB4IGFyaWFsJyxcbiAgJ2xpbmUtaGVpZ2h0JzogJzIycHgnLFxuICAnb3ZlcmZsb3cnOiAnaGlkZGVuJyxcbiAgJ3RleHQtYWxpZ24nOiAncmlnaHQnLFxuICAncGFkZGluZyc6ICcwIDhweCAwIDAnLFxuICAnZGlzcGxheSc6ICdibG9jaycsXG4gICdib3gtc2l6aW5nJzogJ2JvcmRlci1ib3gnLFxuICAnd2lkdGgnOiAnMjQlJyxcbiAgJ2Zsb2F0JzogJ2xlZnQnLFxuICAnd2hpdGUtc3BhY2UnOiAnbm93cmFwJ1xufTtcblxubW9kdWxlLmV4cG9ydHMuaW5uZXJXcmFwcGVyID0ge1xuICAnZGlzcGxheSc6IFsnLXdlYmtpdC1pbmxpbmUtZmxleCcsICdpbmxpbmUtZmxleCddLFxuICAnLXdlYmtpdC1mbGV4LXdyYXAnOiAnbm8td3JhcCcsXG4gICdmbGV4LXdyYXAnOiAnbm8td3JhcCcsXG4gICd3aWR0aCc6ICc3NiUnLFxuICAnZmxvYXQnOiAnbGVmdCdcbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gVGl0bGUgc3R5bGVzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxubW9kdWxlLmV4cG9ydHMudGl0bGVDb250YWluZXJTdHlsZXMgPSB7XG4gICdib3JkZXInOiAnbm9uZScsXG4gICdtYXJnaW4tYm90dG9tJzogMCxcbiAgJ3BhZGRpbmctYm90dG9tJzogMCxcbiAgJ3BhZGRpbmctdG9wJzogJzZweCcsXG4gICdiYWNrZ3JvdW5kLWNvbG9yJzogJ3RyYW5zcGFyZW50JyxcbiAgJ2hlaWdodCc6ICcyNXB4J1xufTtcblxubW9kdWxlLmV4cG9ydHMudGl0bGVTdHlsZXMgPSB7XG4gICdmb250JzogJ25vcm1hbCBib2xkIDEzcHggYXJpYWwnLFxuICAnbGluZS1oZWlnaHQnOiAnMjJweCcsXG4gICdoZWlnaHQnOiAnMjJweCcsXG4gICdvdmVyZmxvdyc6ICdoaWRkZW4nLFxuICAndGV4dC1hbGlnbic6ICdsZWZ0JyxcbiAgLy8gJ3BhZGRpbmcnOiAnMCAwIDAgM3B4JyxcbiAgJ3BhZGRpbmcnOiAnMCcsXG4gICdib3gtc2l6aW5nJzogJ2JvcmRlci1ib3gnLFxuICAnLXdlYmtpdC1mbGV4LWdyb3cnOiAxLFxuICAnZmxleC1ncm93JzogMVxufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBCdXR0b25zIHN0eWxlc1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbm1vZHVsZS5leHBvcnRzLmJ1dHRvblN0eWxlcyA9IHtcbiAgJ2ZvbnQnOiAnbm9ybWFsIG5vcm1hbCAxMnB4IGFyaWFsJyxcbiAgJ2hlaWdodCc6ICcyMnB4JyxcbiAgJ2JvcmRlcic6ICdub25lJyxcbiAgJ2JhY2tncm91bmQtY29sb3InOiAnIzQ2NDY0NicsXG4gICdjb2xvcic6ICcjZmZmZmZmJyxcbiAgJ21hcmdpbic6ICcwIDRweCAwIDAnLFxuICAnYm94LXNpemluZyc6ICdib3JkZXItYm94JyxcbiAgJ2JvcmRlci1yYWRpdXMnOiAnMnB4JyxcbiAgJ2N1cnNvcic6ICdwb2ludGVyJyxcbiAgJy13ZWJraXQtZmxleC1ncm93JzogMSxcbiAgJ2ZsZXgtZ3Jvdyc6IDFcbn07XG5cbm1vZHVsZS5leHBvcnRzLmJ1dHRvbkFjdGl2ZVN0eWxlcyA9IHtcbiAgJ2JhY2tncm91bmQtY29sb3InOiAnIzY4Njg2OCdcbn07XG5cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBUb2dnbGUgY29udGFpbmVyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxubW9kdWxlLmV4cG9ydHMudG9nZ2xlU3R5bGVzID0ge1xuICAncGFkZGluZyc6IDAsXG4gICdtYXJnaW4nOiAwLFxuICAnd2lkdGgnOiAnMTlweCcsXG4gICdoZWlnaHQnOiAnMTlweCcsXG4gICdiYWNrZ3JvdW5kLWNvbG9yJzogJyM0NjQ2NDYnLFxuICAnZmxleC1yb3cnOiAxLFxuICAncG9zaXRpb24nOiAncmVsYXRpdmUnLFxuICAndG9wJzogJzFweCcsXG4gICdjdXJzb3InOiAncG9pbnRlcicsXG4gICdib3JkZXItcmFkaXVzJzogJzJweCdcbn07XG5cbm1vZHVsZS5leHBvcnRzLnggPSB7XG4gICd3aWR0aCc6ICcxcHgnLFxuICAnaGVpZ2h0JzogJzE5cHgnLFxuICAnYmFja2dyb3VuZC1jb2xvcic6ICcjZWZlZmVmJyxcbiAgJ3Bvc2l0aW9uJzogJ2Fic29sdXRlJyxcbiAgJ2xlZnQnOiAnOXB4JyxcbiAgJ2Rpc3BsYXknOiAnbm9uZSdcbn07XG5cbm1vZHVsZS5leHBvcnRzLnhBY3RpdmUgPSB7XG4gICdkaXNwbGF5JzogJ2Jsb2NrJ1xufTtcblxubW9kdWxlLmV4cG9ydHMueDEgPSB7XG4gICctd2Via2l0LXRyYW5zZm9ybSc6ICdyb3RhdGUoNDVkZWcpJyxcbiAgJ3RyYW5zZm9ybSc6ICdyb3RhdGUoNDVkZWcpJyxcbn07XG5cbm1vZHVsZS5leHBvcnRzLngyID0ge1xuICAnLXdlYmtpdC10cmFuc2Zvcm0nOiAncm90YXRlKC00NWRlZyknLFxuICAndHJhbnNmb3JtJzogJ3JvdGF0ZSgtNDVkZWcpJyxcbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gU2xpZGVyIHN0eWxlc1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbi8vIG1vZHVsZS5leHBvcnRzLnNsaWRlcklubmVyV3JhcHBlciA9IHtcbi8vICAgJ2p1c3RpZnktY29udGV4dCc6ICdzcGFjZS1iZXR3ZWVuJyxcbi8vIH07XG5cbm1vZHVsZS5leHBvcnRzLnJhbmdlRGVmYXVsdFN0eWxlcyA9IHtcbiAgJ2hlaWdodCc6ICcyMnB4JyxcbiAgJ2Rpc3BsYXknOiAnaW5saW5lLWJsb2NrJyxcbiAgJ21hcmdpbic6IDAsXG4gICctd2Via2l0LWZsZXgtZ3Jvdyc6IDQsXG4gICdmbGV4LWdyb3cnOiA0XG59O1xuXG5tb2R1bGUuZXhwb3J0cy5udW1iZXJEZWZhdWx0Q29udHJvbGxlciA9IHtcbiAgJ2Rpc3BsYXknOiAnaW5saW5lJyxcbiAgJ2hlaWdodCc6ICcyMnB4JyxcbiAgJ3RleHQtYWxpZ24nOiAncmlnaHQnLFxuICAnLXdlYmtpdC1mbGV4LWdyb3cnOiAzLFxuICAnZmxleC1ncm93JzogMyxcbn07XG5cbi8vIGxhcmdlXG5tb2R1bGUuZXhwb3J0cy5yYW5nZUxhcmdlU3R5bGVzID0ge1xuICAnLXdlYmtpdC1mbGV4LWdyb3cnOiA1MCxcbiAgJ2ZsZXgtZ3Jvdyc6IDUwXG59O1xuXG5tb2R1bGUuZXhwb3J0cy5udW1iZXJMYXJnZUNvbnRyb2xsZXIgPSB7XG4gICctd2Via2l0LWZsZXgtZ3Jvdyc6IDEsXG4gICdmbGV4LWdyb3cnOiAxLFxufTtcblxuLy8gc21hbGxcbm1vZHVsZS5leHBvcnRzLnJhbmdlU21hbGxTdHlsZXMgPSB7XG4gICctd2Via2l0LWZsZXgtZ3Jvdyc6IDEsXG4gICdmbGV4LWdyb3cnOiAxXG59O1xuXG5tb2R1bGUuZXhwb3J0cy5udW1iZXJTbWFsbENvbnRyb2xsZXIgPSB7XG4gICctd2Via2l0LWZsZXgtZ3Jvdyc6IDcsXG4gICdmbGV4LWdyb3cnOiA3LFxufTtcblxuXG5tb2R1bGUuZXhwb3J0cy5udW1iZXJTdHlsZXMgPSB7XG4gICdoZWlnaHQnOiAnMjJweCcsXG4gICd3aWR0aCc6ICc1NHB4JyxcbiAgJ3Bvc2l0aW9uJzogJ3JlbGF0aXZlJyxcbiAgJ2xlZnQnOiAnNXB4JyxcbiAgJ2ZvbnQnOiAnbm9ybWFsIG5vcm1hbCAxMnB4IGFyaWFsJyxcbiAgJ2JvcmRlcic6ICdub25lJyxcbiAgJ2JhY2tncm91bmQnOiAnbm9uZScsXG4gICdwYWRkaW5nJzogJzAgMCAwIDRweCcsXG4gICdkaXNwbGF5JzogJ2lubGluZS1ibG9jaycsXG4gICd0ZXh0LWFsaWduJzogJ3JpZ2h0J1xufTtcblxubW9kdWxlLmV4cG9ydHMudW5pdFN0eWxlcyA9IHtcbiAgJ2ZvbnQnOiAnaXRhbGljIG5vcm1hbCAxMnB4IGFyaWFsJyxcbiAgJ2xpbmVIZWlnaHQnOiAnMjJweCcsXG4gICdoZWlnaHQnOiAnMjJweCcsXG4gICd3aWR0aCc6ICczMHB4JyxcbiAgJ2Rpc3BsYXknOiAnaW5saW5lLWJsb2NrJyxcbiAgJ3Bvc2l0aW9uJzogJ3JlbGF0aXZlJyxcbiAgJ3BhZGRpbmctbGVmdCc6ICc1cHgnLFxuICAncGFkZGluZy1yaWdodCc6ICc1cHgnLFxuICAnY29sb3InOiAnIzU2NTY1Nidcbn07XG5cbiJdfQ==