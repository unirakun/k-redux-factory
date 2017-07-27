import { initState } from './simpleObject.middleware'
import { getState } from '../../selectors'

const get = options => () => state => getState(options)(state)

const isInitialized = options => (state) => {
  if (options.defaultData !== undefined) return getState(options)(state) !== options.defaultData
  return get(options)()(state) !== initState
}

export { get, isInitialized }
