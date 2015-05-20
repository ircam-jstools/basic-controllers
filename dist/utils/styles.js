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
  'transform': 'rotate(45deg)' };

module.exports.x2 = {
  '-webkit-transform': 'rotate(-45deg)',
  'transform': 'rotate(-45deg)' };

// ---------------------------------------------
// Slider styles
// ---------------------------------------------

module.exports.rangeDefaultStyles = {
  height: '22px',
  width: '200px',
  display: 'inline-block' };

module.exports.rangeLargeStyles = {
  height: '22px',
  width: '400px',
  display: 'inline-block' };

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
//# sourceMappingURL=data:application/json;base64,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Q2hDLFFBQU0sRUFBRSxNQUFNO0FBQ2QsWUFBVSxFQUFFLE1BQU07QUFDbEIsYUFBVyxFQUFFLEtBQUs7QUFDbEIsU0FBTyxFQUFFLGNBQWM7QUFDdkIsV0FBUyxFQUFFLE9BQU87Q0FDbkIsQ0FBQzs7QUFFRixNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsR0FBRztBQUMxQixNQUFJLEVBQUUsMEJBQTBCO0FBQ2hDLFlBQVUsRUFBRSxNQUFNO0FBQ2xCLFFBQU0sRUFBRSxNQUFNO0FBQ2QsU0FBTyxFQUFFLGNBQWM7QUFDdkIsVUFBUSxFQUFFLFVBQVU7QUFDcEIsS0FBRyxFQUFFLE1BQU07QUFDWCxhQUFXLEVBQUUsS0FBSztBQUNsQixPQUFLLEVBQUUsU0FBUztDQUNqQixDQUFDIiwiZmlsZSI6ImVzNi91dGlscy9zdHlsZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBjcmVhdGUgYSBnbG9iYWwgc3R5bGVzaGVldFxubGV0IHN0eWxlU2hlZXQ7XG4vLyBjcmVhdGUgYSBydW50aW1lIGNzcyBuYW1lc3BhY2VcbmNvbnN0IG5zID0gJ3dhdmVzLWJhc2ljLWNvbnRyb2xsZXJzJztcbmNvbnN0IG5zQ2xhc3MgPSBgLiR7bnN9YDtcbm1vZHVsZS5leHBvcnRzLm5zID0gbnM7XG5cbi8vIGNyZWF0ZSBhIHN0eWxlIHNoZWV0IHRvIGluc2VydCBjc3MgcnVsZXNcbmZ1bmN0aW9uIGNyZWF0ZVN0eWxlU2hlZXQoKSB7XG4gIGxldCBzdHlsZUVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsKTtcbiAgc3R5bGVTaGVldCA9IHN0eWxlRWwuc2hlZXQ7XG59XG5cbm1vZHVsZS5leHBvcnRzLmluc2VydFJ1bGVzID0gZnVuY3Rpb24oc2VsZWN0b3IsIHN0eWxlcykge1xuICBpZiAoIXN0eWxlU2hlZXQpIHsgY3JlYXRlU3R5bGVTaGVldCgpOyB9XG5cbiAgc2VsZWN0b3IgPSBzZWxlY3RvciA9PT0gbnVsbCA/IG5zQ2xhc3MgOiBgJHtuc0NsYXNzfSR7c2VsZWN0b3J9YDtcbiAgdmFyIHByb3BzID0gW107XG5cbiAgZm9yIChsZXQga2V5IGluIHN0eWxlcykge1xuICAgIGxldCB2YWx1ZXMgPSBzdHlsZXNba2V5XTtcbiAgICB2YWx1ZXMgPSBBcnJheS5pc0FycmF5KHZhbHVlcykgPyB2YWx1ZXMgOiBbdmFsdWVzXTtcbiAgICB2YWx1ZXMuZm9yRWFjaCgodmFsdWUpID0+IHByb3BzLnB1c2goYCR7a2V5fTogJHt2YWx1ZX1gKSk7XG4gIH1cblxuICBjb25zdCBydWxlID0gYCR7c2VsZWN0b3J9IHsgJHtwcm9wcy5qb2luKCc7XFxuJyl9IH1gO1xuICBzdHlsZVNoZWV0Lmluc2VydFJ1bGUocnVsZSwgc3R5bGVTaGVldC5jc3NSdWxlcy5sZW5ndGgpO1xufTtcblxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIGNvbW1vbiBzdHlsZXNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5tb2R1bGUuZXhwb3J0cy5jb250YWluZXJTdHlsZXMgPSB7XG4gICd3aWR0aCc6ICcxMDAlJyxcbiAgJ2hlaWdodCc6ICczMHB4JyxcbiAgJ3BhZGRpbmcnOiAnM3B4JyxcbiAgJ21hcmdpbic6ICcycHgnLFxuICAnYmFja2dyb3VuZC1jb2xvcic6ICcjZWZlZmVmJyxcbiAgJ2JvcmRlcic6ICcxcHggc29saWQgI2FhYWFhYScsXG4gICdib3gtc2l6aW5nJzogJ2JvcmRlci1ib3gnLFxuICAnYm9yZGVyLXJhZGl1cyc6ICcycHgnLFxuICAnZGlzcGxheSc6ICdibG9jaycsXG4gICdjb2xvcic6ICcjNDY0NjQ2J1xufTtcblxuLy8gQFRPRE8gcmVtb3ZlXG4vLyBtb2R1bGUuZXhwb3J0cy5jb250YWluZXJMYXJnZVN0eWxlcyA9IHtcbi8vICAgd2lkdGg6ICc2NjBweCcsXG4vLyAgIGhlaWdodDogJzMwcHgnLFxuLy8gICBkaXNwbGF5OiAnYmxvY2snLFxuLy8gICBwYWRkaW5nOiAnM3B4Jyxcbi8vICAgbWFyZ2luOiAnMnB4Jyxcbi8vICAgYmFja2dyb3VuZENvbG9yOiAnI2VmZWZlZicsXG4vLyAgIGJvcmRlcjogJzFweCBzb2xpZCAjYWFhYWFhJyxcbi8vICAgYm94U2l6aW5nOiAnYm9yZGVyLWJveCdcbi8vIH07XG5cbi8vIG1vZHVsZS5leHBvcnRzLnRyYW5zcGFyZW50Q29udGFpbmVyU3R5bGVzID0ge1xuLy8gICB3aWR0aDogJzY2MHB4Jyxcbi8vICAgaGVpZ2h0OiAnMzBweCcsXG4vLyAgIGRpc3BsYXk6ICdibG9jaycsXG4vLyAgIHBhZGRpbmc6ICc4cHggMHB4IDBweCAwcHgnLFxuLy8gICBtYXJnaW46ICcycHgnLFxuLy8gICBiYWNrZ3JvdW5kQ29sb3I6ICd0cmFuc3BhcmVudCcsXG4vLyAgIGJvcmRlcjogJzBweCcsXG4vLyAgIGJveFNpemluZzogJ2JvcmRlci1ib3gnXG4vLyB9O1xuXG5tb2R1bGUuZXhwb3J0cy5sZWdlbmRTdHlsZXMgPSB7XG4gICdmb250JzogJ2l0YWxpYyBib2xkIDEycHggYXJpYWwnLFxuICAnbGluZS1oZWlnaHQnOiAnMjJweCcsXG4gICdvdmVyZmxvdyc6ICdoaWRkZW4nLFxuICAndGV4dC1hbGlnbic6ICdyaWdodCcsXG4gICdwYWRkaW5nJzogJzAgOHB4IDAgMCcsXG4gICdkaXNwbGF5JzogJ2Jsb2NrJyxcbiAgJ2JveC1zaXppbmcnOiAnYm9yZGVyLWJveCcsXG4gICd3aWR0aCc6ICcyNCUnLFxuICAnZmxvYXQnOiAnbGVmdCcsXG4gICd3aGl0ZS1zcGFjZSc6ICdub3dyYXAnXG59O1xuXG4vLyBCdXR0b25zIHN0eWxlc1xuLy8gQE5PVEUgcHJvYmxlbSB3aXRoIHN0cmljdCBtb2RlID0+IGNhbm5vdCByZWRlZmluZSBrZXlzXG5tb2R1bGUuZXhwb3J0cy5pbm5lcldyYXBwZXIgPSB7XG4gICdkaXNwbGF5JzogWyctd2Via2l0LWlubGluZS1mbGV4JywgJ2lubGluZS1mbGV4J10sXG4gICctd2Via2l0LWZsZXgtd3JhcCc6ICduby13cmFwJyxcbiAgJ2ZsZXgtd3JhcCc6ICduby13cmFwJyxcbiAgJ3dpZHRoJzogJzc2JScsXG4gICdmbG9hdCc6ICdsZWZ0J1xufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBUaXRsZSBzdHlsZXNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5tb2R1bGUuZXhwb3J0cy50aXRsZUNvbnRhaW5lclN0eWxlcyA9IHtcbiAgJ2JvcmRlcic6ICdub25lJyxcbiAgJ21hcmdpbi1ib3R0b20nOiAwLFxuICAncGFkZGluZy1ib3R0b20nOiAwLFxuICAnYmFja2dyb3VuZC1jb2xvcic6ICd0cmFuc3BhcmVudCcsXG4gICdoZWlnaHQnOiAnMjVweCdcbn07XG5cbm1vZHVsZS5leHBvcnRzLnRpdGxlU3R5bGVzID0ge1xuICAnZm9udCc6ICdub3JtYWwgYm9sZCAxM3B4IGFyaWFsJyxcbiAgJ2xpbmUtaGVpZ2h0JzogJzIycHgnLFxuICAnaGVpZ2h0JzogJzIycHgnLFxuICAnb3ZlcmZsb3cnOiAnaGlkZGVuJyxcbiAgJ3RleHQtYWxpZ24nOiAnbGVmdCcsXG4gICdwYWRkaW5nJzogJzAgMCAwIDNweCcsXG4gICdib3gtc2l6aW5nJzogJ2JvcmRlci1ib3gnLFxuICAnLXdlYmtpdC1mbGV4LWdyb3cnOiAxLFxuICAnZmxleC1ncm93JzogMVxufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBCdXR0b25zIHN0eWxlc1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbm1vZHVsZS5leHBvcnRzLmJ1dHRvblN0eWxlcyA9IHtcbiAgJ2ZvbnQnOiAnbm9ybWFsIG5vcm1hbCAxMnB4IGFyaWFsJyxcbiAgJ2hlaWdodCc6ICcyMnB4JyxcbiAgJ2JvcmRlcic6ICdub25lJyxcbiAgJ2JhY2tncm91bmQtY29sb3InOiAnIzQ2NDY0NicsXG4gICdjb2xvcic6ICcjZmZmZmZmJyxcbiAgJ21hcmdpbic6ICcwIDRweCAwIDAnLFxuICAnYm94LXNpemluZyc6ICdib3JkZXItYm94JyxcbiAgJ2JvcmRlci1yYWRpdXMnOiAnMnB4JyxcbiAgJ2N1cnNvcic6ICdwb2ludGVyJyxcbiAgJy13ZWJraXQtZmxleC1ncm93JzogMSxcbiAgJ2ZsZXgtZ3Jvdyc6IDFcbn07XG5cbm1vZHVsZS5leHBvcnRzLmJ1dHRvbkFjdGl2ZVN0eWxlcyA9IHtcbiAgJ2JhY2tncm91bmQtY29sb3InOiAnIzY4Njg2OCdcbn07XG5cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBUb2dnbGUgY29udGFpbmVyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxubW9kdWxlLmV4cG9ydHMudG9nZ2xlU3R5bGVzID0ge1xuICAncGFkZGluZyc6IDAsXG4gICdtYXJnaW4nOiAwLFxuICAnd2lkdGgnOiAnMTlweCcsXG4gICdoZWlnaHQnOiAnMTlweCcsXG4gICdiYWNrZ3JvdW5kLWNvbG9yJzogJyM0NjQ2NDYnLFxuICAnZmxleC1yb3cnOiAxLFxuICAncG9zaXRpb24nOiAncmVsYXRpdmUnLFxuICAndG9wJzogJzFweCcsXG4gICdjdXJzb3InOiAncG9pbnRlcicsXG4gICdib3JkZXItcmFkaXVzJzogJzJweCdcbn07XG5cbm1vZHVsZS5leHBvcnRzLnggPSB7XG4gICd3aWR0aCc6ICcxcHgnLFxuICAnaGVpZ2h0JzogJzE5cHgnLFxuICAnYmFja2dyb3VuZC1jb2xvcic6ICcjZWZlZmVmJyxcbiAgJ3Bvc2l0aW9uJzogJ2Fic29sdXRlJyxcbiAgJ2xlZnQnOiAnOXB4JyxcbiAgJ2Rpc3BsYXknOiAnbm9uZSdcbn07XG5cbm1vZHVsZS5leHBvcnRzLnhBY3RpdmUgPSB7XG4gICdkaXNwbGF5JzogJ2Jsb2NrJ1xufTtcblxubW9kdWxlLmV4cG9ydHMueDEgPSB7XG4gICctd2Via2l0LXRyYW5zZm9ybSc6ICdyb3RhdGUoNDVkZWcpJyxcbiAgJ3RyYW5zZm9ybSc6ICdyb3RhdGUoNDVkZWcpJyxcbn07XG5cbm1vZHVsZS5leHBvcnRzLngyID0ge1xuICAnLXdlYmtpdC10cmFuc2Zvcm0nOiAncm90YXRlKC00NWRlZyknLFxuICAndHJhbnNmb3JtJzogJ3JvdGF0ZSgtNDVkZWcpJyxcbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gU2xpZGVyIHN0eWxlc1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbm1vZHVsZS5leHBvcnRzLnJhbmdlRGVmYXVsdFN0eWxlcyA9IHtcbiAgaGVpZ2h0OiAnMjJweCcsXG4gIHdpZHRoOiAnMjAwcHgnLFxuICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcbn07XG5cbm1vZHVsZS5leHBvcnRzLnJhbmdlTGFyZ2VTdHlsZXMgPSB7XG4gIGhlaWdodDogJzIycHgnLFxuICB3aWR0aDogJzQwMHB4JyxcbiAgZGlzcGxheTogJ2lubGluZS1ibG9jaycsXG59O1xuXG5tb2R1bGUuZXhwb3J0cy5udW1iZXJTdHlsZXMgPSB7XG4gIGhlaWdodDogJzIycHgnLFxuICB3aWR0aDogJzU0cHgnLFxuICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcbiAgdG9wOiAnLTdweCcsXG4gIGxlZnQ6ICc1cHgnLFxuICBmb250OiAnbm9ybWFsIG5vcm1hbCAxMnB4IGFyaWFsJyxcbiAgYm9yZGVyOiAnbm9uZScsXG4gIGJhY2tncm91bmQ6ICdub25lJyxcbiAgcGFkZGluZ0xlZnQ6ICc0cHgnLFxuICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcbiAgdGV4dEFsaWduOiAncmlnaHQnXG59O1xuXG5tb2R1bGUuZXhwb3J0cy51bml0U3R5bGVzID0ge1xuICBmb250OiAnaXRhbGljIG5vcm1hbCAxMnB4IGFyaWFsJyxcbiAgbGluZUhlaWdodDogJzIycHgnLFxuICBoZWlnaHQ6ICcyMnB4JyxcbiAgZGlzcGxheTogJ2lubGluZS1ibG9jaycsXG4gIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuICB0b3A6ICctN3B4JyxcbiAgcGFkZGluZ0xlZnQ6ICc1cHgnLFxuICBjb2xvcjogJyM1NjU2NTYnXG59O1xuXG4iXX0=