/*eslint no-console: ["error", { allow: ["log"] }] */
import express from 'express';
import path from 'path';
import main from './app';
import {html, head, meta, link, title, body, div, script, makeHTMLDriver} from '@cycle/dom';
import {makeHistoryDriver, createServerHistory} from '@cycle/history';
import {makeHTTPDriver} from '@cycle/http';
import {run} from '@cycle/xstream-run';

const port = 3000;
const environment = process.env.NODE_ENV || 'development';
const app = express();

app.use('/assets', express.static(path.join(__dirname, '../public')))

app.use(appHandler);

app.listen(port, () => {
  console.log(`listening on ${port} in ${environment} mode`);
});

function appHandler(req, res) {
  console.log(`${req.method} ${req.url}`);
  const wrappedMain = wrapMain(main);
  const history = createServerHistory();
  run(wrappedMain, {
    DOM: makeHTMLDriver(html => res.send(`<!doctype html>${html}`)),
    HTTP: makeHTTPDriver(),
    history: makeHistoryDriver(history)
  });
  history.push({
    pathname: req.path,
    search: '?'+req.url.split('?')[1]
  });
  
}

function wrapMain(main) {
  return function wrappedMain(sources) {
    let sinks = main(sources);
    sinks.DOM = sinks.DOM.map(wrapVTree).take(1);
    return sinks;
  };
}

function wrapVTree(vtree) {
  const [js, css] = ['js', 'css'].map(ext => '/assets/bundle.'+(environment === 'production' ? 'min.' : '')+ext);

  return html([
    head([
      title('Cycle'),
      link({attrs: {rel: 'icon', href: 'data:;base64,iVBORw0KGgo='}}),
      link({attrs: {rel: 'stylesheet', href: css}}),
      meta({attrs: {name: 'viewport', content: 'width=device-width, initial-scale=1'}})
    ]),
    body([
      div('.app-container', [vtree]),
      script({attrs: {src: js}})
    ])
  ]);
}
