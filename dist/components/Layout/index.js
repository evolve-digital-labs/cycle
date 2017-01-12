'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = Layout;

var _dom = require('@cycle/dom');

var _Nav = require('../Nav');

var _Nav2 = _interopRequireDefault(_Nav);

var _xstream = require('xstream');

var _xstream2 = _interopRequireDefault(_xstream);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Layout(sources) {
  var dom$ = _xstream2.default.combine(sources.vdom, (0, _Nav2.default)(sources).DOM).map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        vdom = _ref2[0],
        nav = _ref2[1];

    return (0, _dom.div)('.wrapper', [(0, _dom.h1)('Modus'), nav, vdom]);
  });

  return {
    DOM: dom$
  };
}