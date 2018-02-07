import { SET, RESET, UPDATE } from './simpleObject.actions'

export const initState = {}
const defaultState = defaultData => (defaultData !== undefined ? defaultData : initState)

const reducer = (/* key */) => prefix => name => defaultData =>
  (state = defaultState(defaultData), { type, payload } = {}) => {
    switch (type) {
      case SET(prefix)(name):
        return payload
      case UPDATE(prefix)(name):
        return { ...state, ...payload }
      case RESET(prefix)(name):
        return defaultState(defaultData)
      default:
        return state
    }
  }

export default key => prefix => name => defaultData => (ctx = {}) => ({
  ...ctx,
  state: reducer(key)(prefix)(name)(defaultData)(ctx.state, ctx.action),
})
