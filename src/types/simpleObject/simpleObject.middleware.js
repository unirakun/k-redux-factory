import { SET, RESET, UPDATE } from '../../actions'
import copyToLocalStorage from '../../localStorage'

export const initState = {}
const defaultState = defaultData => (defaultData !== undefined ? defaultData : initState)

const reducer = (/* key */) => prefix => ({ defaultData }) =>
  (state = defaultState(defaultData), { type, payload } = {}) => {
    switch (type) {
      case SET(prefix):
        return payload
      case UPDATE(prefix):
        return { ...state, ...payload }
      case RESET(prefix):
        return defaultState(defaultData)
      default:
        return state
    }
  }

const mapLocalStorage = (key, data, options) => {
  // TODO: add initialized on simpleObject => { data: '', initialized: false }
  if (typeof data === 'object') {
    if (data !== options.defaultData) localStorage.setItem(key, JSON.stringify(data))
    else {
      const localData = localStorage.getItem(key)
      if (localData) return JSON.parse(localData)
    }
  } else {
    localStorage.setItem(key, JSON.stringify(data))
  }
  return data
}

export default key => prefix => options => (ctx = {}) => ({
  ...ctx,
  state: copyToLocalStorage(
    reducer(key)(prefix)(options)(ctx.state, ctx.action),
  )(options)(mapLocalStorage),
})
