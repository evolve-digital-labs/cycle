import main from './app';
import {makeDOMDriver} from '@cycle/dom';
import {makeHTTPDriver} from '@cycle/http';
import {makeHistoryDriver} from '@cycle/history';
import {run} from '@cycle/xstream-run';
import {createHistory} from 'history';

run(main, {
  DOM: makeDOMDriver('.app-container'),
  HTTP: makeHTTPDriver(),
  history: makeHistoryDriver(createHistory(), {capture: true})
});
