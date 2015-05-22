'use strict';

var pkg = require('../../package.json');
var styles = require('../css/styles.js');

var ns = pkg.name;
var nsClass = '.' + ns;

module.exports.insertStyleSheet = function () {
  for (var _len = arguments.length, names = Array(_len), _key = 0; _key < _len; _key++) {
    names[_key] = arguments[_key];
  }

  var $style = document.createElement('style');

  $style.setAttribute('data-namespace', ns);
  $style.innerHTML = styles;

  // allow overriding by adding styles in <body>
  document.head.appendChild($style);
};

module.exports.ns = ns;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVzNi91dGlscy9zdHlsZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQztBQUMxQyxJQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQzs7QUFFM0MsSUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztBQUNwQixJQUFNLE9BQU8sU0FBTyxFQUFFLEFBQUUsQ0FBQzs7QUFFekIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsR0FBRyxZQUFtQjtvQ0FBUCxLQUFLO0FBQUwsU0FBSzs7O0FBQ2pELE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7O0FBRS9DLFFBQU0sQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDMUMsUUFBTSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUM7OztBQUcxQixVQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztDQUNuQyxDQUFDOztBQUVGLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyIsImZpbGUiOiJlczYvdXRpbHMvc3R5bGVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgcGtnID0gcmVxdWlyZSgnLi4vLi4vcGFja2FnZS5qc29uJyk7XG5jb25zdCBzdHlsZXMgPSByZXF1aXJlKCcuLi9jc3Mvc3R5bGVzLmpzJyk7XG5cbmNvbnN0IG5zID0gcGtnLm5hbWU7XG5jb25zdCBuc0NsYXNzID0gYC4ke25zfWA7XG5cbm1vZHVsZS5leHBvcnRzLmluc2VydFN0eWxlU2hlZXQgPSBmdW5jdGlvbiguLi5uYW1lcykge1xuICBjb25zdCAkc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuXG4gICRzdHlsZS5zZXRBdHRyaWJ1dGUoJ2RhdGEtbmFtZXNwYWNlJywgbnMpO1xuICAkc3R5bGUuaW5uZXJIVE1MID0gc3R5bGVzO1xuXG4gIC8vIGFsbG93IG92ZXJyaWRpbmcgYnkgYWRkaW5nIHN0eWxlcyBpbiA8Ym9keT5cbiAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZCgkc3R5bGUpO1xufTtcblxubW9kdWxlLmV4cG9ydHMubnMgPSBucztcbiJdfQ==