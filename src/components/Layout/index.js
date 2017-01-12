import {div, h1} from '@cycle/dom';
import Nav from '../Nav';
import xs from 'xstream';

export default function Layout(sources) {
  const dom$ = xs.combine(sources.vdom, Nav(sources).DOM)
  .map(([vdom, nav]) => div('.wrapper', [
    h1('Modus'),
    nav,
    vdom
  ]));

  return {
    DOM: dom$
  };

}
