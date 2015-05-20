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

  for (var key in styles) {
    var value = styles[key];
    props.push('' + key + ': ' + value);
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
  'display': 'block',
  'padding': '3px',
  'margin': '2px',
  'background-color': '#efefef',
  'border': '1px solid #aaaaaa',
  'box-sizing': 'border-box',
  'border-radius': '2px',
  'display': 'inline-flex',
  'flex-wrap': 'no-wrap',
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
  height: '19px' };

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

// backgroundColor: 'green'
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVzNi91dGlscy9zdHlsZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsSUFBSSxVQUFVLFlBQUEsQ0FBQzs7QUFFZixJQUFNLEVBQUUsR0FBRyx5QkFBeUIsQ0FBQztBQUNyQyxJQUFNLE9BQU8sU0FBTyxFQUFFLEFBQUUsQ0FBQztBQUN6QixNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7OztBQUd2QixTQUFTLGdCQUFnQixHQUFHO0FBQzFCLE1BQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDOUMsVUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDbkMsWUFBVSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7Q0FDNUI7O0FBRUQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsVUFBUyxRQUFRLEVBQUUsTUFBTSxFQUFFO0FBQ3RELE1BQUksQ0FBQyxVQUFVLEVBQUU7QUFBRSxvQkFBZ0IsRUFBRSxDQUFDO0dBQUU7O0FBRXhDLFVBQVEsR0FBRyxRQUFRLEtBQUssSUFBSSxHQUFHLE9BQU8sUUFBTSxPQUFPLFFBQUcsUUFBUSxBQUFFLENBQUM7QUFDakUsTUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDOztBQUVmLE9BQUssSUFBSSxHQUFHLElBQUksTUFBTSxFQUFFO0FBQ3RCLFFBQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMxQixTQUFLLENBQUMsSUFBSSxNQUFJLEdBQUcsVUFBSyxLQUFLLENBQUcsQ0FBQztHQUNoQzs7QUFFRCxNQUFNLElBQUksUUFBTSxRQUFRLFdBQU0sS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBSSxDQUFDO0FBQ3BELFlBQVUsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7Q0FDekQsQ0FBQzs7Ozs7O0FBT0YsTUFBTSxDQUFDLE9BQU8sQ0FBQyxlQUFlLEdBQUc7QUFDL0IsU0FBTyxFQUFFLE1BQU07QUFDZixVQUFRLEVBQUUsTUFBTTtBQUNoQixXQUFTLEVBQUUsT0FBTztBQUNsQixXQUFTLEVBQUUsS0FBSztBQUNoQixVQUFRLEVBQUUsS0FBSztBQUNmLG9CQUFrQixFQUFFLFNBQVM7QUFDN0IsVUFBUSxFQUFFLG1CQUFtQjtBQUM3QixjQUFZLEVBQUUsWUFBWTtBQUMxQixpQkFBZSxFQUFFLEtBQUs7QUFDdEIsV0FBUyxFQUFFLGFBQWE7QUFDeEIsYUFBVyxFQUFFLFNBQVM7QUFDdEIsU0FBTyxFQUFFLFNBQVM7Q0FDbkIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXlCRixNQUFNLENBQUMsT0FBTyxDQUFDLFlBQVksR0FBRztBQUM1QixRQUFNLEVBQUUsd0JBQXdCO0FBQ2hDLGVBQWEsRUFBRSxNQUFNO0FBQ3JCLFlBQVUsRUFBRSxRQUFRO0FBQ3BCLGNBQVksRUFBRSxPQUFPO0FBQ3JCLFdBQVMsRUFBRSxXQUFXO0FBQ3RCLGFBQVcsRUFBRSxDQUFDO0NBQ2YsQ0FBQzs7O0FBR0YsTUFBTSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEdBQUc7QUFDNUIsV0FBUyxFQUFFLGFBQWE7QUFDeEIsYUFBVyxFQUFFLFNBQVM7QUFDdEIsYUFBVyxFQUFFLENBQUM7Q0FDZixDQUFDOzs7Ozs7QUFNRixNQUFNLENBQUMsT0FBTyxDQUFDLG9CQUFvQixHQUFHO0FBQ3BDLFVBQVEsRUFBRSxNQUFNO0FBQ2hCLGlCQUFlLEVBQUUsQ0FBQztBQUNsQixrQkFBZ0IsRUFBRSxDQUFDO0FBQ25CLG9CQUFrQixFQUFFLGFBQWE7QUFDakMsVUFBUSxFQUFFLE1BQU07Q0FDakIsQ0FBQzs7QUFFRixNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsR0FBRztBQUMzQixRQUFNLEVBQUUsd0JBQXdCO0FBQ2hDLGVBQWEsRUFBRSxNQUFNO0FBQ3JCLFVBQVEsRUFBRSxNQUFNO0FBQ2hCLFlBQVUsRUFBRSxRQUFRO0FBQ3BCLGNBQVksRUFBRSxNQUFNO0FBQ3BCLFdBQVMsRUFBRSxXQUFXO0FBQ3RCLGNBQVksRUFBRSxZQUFZO0FBQzFCLGFBQVcsRUFBRSxDQUFDO0NBQ2YsQ0FBQzs7Ozs7O0FBTUYsTUFBTSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEdBQUc7QUFDNUIsUUFBTSxFQUFFLDBCQUEwQjtBQUNsQyxVQUFRLEVBQUUsTUFBTTtBQUNoQixVQUFRLEVBQUUsTUFBTTtBQUNoQixvQkFBa0IsRUFBRSxTQUFTO0FBQzdCLFNBQU8sRUFBRSxTQUFTO0FBQ2xCLGdCQUFjLEVBQUUsS0FBSztBQUNyQixjQUFZLEVBQUUsWUFBWTtBQUMxQixpQkFBZSxFQUFFLEtBQUs7QUFDdEIsVUFBUSxFQUFFLFNBQVM7QUFDbkIsYUFBVyxFQUFFLENBQUM7Q0FDZixDQUFDOztBQUVGLE1BQU0sQ0FBQyxPQUFPLENBQUMsa0JBQWtCLEdBQUc7QUFDbEMsb0JBQWtCLEVBQUUsU0FBUztDQUM5QixDQUFDOzs7Ozs7QUFNRixNQUFNLENBQUMsT0FBTyxDQUFDLGtCQUFrQixHQUFHO0FBQ2xDLFFBQU0sRUFBRSxNQUFNO0FBQ2QsT0FBSyxFQUFFLE9BQU87QUFDZCxTQUFPLEVBQUUsY0FBYyxFQUN4QixDQUFDOztBQUVGLE1BQU0sQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEdBQUc7QUFDaEMsUUFBTSxFQUFFLE1BQU07QUFDZCxPQUFLLEVBQUUsT0FBTztBQUNkLFNBQU8sRUFBRSxjQUFjLEVBQ3hCLENBQUM7O0FBRUYsTUFBTSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEdBQUc7QUFDNUIsUUFBTSxFQUFFLE1BQU07QUFDZCxPQUFLLEVBQUUsTUFBTTtBQUNiLFVBQVEsRUFBRSxVQUFVO0FBQ3BCLEtBQUcsRUFBRSxNQUFNO0FBQ1gsTUFBSSxFQUFFLEtBQUs7QUFDWCxNQUFJLEVBQUUsMEJBQTBCO0FBQ2hDLFFBQU0sRUFBRSxNQUFNO0FBQ2QsWUFBVSxFQUFFLE1BQU07QUFDbEIsYUFBVyxFQUFFLEtBQUs7QUFDbEIsU0FBTyxFQUFFLGNBQWM7QUFDdkIsV0FBUyxFQUFFLE9BQU87Q0FDbkIsQ0FBQzs7QUFFRixNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsR0FBRztBQUMxQixNQUFJLEVBQUUsMEJBQTBCO0FBQ2hDLFlBQVUsRUFBRSxNQUFNO0FBQ2xCLFFBQU0sRUFBRSxNQUFNO0FBQ2QsU0FBTyxFQUFFLGNBQWM7QUFDdkIsVUFBUSxFQUFFLFVBQVU7QUFDcEIsS0FBRyxFQUFFLE1BQU07QUFDWCxhQUFXLEVBQUUsS0FBSztBQUNsQixPQUFLLEVBQUUsU0FBUztDQUNqQixDQUFDOzs7Ozs7QUFNRixNQUFNLENBQUMsT0FBTyxDQUFDLGVBQWUsR0FBRztBQUMvQixTQUFPLEVBQUUsQ0FBQztBQUNWLFFBQU0sRUFBRSxDQUFDO0FBQ1QsT0FBSyxFQUFFLE1BQU07QUFDYixRQUFNLEVBQUUsTUFBTTtBQUNkLGlCQUFlLEVBQUUsU0FBUztBQUMxQixTQUFPLEVBQUUsY0FBYztBQUN2QixRQUFNLEVBQUUsU0FBUztBQUNqQixVQUFRLEVBQUUsVUFBVTtBQUNwQixLQUFHLEVBQUUsTUFBTTtDQUNaLENBQUM7O0FBRUYsTUFBTSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEdBQUc7QUFDNUIsU0FBTyxFQUFFLENBQUM7QUFDVixRQUFNLEVBQUUsQ0FBQztBQUNULE9BQUssRUFBRSxNQUFNO0FBQ2IsUUFBTSxFQUFFLE1BQU0sRUFFZixDQUFDOztBQUVGLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxHQUFHO0FBQ2xCLE9BQUssRUFBRSxLQUFLO0FBQ1osUUFBTSxFQUFFLE1BQU07QUFDZCxXQUFTLEVBQUUsZUFBZTtBQUMxQixpQkFBZSxFQUFFLFNBQVM7QUFDMUIsVUFBUSxFQUFFLFVBQVU7QUFDcEIsTUFBSSxFQUFFLEtBQUs7Q0FDWixDQUFDOztBQUVGLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxHQUFHO0FBQ2xCLE9BQUssRUFBRSxLQUFLO0FBQ1osUUFBTSxFQUFFLE1BQU07QUFDZCxXQUFTLEVBQUUsZ0JBQWdCO0FBQzNCLGlCQUFlLEVBQUUsU0FBUztBQUMxQixVQUFRLEVBQUUsVUFBVTtBQUNwQixNQUFJLEVBQUUsS0FBSztBQUNYLEtBQUcsRUFBRSxPQUFPO0NBQ2IsQ0FBQyIsImZpbGUiOiJlczYvdXRpbHMvc3R5bGVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gY3JlYXRlIGEgZ2xvYmFsIHN0eWxlc2hlZXRcbmxldCBzdHlsZVNoZWV0O1xuLy8gY3JlYXRlIGEgcnVudGltZSBjc3MgbmFtZXNwYWNlXG5jb25zdCBucyA9ICd3YXZlcy1iYXNpYy1jb250cm9sbGVycyc7XG5jb25zdCBuc0NsYXNzID0gYC4ke25zfWA7XG5tb2R1bGUuZXhwb3J0cy5ucyA9IG5zO1xuXG4vLyBjcmVhdGUgYSBzdHlsZSBzaGVldCB0byBpbnNlcnQgY3NzIHJ1bGVzXG5mdW5jdGlvbiBjcmVhdGVTdHlsZVNoZWV0KCkge1xuICBsZXQgc3R5bGVFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVFbCk7XG4gIHN0eWxlU2hlZXQgPSBzdHlsZUVsLnNoZWV0O1xufVxuXG5tb2R1bGUuZXhwb3J0cy5pbnNlcnRSdWxlcyA9IGZ1bmN0aW9uKHNlbGVjdG9yLCBzdHlsZXMpIHtcbiAgaWYgKCFzdHlsZVNoZWV0KSB7IGNyZWF0ZVN0eWxlU2hlZXQoKTsgfVxuXG4gIHNlbGVjdG9yID0gc2VsZWN0b3IgPT09IG51bGwgPyBuc0NsYXNzIDogYCR7bnNDbGFzc30ke3NlbGVjdG9yfWA7XG4gIHZhciBwcm9wcyA9IFtdO1xuXG4gIGZvciAobGV0IGtleSBpbiBzdHlsZXMpIHtcbiAgICBjb25zdCB2YWx1ZSA9IHN0eWxlc1trZXldO1xuICAgIHByb3BzLnB1c2goYCR7a2V5fTogJHt2YWx1ZX1gKTtcbiAgfVxuXG4gIGNvbnN0IHJ1bGUgPSBgJHtzZWxlY3Rvcn0geyAke3Byb3BzLmpvaW4oJztcXG4nKX0gfWA7XG4gIHN0eWxlU2hlZXQuaW5zZXJ0UnVsZShydWxlLCBzdHlsZVNoZWV0LmNzc1J1bGVzLmxlbmd0aCk7XG59O1xuXG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gY29tbW9uIHN0eWxlc1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbm1vZHVsZS5leHBvcnRzLmNvbnRhaW5lclN0eWxlcyA9IHtcbiAgJ3dpZHRoJzogJzEwMCUnLFxuICAnaGVpZ2h0JzogJzMwcHgnLFxuICAnZGlzcGxheSc6ICdibG9jaycsXG4gICdwYWRkaW5nJzogJzNweCcsXG4gICdtYXJnaW4nOiAnMnB4JyxcbiAgJ2JhY2tncm91bmQtY29sb3InOiAnI2VmZWZlZicsXG4gICdib3JkZXInOiAnMXB4IHNvbGlkICNhYWFhYWEnLFxuICAnYm94LXNpemluZyc6ICdib3JkZXItYm94JyxcbiAgJ2JvcmRlci1yYWRpdXMnOiAnMnB4JyxcbiAgJ2Rpc3BsYXknOiAnaW5saW5lLWZsZXgnLFxuICAnZmxleC13cmFwJzogJ25vLXdyYXAnLFxuICAnY29sb3InOiAnIzQ2NDY0Nidcbn07XG5cbi8vIEBUT0RPIHJlbW92ZVxuLy8gbW9kdWxlLmV4cG9ydHMuY29udGFpbmVyTGFyZ2VTdHlsZXMgPSB7XG4vLyAgIHdpZHRoOiAnNjYwcHgnLFxuLy8gICBoZWlnaHQ6ICczMHB4Jyxcbi8vICAgZGlzcGxheTogJ2Jsb2NrJyxcbi8vICAgcGFkZGluZzogJzNweCcsXG4vLyAgIG1hcmdpbjogJzJweCcsXG4vLyAgIGJhY2tncm91bmRDb2xvcjogJyNlZmVmZWYnLFxuLy8gICBib3JkZXI6ICcxcHggc29saWQgI2FhYWFhYScsXG4vLyAgIGJveFNpemluZzogJ2JvcmRlci1ib3gnXG4vLyB9O1xuXG4vLyBtb2R1bGUuZXhwb3J0cy50cmFuc3BhcmVudENvbnRhaW5lclN0eWxlcyA9IHtcbi8vICAgd2lkdGg6ICc2NjBweCcsXG4vLyAgIGhlaWdodDogJzMwcHgnLFxuLy8gICBkaXNwbGF5OiAnYmxvY2snLFxuLy8gICBwYWRkaW5nOiAnOHB4IDBweCAwcHggMHB4Jyxcbi8vICAgbWFyZ2luOiAnMnB4Jyxcbi8vICAgYmFja2dyb3VuZENvbG9yOiAndHJhbnNwYXJlbnQnLFxuLy8gICBib3JkZXI6ICcwcHgnLFxuLy8gICBib3hTaXppbmc6ICdib3JkZXItYm94J1xuLy8gfTtcblxubW9kdWxlLmV4cG9ydHMubGVnZW5kU3R5bGVzID0ge1xuICAnZm9udCc6ICdpdGFsaWMgYm9sZCAxMnB4IGFyaWFsJyxcbiAgJ2xpbmUtaGVpZ2h0JzogJzIycHgnLFxuICAnb3ZlcmZsb3cnOiAnaGlkZGVuJyxcbiAgJ3RleHQtYWxpZ24nOiAncmlnaHQnLFxuICAncGFkZGluZyc6ICcwIDZweCAwIDAnLFxuICAnZmxleC1ncm93JzogMVxufTtcblxuLy8gQnV0dG9ucyBzdHlsZXNcbm1vZHVsZS5leHBvcnRzLmlubmVyV3JhcHBlciA9IHtcbiAgJ2Rpc3BsYXknOiAnaW5saW5lLWZsZXgnLFxuICAnZmxleC13cmFwJzogJ25vLXdyYXAnLFxuICAnZmxleC1ncm93JzogNFxufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBUaXRsZSBzdHlsZXNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5tb2R1bGUuZXhwb3J0cy50aXRsZUNvbnRhaW5lclN0eWxlcyA9IHtcbiAgJ2JvcmRlcic6ICdub25lJyxcbiAgJ21hcmdpbi1ib3R0b20nOiAwLFxuICAncGFkZGluZy1ib3R0b20nOiAwLFxuICAnYmFja2dyb3VuZC1jb2xvcic6ICd0cmFuc3BhcmVudCcsXG4gICdoZWlnaHQnOiAnMjVweCdcbn07XG5cbm1vZHVsZS5leHBvcnRzLnRpdGxlU3R5bGVzID0ge1xuICAnZm9udCc6ICdub3JtYWwgYm9sZCAxM3B4IGFyaWFsJyxcbiAgJ2xpbmUtaGVpZ2h0JzogJzIycHgnLFxuICAnaGVpZ2h0JzogJzIycHgnLFxuICAnb3ZlcmZsb3cnOiAnaGlkZGVuJyxcbiAgJ3RleHQtYWxpZ24nOiAnbGVmdCcsXG4gICdwYWRkaW5nJzogJzAgMCAwIDNweCcsXG4gICdib3gtc2l6aW5nJzogJ2JvcmRlci1ib3gnLFxuICAnZmxleC1ncm93JzogMVxufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBCdXR0b25zIHN0eWxlc1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbm1vZHVsZS5leHBvcnRzLmJ1dHRvblN0eWxlcyA9IHtcbiAgJ2ZvbnQnOiAnbm9ybWFsIG5vcm1hbCAxMnB4IGFyaWFsJyxcbiAgJ2hlaWdodCc6ICcyMnB4JyxcbiAgJ2JvcmRlcic6ICdub25lJyxcbiAgJ2JhY2tncm91bmQtY29sb3InOiAnIzQ2NDY0NicsXG4gICdjb2xvcic6ICcjZmZmZmZmJyxcbiAgJ21hcmdpbi1yaWdodCc6ICc0cHgnLFxuICAnYm94LXNpemluZyc6ICdib3JkZXItYm94JyxcbiAgJ2JvcmRlci1yYWRpdXMnOiAnMnB4JyxcbiAgJ2N1cnNvcic6ICdwb2ludGVyJyxcbiAgJ2ZsZXgtZ3Jvdyc6IDFcbn07XG5cbm1vZHVsZS5leHBvcnRzLmJ1dHRvbkFjdGl2ZVN0eWxlcyA9IHtcbiAgJ2JhY2tncm91bmQtY29sb3InOiAnIzY4Njg2OCdcbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gU2xpZGVyIHN0eWxlc1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbm1vZHVsZS5leHBvcnRzLnJhbmdlRGVmYXVsdFN0eWxlcyA9IHtcbiAgaGVpZ2h0OiAnMjJweCcsXG4gIHdpZHRoOiAnMjAwcHgnLFxuICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcbn07XG5cbm1vZHVsZS5leHBvcnRzLnJhbmdlTGFyZ2VTdHlsZXMgPSB7XG4gIGhlaWdodDogJzIycHgnLFxuICB3aWR0aDogJzQwMHB4JyxcbiAgZGlzcGxheTogJ2lubGluZS1ibG9jaycsXG59O1xuXG5tb2R1bGUuZXhwb3J0cy5udW1iZXJTdHlsZXMgPSB7XG4gIGhlaWdodDogJzIycHgnLFxuICB3aWR0aDogJzU0cHgnLFxuICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcbiAgdG9wOiAnLTdweCcsXG4gIGxlZnQ6ICc1cHgnLFxuICBmb250OiAnbm9ybWFsIG5vcm1hbCAxMnB4IGFyaWFsJyxcbiAgYm9yZGVyOiAnbm9uZScsXG4gIGJhY2tncm91bmQ6ICdub25lJyxcbiAgcGFkZGluZ0xlZnQ6ICc0cHgnLFxuICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcbiAgdGV4dEFsaWduOiAncmlnaHQnXG59O1xuXG5tb2R1bGUuZXhwb3J0cy51bml0U3R5bGVzID0ge1xuICBmb250OiAnaXRhbGljIG5vcm1hbCAxMnB4IGFyaWFsJyxcbiAgbGluZUhlaWdodDogJzIycHgnLFxuICBoZWlnaHQ6ICcyMnB4JyxcbiAgZGlzcGxheTogJ2lubGluZS1ibG9jaycsXG4gIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuICB0b3A6ICctN3B4JyxcbiAgcGFkZGluZ0xlZnQ6ICc1cHgnLFxuICBjb2xvcjogJyM1NjU2NTYnXG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFRvZ2dsZSBjb250YWluZXJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5tb2R1bGUuZXhwb3J0cy50b2dnbGVDb250YWluZXIgPSB7XG4gIHBhZGRpbmc6IDAsXG4gIG1hcmdpbjogMCxcbiAgd2lkdGg6ICcxOXB4JyxcbiAgaGVpZ2h0OiAnMTlweCcsXG4gIGJhY2tncm91bmRDb2xvcjogJyM0NjQ2NDYnLFxuICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcbiAgY3Vyc29yOiAncG9pbnRlcicsXG4gIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuICB0b3A6ICctMXB4J1xufTtcblxubW9kdWxlLmV4cG9ydHMudG9nZ2xlQWN0aXZlID0ge1xuICBwYWRkaW5nOiAwLFxuICBtYXJnaW46IDAsXG4gIHdpZHRoOiAnMTlweCcsXG4gIGhlaWdodDogJzE5cHgnLFxuICAvLyBiYWNrZ3JvdW5kQ29sb3I6ICdncmVlbidcbn07XG5cbm1vZHVsZS5leHBvcnRzLngxID0ge1xuICB3aWR0aDogJzFweCcsXG4gIGhlaWdodDogJzE5cHgnLFxuICB0cmFuc2Zvcm06ICdyb3RhdGUoNDVkZWcpJyxcbiAgYmFja2dyb3VuZENvbG9yOiAnI2VmZWZlZicsXG4gIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuICBsZWZ0OiAnOXB4J1xufTtcblxubW9kdWxlLmV4cG9ydHMueDIgPSB7XG4gIHdpZHRoOiAnMXB4JyxcbiAgaGVpZ2h0OiAnMTlweCcsXG4gIHRyYW5zZm9ybTogJ3JvdGF0ZSgtNDVkZWcpJyxcbiAgYmFja2dyb3VuZENvbG9yOiAnI2VmZWZlZicsXG4gIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuICBsZWZ0OiAnOXB4JyxcbiAgdG9wOiAnLTE5cHgnXG59O1xuXG4iXX0=