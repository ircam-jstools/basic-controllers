'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _BaseComponent = require('./BaseComponent');

var _BaseComponent2 = _interopRequireDefault(_BaseComponent);

var _display2 = require('../mixins/display');

var _display3 = _interopRequireDefault(_display2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AudioContext = window.AudioContext || window.webkitAudioContext;

/** @module basic-controllers */

var defaults = {
  label: 'Drag and drop audio files',
  labelProcess: 'process...',
  audioContext: null,
  container: null,
  callback: null
};

/**
 * Drag and drop zone for audio files returning `AudioBuffer`s and/or JSON
 * descriptor data.
 *
 * @param {Object} config - Override default parameters.
 * @param {String} [config.label='Drag and drop audio files'] - Label of the
 *  controller.
 * @param {String} [config.labelProcess='process...'] - Label of the controller
 *  while audio files are decoded.
 * @param {AudioContext} [config.audioContext=null] - Optionnal audio context
 *  to use in order to decode audio files.
 * @param {String|Element|basic-controller~Group} [config.container=null] -
 *  Container of the controller.
 * @param {Function} [config.callback=null] - Callback to be executed when the
 *  value changes.
 *
 * @example
 * import * as controllers from 'basic-controllers';
 *
 * const dragAndDrop = new controllers.DragAndDrop({
 *   container: '#container',
 *   callback: (results) => console.log(results),
 * });
 */

var DragAndDrop = function (_display) {
  _inherits(DragAndDrop, _display);

  function DragAndDrop(options) {
    _classCallCheck(this, DragAndDrop);

    var _this = _possibleConstructorReturn(this, (DragAndDrop.__proto__ || Object.getPrototypeOf(DragAndDrop)).call(this, 'drag-and-drop', defaults, options));

    _this._value = null;

    if (!_this.params.audioContext) _this.params.audioContext = new AudioContext();

    _get(DragAndDrop.prototype.__proto__ || Object.getPrototypeOf(DragAndDrop.prototype), 'initialize', _this).call(_this);
    return _this;
  }

  /**
   * Get the last results
   * @type {Object<String, AudioBuffer|JSON>}
   * @readonly
   */


  _createClass(DragAndDrop, [{
    key: 'render',
    value: function render() {
      var label = this.params.label;

      var content = '\n      <div class="drop-zone">\n        <p class="label">' + label + '</p>\n      </div>\n    ';

      this.$el = _get(DragAndDrop.prototype.__proto__ || Object.getPrototypeOf(DragAndDrop.prototype), 'render', this).call(this);
      this.$el.innerHTML = content;
      this.$dropZone = this.$el.querySelector('.drop-zone');
      this.$label = this.$el.querySelector('.label');

      this._bindEvents();

      return this.$el;
    }
  }, {
    key: '_bindEvents',
    value: function _bindEvents() {
      var _this2 = this;

      this.$dropZone.addEventListener('dragover', function (e) {
        e.preventDefault();
        e.stopPropagation();

        _this2.$dropZone.classList.add('drag');
        e.dataTransfer.dropEffect = 'copy';
      }, false);

      this.$dropZone.addEventListener('dragleave', function (e) {
        e.preventDefault();
        e.stopPropagation();

        _this2.$dropZone.classList.remove('drag');
      }, false);

      this.$dropZone.addEventListener('drop', function (e) {
        e.preventDefault();
        e.stopPropagation();

        var files = Array.from(e.dataTransfer.files);
        var audioFiles = files.filter(function (file) {
          if (/^audio/.test(file.type)) {
            file.shortType = 'audio';
            return true;
          } else if (/json$/.test(file.type)) {
            file.shortType = 'json';
            return true;
          }

          return false;
        });

        var results = {};
        var counter = 0;

        _this2.$label.textContent = _this2.params.labelProcess;

        var testEnd = function testEnd() {
          counter += 1;

          if (counter === audioFiles.length) {
            _this2._value = results;
            _this2.executeListeners(results);

            _this2.$dropZone.classList.remove('drag');
            _this2.$label.textContent = _this2.params.label;
          }
        };

        files.forEach(function (file, index) {
          var reader = new FileReader();

          reader.onload = function (e) {
            if (file.shortType === 'json') {
              results[file.name] = JSON.parse(e.target.result);
              testEnd();
            } else if (file.shortType === 'audio') {
              _this2.params.audioContext.decodeAudioData(e.target.result).then(function (audioBuffer) {
                results[file.name] = audioBuffer;
                testEnd();
              }).catch(function (err) {
                results[file.name] = null;
                testEnd();
              });
            }
          };

          if (file.shortType === 'json') reader.readAsText(file);else if (file.shortType === 'audio') reader.readAsArrayBuffer(file);
        });
      }, false);
    }
  }, {
    key: 'value',
    get: function get() {
      return this._value;
    }
  }]);

  return DragAndDrop;
}((0, _display3.default)(_BaseComponent2.default));

exports.default = DragAndDrop;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkRyYWdBbmREcm9wLmpzIl0sIm5hbWVzIjpbIkF1ZGlvQ29udGV4dCIsIndpbmRvdyIsIndlYmtpdEF1ZGlvQ29udGV4dCIsImRlZmF1bHRzIiwibGFiZWwiLCJsYWJlbFByb2Nlc3MiLCJhdWRpb0NvbnRleHQiLCJjb250YWluZXIiLCJjYWxsYmFjayIsIkRyYWdBbmREcm9wIiwib3B0aW9ucyIsIl92YWx1ZSIsInBhcmFtcyIsImNvbnRlbnQiLCIkZWwiLCJpbm5lckhUTUwiLCIkZHJvcFpvbmUiLCJxdWVyeVNlbGVjdG9yIiwiJGxhYmVsIiwiX2JpbmRFdmVudHMiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInByZXZlbnREZWZhdWx0Iiwic3RvcFByb3BhZ2F0aW9uIiwiY2xhc3NMaXN0IiwiYWRkIiwiZGF0YVRyYW5zZmVyIiwiZHJvcEVmZmVjdCIsInJlbW92ZSIsImZpbGVzIiwiQXJyYXkiLCJmcm9tIiwiYXVkaW9GaWxlcyIsImZpbHRlciIsImZpbGUiLCJ0ZXN0IiwidHlwZSIsInNob3J0VHlwZSIsInJlc3VsdHMiLCJjb3VudGVyIiwidGV4dENvbnRlbnQiLCJ0ZXN0RW5kIiwibGVuZ3RoIiwiZXhlY3V0ZUxpc3RlbmVycyIsImZvckVhY2giLCJpbmRleCIsInJlYWRlciIsIkZpbGVSZWFkZXIiLCJvbmxvYWQiLCJuYW1lIiwiSlNPTiIsInBhcnNlIiwidGFyZ2V0IiwicmVzdWx0IiwiZGVjb2RlQXVkaW9EYXRhIiwidGhlbiIsImF1ZGlvQnVmZmVyIiwiY2F0Y2giLCJlcnIiLCJyZWFkQXNUZXh0IiwicmVhZEFzQXJyYXlCdWZmZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxlQUFnQkMsT0FBT0QsWUFBUCxJQUF1QkMsT0FBT0Msa0JBQXBEOztBQUVBOztBQUVBLElBQU1DLFdBQVc7QUFDZkMsU0FBTywyQkFEUTtBQUVmQyxnQkFBYyxZQUZDO0FBR2ZDLGdCQUFjLElBSEM7QUFJ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dCBmcm9tICcuL0Jhc2VDb21wb25lbnQnO1xuaW1wb3J0IGRpc3BsYXkgZnJvbSAnLi4vbWl4aW5zL2Rpc3BsYXknO1xuXG5jb25zdCBBdWRpb0NvbnRleHQgPSAod2luZG93LkF1ZGlvQ29udGV4dCB8fCB3aW5kb3cud2Via2l0QXVkaW9Db250ZXh0KTtcblxuLyoqIEBtb2R1bGUgYmFzaWMtY29udHJvbGxlcnMgKi9cblxuY29uc3QgZGVmYXVsdHMgPSB7XG4gIGxhYmVsOiAnRHJhZyBhbmQgZHJvcCBhdWRpbyBmaWxlcycsXG4gIGxhYmVsUHJvY2VzczogJ3Byb2Nlc3MuLi4nLFxuICBhdWRpb0NvbnRleHQ6IG51bGwsXG4gIGNvbnRhaW5lcjogbnVsbCxcbiAgY2FsbGJhY2s6IG51bGwsXG59O1xuXG4vKipcbiAqIERyYWcgYW5kIGRyb3Agem9uZSBmb3IgYXVkaW8gZmlsZXMgcmV0dXJuaW5nIGBBdWRpb0J1ZmZlcmBzIGFuZC9vciBKU09OXG4gKiBkZXNjcmlwdG9yIGRhdGEuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyAtIE92ZXJyaWRlIGRlZmF1bHQgcGFyYW1ldGVycy5cbiAqIEBwYXJhbSB7U3RyaW5nfSBbY29uZmlnLmxhYmVsPSdEcmFnIGFuZCBkcm9wIGF1ZGlvIGZpbGVzJ10gLSBMYWJlbCBvZiB0aGVcbiAqICBjb250cm9sbGVyLlxuICogQHBhcmFtIHtTdHJpbmd9IFtjb25maWcubGFiZWxQcm9jZXNzPSdwcm9jZXNzLi4uJ10gLSBMYWJlbCBvZiB0aGUgY29udHJvbGxlclxuICogIHdoaWxlIGF1ZGlvIGZpbGVzIGFyZSBkZWNvZGVkLlxuICogQHBhcmFtIHtBdWRpb0NvbnRleHR9IFtjb25maWcuYXVkaW9Db250ZXh0PW51bGxdIC0gT3B0aW9ubmFsIGF1ZGlvIGNvbnRleHRcbiAqICB0byB1c2UgaW4gb3JkZXIgdG8gZGVjb2RlIGF1ZGlvIGZpbGVzLlxuICogQHBhcmFtIHtTdHJpbmd8RWxlbWVudHxiYXNpYy1jb250cm9sbGVyfkdyb3VwfSBbY29uZmlnLmNvbnRhaW5lcj1udWxsXSAtXG4gKiAgQ29udGFpbmVyIG9mIHRoZSBjb250cm9sbGVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2NvbmZpZy5jYWxsYmFjaz1udWxsXSAtIENhbGxiYWNrIHRvIGJlIGV4ZWN1dGVkIHdoZW4gdGhlXG4gKiAgdmFsdWUgY2hhbmdlcy5cbiAqXG4gKiBAZXhhbXBsZVxuICogaW1wb3J0ICogYXMgY29udHJvbGxlcnMgZnJvbSAnYmFzaWMtY29udHJvbGxlcnMnO1xuICpcbiAqIGNvbnN0IGRyYWdBbmREcm9wID0gbmV3IGNvbnRyb2xsZXJzLkRyYWdBbmREcm9wKHtcbiAqICAgY29udGFpbmVyOiAnI2NvbnRhaW5lcicsXG4gKiAgIGNhbGxiYWNrOiAocmVzdWx0cykgPT4gY29uc29sZS5sb2cocmVzdWx0cyksXG4gKiB9KTtcbiAqL1xuY2xhc3MgRHJhZ0FuZERyb3AgZXh0ZW5kcyBkaXNwbGF5KEJhc2VDb21wb25lbnQpIHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHN1cGVyKCdkcmFnLWFuZC1kcm9wJywgZGVmYXVsdHMsIG9wdGlvbnMpO1xuXG4gICAgdGhpcy5fdmFsdWUgPSBudWxsO1xuXG4gICAgaWYgKCF0aGlzLnBhcmFtcy5hdWRpb0NvbnRleHQpXG4gICAgICB0aGlzLnBhcmFtcy5hdWRpb0NvbnRleHQgPSBuZXcgQXVkaW9Db250ZXh0KCk7XG5cbiAgICBzdXBlci5pbml0aWFsaXplKCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBsYXN0IHJlc3VsdHNcbiAgICogQHR5cGUge09iamVjdDxTdHJpbmcsIEF1ZGlvQnVmZmVyfEpTT04+fVxuICAgKiBAcmVhZG9ubHlcbiAgICovXG4gIGdldCB2YWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBsYWJlbCB9ID0gdGhpcy5wYXJhbXM7XG4gICAgY29uc3QgY29udGVudCA9IGBcbiAgICAgIDxkaXYgY2xhc3M9XCJkcm9wLXpvbmVcIj5cbiAgICAgICAgPHAgY2xhc3M9XCJsYWJlbFwiPiR7bGFiZWx9PC9wPlxuICAgICAgPC9kaXY+XG4gICAgYDtcblxuICAgIHRoaXMuJGVsID0gc3VwZXIucmVuZGVyKCk7XG4gICAgdGhpcy4kZWwuaW5uZXJIVE1MID0gY29udGVudDtcbiAgICB0aGlzLiRkcm9wWm9uZSA9IHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoJy5kcm9wLXpvbmUnKTtcbiAgICB0aGlzLiRsYWJlbCA9IHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoJy5sYWJlbCcpO1xuXG4gICAgdGhpcy5fYmluZEV2ZW50cygpO1xuXG4gICAgcmV0dXJuIHRoaXMuJGVsO1xuICB9XG5cbiAgX2JpbmRFdmVudHMoKSB7XG4gICAgdGhpcy4kZHJvcFpvbmUuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgdGhpcy4kZHJvcFpvbmUuY2xhc3NMaXN0LmFkZCgnZHJhZycpO1xuICAgICAgZS5kYXRhVHJhbnNmZXIuZHJvcEVmZmVjdCA9ICdjb3B5JztcbiAgICB9LCBmYWxzZSk7XG5cbiAgICB0aGlzLiRkcm9wWm9uZS5hZGRFdmVudExpc3RlbmVyKCdkcmFnbGVhdmUnLCAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgdGhpcy4kZHJvcFpvbmUuY2xhc3NMaXN0LnJlbW92ZSgnZHJhZycpO1xuICAgIH0sIGZhbHNlKTtcblxuICAgIHRoaXMuJGRyb3Bab25lLmFkZEV2ZW50TGlzdGVuZXIoJ2Ryb3AnLCAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgY29uc3QgZmlsZXMgPSBBcnJheS5mcm9tKGUuZGF0YVRyYW5zZmVyLmZpbGVzKTtcbiAgICAgIGNvbnN0IGF1ZGlvRmlsZXMgPSBmaWxlcy5maWx0ZXIoKGZpbGUpID0+IHtcbiAgICAgICAgaWYgKC9eYXVkaW8vLnRlc3QoZmlsZS50eXBlKSkge1xuICAgICAgICAgIGZpbGUuc2hvcnRUeXBlID0gJ2F1ZGlvJztcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmICgvanNvbiQvLnRlc3QoZmlsZS50eXBlKSkge1xuICAgICAgICAgIGZpbGUuc2hvcnRUeXBlID0gJ2pzb24nO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IHJlc3VsdHMgPSB7fTtcbiAgICAgIGxldCBjb3VudGVyID0gMDtcblxuICAgICAgdGhpcy4kbGFiZWwudGV4dENvbnRlbnQgPSB0aGlzLnBhcmFtcy5sYWJlbFByb2Nlc3M7XG5cbiAgICAgIGNvbnN0IHRlc3RFbmQgPSAoKSA9PiB7XG4gICAgICAgIGNvdW50ZXIgKz0gMTtcblxuICAgICAgICBpZiAoY291bnRlciA9PT0gYXVkaW9GaWxlcy5sZW5ndGgpwqB7XG4gICAgICAgICAgdGhpcy5fdmFsdWUgPSByZXN1bHRzXG4gICAgICAgICAgdGhpcy5leGVjdXRlTGlzdGVuZXJzKHJlc3VsdHMpO1xuXG4gICAgICAgICAgdGhpcy4kZHJvcFpvbmUuY2xhc3NMaXN0LnJlbW92ZSgnZHJhZycpO1xuICAgICAgICAgIHRoaXMuJGxhYmVsLnRleHRDb250ZW50ID0gdGhpcy5wYXJhbXMubGFiZWw7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZmlsZXMuZm9yRWFjaCgoZmlsZSwgaW5kZXgpID0+IHtcbiAgICAgICAgY29uc3QgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcblxuICAgICAgICByZWFkZXIub25sb2FkID0gKGUpID0+IHtcbiAgICAgICAgICBpZiAoZmlsZS5zaG9ydFR5cGUgPT09ICdqc29uJykge1xuICAgICAgICAgICAgcmVzdWx0c1tmaWxlLm5hbWVdID0gSlNPTi5wYXJzZShlLnRhcmdldC5yZXN1bHQpO1xuICAgICAgICAgICAgdGVzdEVuZCgpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoZmlsZS5zaG9ydFR5cGUgPT09ICdhdWRpbycpIHtcbiAgICAgICAgICAgIHRoaXMucGFyYW1zLmF1ZGlvQ29udGV4dFxuICAgICAgICAgICAgICAuZGVjb2RlQXVkaW9EYXRhKGUudGFyZ2V0LnJlc3VsdClcbiAgICAgICAgICAgICAgLnRoZW4oKGF1ZGlvQnVmZmVyKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzdWx0c1tmaWxlLm5hbWVdID0gYXVkaW9CdWZmZXI7XG4gICAgICAgICAgICAgICAgdGVzdEVuZCgpO1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgICAgICAgIHJlc3VsdHNbZmlsZS5uYW1lXSA9IG51bGw7XG4gICAgICAgICAgICAgICAgdGVzdEVuZCgpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZmlsZS5zaG9ydFR5cGUgPT09ICdqc29uJylcbiAgICAgICAgICByZWFkZXIucmVhZEFzVGV4dChmaWxlKTtcbiAgICAgICAgZWxzZSBpZiAoZmlsZS5zaG9ydFR5cGUgPT09ICdhdWRpbycpXG4gICAgICAgICAgcmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKGZpbGUpO1xuICAgICAgfSk7XG4gICAgfSwgZmFsc2UpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IERyYWdBbmREcm9wO1xuIl19