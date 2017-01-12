// takes a component stream and filters it, returning
// a new stream containing only the sinks that are used
// by that component
export default function extractSinks(component$) {

  return ['DOM', 'HTTP', 'history'].reduce((sinks, source) =>
    Object.assign(sinks, {
      [source]: component$
        .filter(sinks => sinks[source])
        .map(sinks => sinks[source])
        .flatten()
    })
  , {});

}
