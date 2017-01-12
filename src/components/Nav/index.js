import xs from 'xstream';
import {nav, div, a} from '@cycle/dom';

export default function Nav() {

  let vdom$ = xs.of(
    nav([
      div([a({attrs: {href: '/'}}, 'Home')])
    ])
  );

  return {
    DOM: vdom$
  };
}
