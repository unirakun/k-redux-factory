import { initState } from './simple.middleware'

// TODO: make it a util (and factorize code)
const getFromPath = (data, path) => path.split('.').reduce(
  (curr, sub) => curr && curr[sub],
  data,
)

export default (options) => {
  // TODO: make it a util (and factorize code)
  const getState = (rootState) => {
    const { path, name } = options
    let subState = rootState

    if (path !== undefined && path.length > 0) subState = getFromPath(rootState, path)

    return subState[name]
  }

  const get = () => rootState => getState(rootState)

  return {
    get,
    isInitialized: (rootState) => {
      if (options.defaultData !== undefined) return getState(rootState) !== options.defaultData
      return get()(rootState) !== initState
    },
  }
}
