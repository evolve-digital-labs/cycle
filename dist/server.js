'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /*eslint no-console: ["error", { allow: ["log"] }] */


var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

var _dom = require('@cycle/dom');

var _history = require('@cycle/history');

var _http = require('@cycle/http');

var _xstreamRun = require('@cycle/xstream-run');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var port = 3000;
var environment = process.env.NODE_ENV || 'development';
var app = (0, _express2.default)();

app.use('/assets', _express2.default.static(_path2.default.join(__dirname, '../public')));

app.use(appHandler);

app.listen(port, function () {
  console.log('listening on ' + port + ' in ' + environment + ' mode');
});

function appHandler(req, res) {
  console.log(req.method + ' ' + req.url);
  var wrappedMain = wrapMain(_app2.default);
  var history = (0, _history.createServerHistory)();
  (0, _xstreamRun.run)(wrappedMain, {
    DOM: (0, _dom.makeHTMLDriver)(function (html) {
      return res.send('<!doctype html>' + html);
    }),
    HTTP: (0, _http.makeHTTPDriver)(),
    history: (0, _history.makeHistoryDriver)(history)
  });
  history.push({
    pathname: req.path,
    search: '?' + req.url.split('?')[1]
  });
}

function wrapMain(main) {
  return function wrappedMain(sources) {
    var sinks = main(sources);
    sinks.DOM = sinks.DOM.map(wrapVTree).take(1);
    return sinks;
  };
}

function wrapVTree(vtree) {
  var _map = ['js', 'css'].map(function (ext) {
    return '/assets/bundle.' + (environment === 'production' ? 'min.' : '') + ext;
  }),
      _map2 = _slicedToArray(_map, 2),
      js = _map2[0],
      css = _map2[1];

  return (0, _dom.html)([(0, _dom.head)([(0, _dom.title)('Cycle'), (0, _dom.link)({ attrs: { rel: 'icon', href: 'data:;base64,iVBORw0KGgo=' } }), (0, _dom.link)({ attrs: { rel: 'stylesheet', href: css } }), (0, _dom.meta)({ attrs: { name: 'viewport', content: 'width=device-width, initial-scale=1' } })]), (0, _dom.body)([(0, _dom.div)('.app-container', [vtree]), (0, _dom.script)({ attrs: { src: js } })])]);
}