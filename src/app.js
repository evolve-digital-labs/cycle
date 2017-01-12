import xs from 'xstream';
import extractSinks from './functions/extractSinks';
import wrapComponent from './functions/wrapComponent';
import RouteRecognizer from 'route-recognizer';

// Components
import Layout from './components/Layout';
import Welcome from './components/Welcome';
import NotFound from './components/NotFound';

// define routes
let router = new RouteRecognizer();
router.add([
  { path: '/', handler: Welcome }
]);
router.add([
  { path: '*path', handler: NotFound }
]);

export default function App(sources) {

  // a stream of top-level components
  // mapped from the history/route
  // stream
  const component$ = sources.history
    // parse routes
    .map(location => location.pathname+location.search)
    .map(pathname => router.recognize(pathname))
    // map to a component and run
    .map(wrapComponent)
    // run the component
    .map(Component => Component(sources));

  // finish up
  const sinks = extractSinks(component$);

  sinks.DOM = sinks.DOM.map(vdom => {
    return Layout(Object.assign({}, sources, {vdom: xs.of(vdom)})).DOM;
  }).flatten();

  return sinks;

}
