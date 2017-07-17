import { SET, RESET } from '../actions'

export const initState = { data: undefined, initialized: false }

const reducer = (/* key */) => prefix =>
  (state = initState, { type, payload } = {}) => {
    switch (type) {
      case SET(prefix):
        return {
          data: payload,
          initialized: true,
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
