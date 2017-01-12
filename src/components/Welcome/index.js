import {section, h1, p} from '@cycle/dom';
import xs from 'xstream';

export default function Welcome() {

  let vdom$ = xs.of(
    section('.home', [
      h1('The homepage'),
      p('Welcome to our spectacular web page with nothing special here.')
    ])
  );

  return {
    DOM: vdom$
  };
}
