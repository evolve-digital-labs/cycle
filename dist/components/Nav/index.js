'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Nav;

var _xstream = require('xstream');

var _xstream2 = _interopRequireDefault(_xstream);

var _dom = require('@cycle/dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Nav() {

  var vdom$ = _xstream2.default.of((0, _dom.nav)([(0, _dom.div)([(0, _dom.a)({ attrs: { href: '/' } }, 'Home')])]));

  return {
    DOM: vdom$
  };
}