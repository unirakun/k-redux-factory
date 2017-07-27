import { SET, RESET, UPDATE } from '../../actions'

export const initState = {}
const defaultState = defaultData => defaultData !== undefined ? defaultData : initState

const reducer = (/* key */) => prefix => defaultData =>
  (state = defaultState(defaultData), { type, payload } = {}) => {
    switch (type) {
      case SET(prefix):
        return payload
      case UPDATE(prefix):
        return {
          ...state,
          ...payload,
        }
      case RESET(prefix):
        return defaultState(defaultData)
      default:
        return state
    }
  }

export default key => prefix => defaultData => (ctx = {}) => ({
  ...ctx,
  state: reducer(key)(prefix)(defaultData)(ctx.state, ctx.action),
})
