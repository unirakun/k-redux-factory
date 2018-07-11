import { getState } from '../../selectors'
import { initState } from './simple.middleware'

export default (options) => {
  const getStateWithOptions = getState(options)
  const get = () => rootState => getStateWithOptions(rootState)
  const isInitialized = (rootState) => {
    if (options.defaultData !== undefined) return getStateWithOptions(rootState) !== options.defaultData
    return get()(rootState) !== initState
  }

  return {
    get,
    isInitialized,
  }
}
