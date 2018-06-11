import { initState } from './simple.middleware'
import { getState } from '../../selectors'

export const get = options => () => state => getState(options)(state)

export const isInitialized = options => (state) => {
  if (options.defaultData !== undefined) return getState(options)(state) !== options.defaultData
  return get(options)()(state) !== initState
}
