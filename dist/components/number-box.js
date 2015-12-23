'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _baseController = require('./base-controller');

var _baseController2 = _interopRequireDefault(_baseController);

var _utilsElements = require('../utils/elements');

var elements = _interopRequireWildcard(_utilsElements);

var NumberBox = (function (_BaseController) {
  _inherits(NumberBox, _BaseController);

  function NumberBox(legend) {
    var min = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
    var max = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];
    var step = arguments.length <= 3 || arguments[3] === undefined ? 0.01 : arguments[3];
    var defaultValue = arguments.length <= 4 || arguments[4] === undefined ? 0 : arguments[4];
    var $container = arguments.length <= 5 || arguments[5] === undefined ? null : arguments[5];
    var callback = arguments.length <= 6 || arguments[6] === undefined ? null : arguments[6];

    _classCallCheck(this, NumberBox);

    _get(Object.getPrototypeOf(NumberBox.prototype), 'constructor', this).call(this);

    this.type = 'number-box';
    this.legend = legend;
    this.min = 0;
    this.max = max;
    this.step = step;
    this._value = defaultValue;
    this._isIntStep = step % 1 === 0;

    _get(Object.getPrototypeOf(NumberBox.prototype), '_applyOptionnalParameters', this).call(this, $container, callback);
  }

  _createClass(NumberBox, [{
    key: 'render',
    value: function render() {
      var content = '\n      <span class="legend">' + this.legend + '</span>\n      <div class="inner-wrapper">\n        ' + elements.arrowLeft + '\n        <input class="number" type="number" min="' + this.min + '" max="' + this.max + '" step="' + this.step + '" value="' + this._value + '" />\n        ' + elements.arrowRight + '\n      </div>\n    ';

      this.$el = _get(Object.getPrototypeOf(NumberBox.prototype), 'render', this).call(this, this.type);
      this.$el.classList.add('align-small');
      this.$el.innerHTML = content;

      this.$prev = this.$el.querySelector('.arrow-left');
      this.$next = this.$el.querySelector('.arrow-right');
      this.$number = this.$el.querySelector('input[type="number"]');

      this.bindEvents();

      return this.$el;
    }
  }, {
    key: 'bindEvents',
    value: function bindEvents() {
      var _this = this;

      this.$prev.addEventListener('click', function (e) {
        // minimize floating point error
        // const steps = Math.floor(this.value / this.step + 0.5);
        // const value = Math.max(this.min, this.step * (steps - 1));

        var decimals = _this.step.toString().split('.')[1];
        var exp = decimals ? decimals.length : 0;
        var mult = Math.pow(10, exp);

        var intValue = Math.floor(_this.value * mult + 0.5);
        var intStep = Math.floor(_this.step * mult + 0.5);
        var value = (intValue - intStep) / mult;

        _this.propagate(value);
      }, false);

      this.$next.addEventListener('click', function (e) {
        // minimize floating point error
        // const steps = Math.floor(this.value / this.step + 0.5);
        // const value = Math.max(this.min, this.step * (steps + 1));

        // do computation with integers, looks better ?
        var decimals = _this.step.toString().split('.')[1];
        var exp = decimals ? decimals.length : 0;
        var mult = Math.pow(10, exp);

        var intValue = Math.floor(_this.value * mult + 0.5);
        var intStep = Math.floor(_this.step * mult + 0.5);
        var value = (intValue + intStep) / mult;

        _this.propagate(value);
      }, false);

      this.$number.addEventListener('change', function (e) {
        var value = _this.$number.value;
        value = _this._isIntStep ? parseInt(value, 10) : parseFloat(value);
        value = Math.min(_this.max, Math.max(_this.min, value));

        _this.propagate(value);
      }, false);
    }
  }, {
    key: 'propagate',
    value: function propagate(value) {
      if (value === this._value) {
        return;
      }

      this._value = value;
      this.$number.value = value;

      this.emit('change', this._value);
    }
  }, {
    key: 'value',
    get: function get() {
      return this._value;
    },
    set: function set(value) {
      value = this._isIntStep ? parseInt(value, 10) : parseFloat(value);
      value = Math.min(this.max, Math.max(this.min, value));
      this.$number.value = value;

      this._value = value;
    }
  }]);

  return NumberBox;
})(_baseController2['default']);

exports['default'] = NumberBox;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVzNi9jb21wb25lbnRzL251bWJlci1ib3guanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OzhCQUEyQixtQkFBbUI7Ozs7NkJBQ3BCLG1CQUFtQjs7SUFBakMsUUFBUTs7SUFFQyxTQUFTO1lBQVQsU0FBUzs7QUFDakIsV0FEUSxTQUFTLENBQ2hCLE1BQU0sRUFBdUY7UUFBckYsR0FBRyx5REFBRyxDQUFDO1FBQUUsR0FBRyx5REFBRyxDQUFDO1FBQUUsSUFBSSx5REFBRyxJQUFJO1FBQUUsWUFBWSx5REFBRyxDQUFDO1FBQUUsVUFBVSx5REFBRyxJQUFJO1FBQUUsUUFBUSx5REFBRyxJQUFJOzswQkFEcEYsU0FBUzs7QUFFMUIsK0JBRmlCLFNBQVMsNkNBRWxCOztBQUVSLFFBQUksQ0FBQyxJQUFJLEdBQUcsWUFBWSxDQUFDO0FBQ3pCLFFBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0FBQ3JCLFFBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0FBQ2IsUUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFDZixRQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztBQUNqQixRQUFJLENBQUMsTUFBTSxHQUFHLFlBQVksQ0FBQztBQUMzQixRQUFJLENBQUMsVUFBVSxHQUFJLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxBQUFDLENBQUM7O0FBRW5DLCtCQVppQixTQUFTLDJEQVlNLFVBQVUsRUFBRSxRQUFRLEVBQUU7R0FDdkQ7O2VBYmtCLFNBQVM7O1dBMkJ0QixrQkFBRztBQUNQLFVBQU0sT0FBTyxxQ0FDWSxJQUFJLENBQUMsTUFBTSw0REFFOUIsUUFBUSxDQUFDLFNBQVMsMkRBQ3VCLElBQUksQ0FBQyxHQUFHLGVBQVUsSUFBSSxDQUFDLEdBQUcsZ0JBQVcsSUFBSSxDQUFDLElBQUksaUJBQVksSUFBSSxDQUFDLE1BQU0sc0JBQzlHLFFBQVEsQ0FBQyxVQUFVLHlCQUV4QixDQUFDOztBQUVGLFVBQUks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LENBQUM7QUFDbEUsYUFBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBSyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFLLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDOztBQUV0RCxjQUFLLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztPQUN2QixFQUFFLEtBQUssQ0FBQyxDQUFDO0tBQ1g7OztXQUVRLG1CQUFDLEtBQUssRUFBRTtBQUNmLFVBQUksS0FBSyxLQUFLLElBQUksQ0FBQyxNQUFNLEVBQUU7QUFBRSxlQUFPO09BQUU7O0FBRXRDLFVBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0FBQ3BCLFVBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQzs7QUFFM0IsVUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQ2xDOzs7U0FyRlEsZUFBRztBQUNWLGFBQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztLQUNwQjtTQUVRLGFBQUMsS0FBSyxFQUFFO0FBQ2YsV0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDbEUsV0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztBQUN0RCxVQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7O0FBRTNCLFVBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0tBQ3JCOzs7U0F6QmtCLFNBQVM7OztxQkFBVCxTQUFTIiwiZmlsZSI6ImVzNi9jb21wb25lbnRzL251bWJlci1ib3guanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFzZUNvbnRyb2xsZXIgZnJvbSAnLi9iYXNlLWNvbnRyb2xsZXInO1xuaW1wb3J0ICogYXMgZWxlbWVudHMgZnJvbSAnLi4vdXRpbHMvZWxlbWVudHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOdW1iZXJCb3ggZXh0ZW5kcyBCYXNlQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKGxlZ2VuZCwgbWluID0gMCwgbWF4ID0gMSwgc3RlcCA9IDAuMDEsIGRlZmF1bHRWYWx1ZSA9IDAsICRjb250YWluZXIgPSBudWxsLCBjYWxsYmFjayA9IG51bGwpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy50eXBlID0gJ251bWJlci1ib3gnO1xuICAgIHRoaXMubGVnZW5kID0gbGVnZW5kO1xuICAgIHRoaXMubWluID0gMDtcbiAgICB0aGlzLm1heCA9IG1heDtcbiAgICB0aGlzLnN0ZXAgPSBzdGVwO1xuICAgIHRoaXMuX3ZhbHVlID0gZGVmYXVsdFZhbHVlO1xuICAgIHRoaXMuX2lzSW50U3RlcCA9IChzdGVwICUgMSA9PT0gMCk7XG5cbiAgICBzdXBlci5fYXBwbHlPcHRpb25uYWxQYXJhbWV0ZXJzKCRjb250YWluZXIsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIGdldCB2YWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gIH1cblxuICBzZXQgdmFsdWUodmFsdWUpIHtcbiAgICB2YWx1ZSA9IHRoaXMuX2lzSW50U3RlcCA/IHBhcnNlSW50KHZhbHVlLCAxMCkgOiBwYXJzZUZsb2F0KHZhbHVlKTtcbiAgICB2YWx1ZSA9IE1hdGgubWluKHRoaXMubWF4LCBNYXRoLm1heCh0aGlzLm1pbiwgdmFsdWUpKTtcbiAgICB0aGlzLiRudW1iZXIudmFsdWUgPSB2YWx1ZTtcblxuICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgY29udGVudCA9IGBcbiAgICAgIDxzcGFuIGNsYXNzPVwibGVnZW5kXCI+JHt0aGlzLmxlZ2VuZH08L3NwYW4+XG4gICAgICA8ZGl2IGNsYXNzPVwiaW5uZXItd3JhcHBlclwiPlxuICAgICAgICAke2VsZW1lbnRzLmFycm93TGVmdH1cbiAgICAgICAgPGlucHV0IGNsYXNzPVwibnVtYmVyXCIgdHlwZT1cIm51bWJlclwiIG1pbj1cIiR7dGhpcy5taW59XCIgbWF4PVwiJHt0aGlzLm1heH1cIiBzdGVwPVwiJHt0aGlzLnN0ZXB9XCIgdmFsdWU9XCIke3RoaXMuX3ZhbHVlfVwiIC8+XG4gICAgICAgICR7ZWxlbWVudHMuYXJyb3dSaWdodH1cbiAgICAgIDwvZGl2PlxuICAgIGA7XG5cbiAgICB0aGlzLiRlbCA9IHN1cGVyLnJlbmRlcih0aGlzLnR5cGUpO1xuICAgIHRoaXMuJGVsLmNsYXNzTGlzdC5hZGQoJ2FsaWduLXNtYWxsJyk7XG4gICAgdGhpcy4kZWwuaW5uZXJIVE1MID0gY29udGVudDtcblxuICAgIHRoaXMuJHByZXYgPSB0aGlzLiRlbC5xdWVyeVNlbGVjdG9yKCcuYXJyb3ctbGVmdCcpO1xuICAgIHRoaXMuJG5leHQgPSB0aGlzLiRlbC5xdWVyeVNlbGVjdG9yKCcuYXJyb3ctcmlnaHQnKTtcbiAgICB0aGlzLiRudW1iZXIgPSB0aGlzLiRlbC5xdWVyeVNlbGVjdG9yKCdpbnB1dFt0eXBlPVwibnVtYmVyXCJdJyk7XG5cbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcblxuICAgIHJldHVybiB0aGlzLiRlbDtcbiAgfVxuXG4gIGJpbmRFdmVudHMoKSB7XG4gICAgdGhpcy4kcHJldi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAvLyBtaW5pbWl6ZSBmbG9hdGluZyBwb2ludCBlcnJvclxuICAgICAgLy8gY29uc3Qgc3RlcHMgPSBNYXRoLmZsb29yKHRoaXMudmFsdWUgLyB0aGlzLnN0ZXAgKyAwLjUpO1xuICAgICAgLy8gY29uc3QgdmFsdWUgPSBNYXRoLm1heCh0aGlzLm1pbiwgdGhpcy5zdGVwICogKHN0ZXBzIC0gMSkpO1xuXG4gICAgICBjb25zdCBkZWNpbWFscyA9IHRoaXMuc3RlcC50b1N0cmluZygpLnNwbGl0KCcuJylbMV07XG4gICAgICBjb25zdCBleHAgPSBkZWNpbWFscyA/IGRlY2ltYWxzLmxlbmd0aCA6IDA7XG4gICAgICBjb25zdCBtdWx0ID0gTWF0aC5wb3coMTAsIGV4cCk7XG5cbiAgICAgIGNvbnN0IGludFZhbHVlID0gTWF0aC5mbG9vcih0aGlzLnZhbHVlICogbXVsdCArIDAuNSk7XG4gICAgICBjb25zdCBpbnRTdGVwID0gTWF0aC5mbG9vcih0aGlzLnN0ZXAgKiBtdWx0ICsgMC41KTtcbiAgICAgIGNvbnN0IHZhbHVlID0gKGludFZhbHVlIC0gaW50U3RlcCkgLyBtdWx0O1xuXG4gICAgICB0aGlzLnByb3BhZ2F0ZSh2YWx1ZSk7XG4gICAgfSwgZmFsc2UpO1xuXG4gICAgdGhpcy4kbmV4dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAvLyBtaW5pbWl6ZSBmbG9hdGluZyBwb2ludCBlcnJvclxuICAgICAgLy8gY29uc3Qgc3RlcHMgPSBNYXRoLmZsb29yKHRoaXMudmFsdWUgLyB0aGlzLnN0ZXAgKyAwLjUpO1xuICAgICAgLy8gY29uc3QgdmFsdWUgPSBNYXRoLm1heCh0aGlzLm1pbiwgdGhpcy5zdGVwICogKHN0ZXBzICsgMSkpO1xuXG4gICAgICAvLyBkbyBjb21wdXRhdGlvbiB3aXRoIGludGVnZXJzLCBsb29rcyBiZXR0ZXIgP1xuICAgICAgY29uc3QgZGVjaW1hbHMgPSB0aGlzLnN0ZXAudG9TdHJpbmcoKS5zcGxpdCgnLicpWzFdO1xuICAgICAgY29uc3QgZXhwID0gZGVjaW1hbHMgPyBkZWNpbWFscy5sZW5ndGggOiAwO1xuICAgICAgY29uc3QgbXVsdCA9IE1hdGgucG93KDEwLCBleHApO1xuXG4gICAgICBjb25zdCBpbnRWYWx1ZSA9IE1hdGguZmxvb3IodGhpcy52YWx1ZSAqIG11bHQgKyAwLjUpO1xuICAgICAgY29uc3QgaW50U3RlcCA9IE1hdGguZmxvb3IodGhpcy5zdGVwICogbXVsdCArIDAuNSk7XG4gICAgICBjb25zdCB2YWx1ZSA9IChpbnRWYWx1ZSArIGludFN0ZXApIC8gbXVsdDtcblxuICAgICAgdGhpcy5wcm9wYWdhdGUodmFsdWUpO1xuICAgIH0sIGZhbHNlKTtcblxuICAgIHRoaXMuJG51bWJlci5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoZSkgPT4ge1xuICAgICAgbGV0IHZhbHVlID0gdGhpcy4kbnVtYmVyLnZhbHVlO1xuICAgICAgdmFsdWUgPSB0aGlzLl9pc0ludFN0ZXAgPyBwYXJzZUludCh2YWx1ZSwgMTApIDogcGFyc2VGbG9hdCh2YWx1ZSk7XG4gICAgICB2YWx1ZSA9IE1hdGgubWluKHRoaXMubWF4LCBNYXRoLm1heCh0aGlzLm1pbiwgdmFsdWUpKTtcblxuICAgICAgdGhpcy5wcm9wYWdhdGUodmFsdWUpO1xuICAgIH0sIGZhbHNlKTtcbiAgfVxuXG4gIHByb3BhZ2F0ZSh2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSA9PT0gdGhpcy5fdmFsdWUpIHsgcmV0dXJuOyB9XG5cbiAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMuJG51bWJlci52YWx1ZSA9IHZhbHVlO1xuXG4gICAgdGhpcy5lbWl0KCdjaGFuZ2UnLCB0aGlzLl92YWx1ZSk7XG4gIH1cbn0iXX0=