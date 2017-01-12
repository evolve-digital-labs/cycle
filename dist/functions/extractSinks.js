'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = extractSinks;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// takes a component stream and filters it, returning
// a new stream containing only the sinks that are used
// by that component
function extractSinks(component$) {

  return ['DOM', 'HTTP', 'history'].reduce(function (sinks, source) {
    return Object.assign(sinks, _defineProperty({}, source, component$.filter(function (sinks) {
      return sinks[source];
    }).map(function (sinks) {
      return sinks[source];
    }).flatten()));
  }, {});
}