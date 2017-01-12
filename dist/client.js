'use strict';

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

var _dom = require('@cycle/dom');

var _http = require('@cycle/http');

var _history = require('@cycle/history');

var _xstreamRun = require('@cycle/xstream-run');

var _history2 = require('history');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _xstreamRun.run)(_app2.default, {
  DOM: (0, _dom.makeDOMDriver)('.app-container'),
  HTTP: (0, _http.makeHTTPDriver)(),
  history: (0, _history.makeHistoryDriver)((0, _history2.createHistory)(), { capture: true })
});