export default middlewares => key => prefix => name => defaultData =>
  (state, { type = 'UNKNOWN', payload } = {}) => {
    let prevCtx = { state, action: { type, payload } }

    // middlewares to call (in right order)
    const middlewaresToCall = [
      // injected by user
      ...(middlewares.pre || []),
      // injected by types selection (reducer type)
      ...(middlewares.engine || []),
      // injected by user
      ...(middlewares.post || []),
    ]

    middlewaresToCall
      // pass parameters
      .map(middleware => middleware(key)(prefix)(name)(defaultData))
      // call middlewares
      .forEach((middleware) => {
        prevCtx = middleware(prevCtx)
      })

    // returns last results to Redux
    return prevCtx.state
  }
