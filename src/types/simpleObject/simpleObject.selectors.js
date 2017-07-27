/* eslint-disable import/prefer-default-export */
import { initState } from './simpleObject.middleware'
import { getState } from '../../selectors'

export const get = options => () => state => getState(options)(state)

export const isInitialized = options => (state) => {
  if (options.defaultData !== undefined) return state[options.name] !== options.defaultData
  return get(options)()(state) !== initState
}
