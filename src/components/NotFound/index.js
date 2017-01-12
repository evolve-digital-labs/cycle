import {section, h1, p} from '@cycle/dom';
import xs from 'xstream';

export default function NotFound() {

  let vdom$ = xs.of(
    section([
      h1('404 Not Found'),
      p('Sorry!')
    ])
  );

  return {
    DOM: vdom$
  };
}
