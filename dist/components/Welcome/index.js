'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Welcome;

var _dom = require('@cycle/dom');

var _xstream = require('xstream');

var _xstream2 = _interopRequireDefault(_xstream);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Welcome() {

  var vdom$ = _xstream2.default.of((0, _dom.section)('.home', [(0, _dom.h1)('The homepage'), (0, _dom.p)('Welcome to our spectacular web page with nothing special here.')]));

  return {
    DOM: vdom$
  };
}