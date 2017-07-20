import { SET, RESET, UPDATE } from '../actions'

export const initState = { data: undefined, initialized: false }

const reducer = (/* key */) => prefix =>
  (state = initState, { type, payload } = {}) => {
    switch (type) {
      case SET(prefix):
        return {
          data: payload,
          initialized: true,
        }
      case UPDATE(prefix):
        return {
          ...state,
          data: {
            ...state.data,
            ...payload,
          },
        }
      case RESET(prefix):
        return initState
      default:
        return state
    }
  }

export default key => prefix => (ctx = {}) => ({
  ...ctx,
  state: reducer(key)(prefix)(ctx.state, ctx.action),
})
