'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = App;

var _xstream = require('xstream');

var _xstream2 = _interopRequireDefault(_xstream);

var _extractSinks = require('./functions/extractSinks');

var _extractSinks2 = _interopRequireDefault(_extractSinks);

var _wrapComponent = require('./functions/wrapComponent');

var _wrapComponent2 = _interopRequireDefault(_wrapComponent);

var _routeRecognizer = require('route-recognizer');

var _routeRecognizer2 = _interopRequireDefault(_routeRecognizer);

var _Layout = require('./components/Layout');

var _Layout2 = _interopRequireDefault(_Layout);

var _Welcome = require('./components/Welcome');

var _Welcome2 = _interopRequireDefault(_Welcome);

var _NotFound = require('./components/NotFound');

var _NotFound2 = _interopRequireDefault(_NotFound);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// define routes
var router = new _routeRecognizer2.default();

// Components

router.add([{ path: '/', handler: _Welcome2.default }]);
router.add([{ path: '*path', handler: _NotFound2.default }]);

function App(sources) {

  // a stream of top-level components
  // mapped from the history/route
  // stream
  var component$ = sources.history
  // parse routes
  .map(function (location) {
    return location.pathname + location.search;
  }).map(function (pathname) {
    return router.recognize(pathname);
  })
  // map to a component and run
  .map(_wrapComponent2.default)
  // run the component
  .map(function (Component) {
    return Component(sources);
  });

  // finish up
  var sinks = (0, _extractSinks2.default)(component$);

  sinks.DOM = sinks.DOM.map(function (vdom) {
    return (0, _Layout2.default)(Object.assign({}, sources, { vdom: _xstream2.default.of(vdom) })).DOM;
  }).flatten();

  return sinks;
}