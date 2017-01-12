"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = wrapComponent;
// function to add route params to component sources.routeParams
function wrapComponent(matches) {
  var Component = matches[0].handler;
  var routeParams = matches[0].params;
  var queryParams = matches.queryParams;
  return function WrappedComponent(sources) {
    return Component(Object.assign({}, sources, { routeParams: routeParams, queryParams: queryParams }));
  };
}