'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = NotFound;

var _dom = require('@cycle/dom');

var _xstream = require('xstream');

var _xstream2 = _interopRequireDefault(_xstream);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function NotFound() {

  var vdom$ = _xstream2.default.of((0, _dom.section)([(0, _dom.h1)('404 Not Found'), (0, _dom.p)('Sorry!')]));

  return {
    DOM: vdom$
  };
}