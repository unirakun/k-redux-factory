import { core } from './middlewares'

export const initState = { data: {}, keys: [], array: [], initialized: false }

export default (middlewares = {}) => key => prefix =>
  (state = initState, { type = 'UNKNOWN', payload } = {}) => {
    let prevCtx = { state, action: { type, payload } }

    // middlewares to call (in right order)
    const middlewaresToCall = [
      ...(middlewares.pre || []),
      core,
      ...(middlewares.post || []),
    ]

    middlewaresToCall
      // pass parameters
      .map(middleware => middleware(key)(prefix))
      // call middlewares
      .forEach((middleware) => {
        prevCtx = middleware(prevCtx)
      })

    // returns last results to Redux
    return prevCtx.state
  }
