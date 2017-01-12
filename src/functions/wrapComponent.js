// function to add route params to component sources.routeParams
export default function wrapComponent(matches) {
  const Component = matches[0].handler;
  const routeParams = matches[0].params;
  const queryParams = matches.queryParams;
  return function WrappedComponent(sources) {
    return Component(Object.assign({}, sources, {routeParams, queryParams}));
  };
}
