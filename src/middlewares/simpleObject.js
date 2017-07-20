import { SET, RESET, UPDATE } from '../actions'

export const initState = { data: undefined, initialized: false }

const init = defaultData => ({ ...initState, data: defaultData })

const reducer = (/* key */) => prefix => defaultData =>
  (state = init(defaultData), { type, payload } = {}) => {
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
        return init(defaultData)
      default:
        return state
    }
  }

export default key => prefix => defaultData => (ctx = {}) => ({
  ...ctx,
  state: reducer(key)(prefix)(defaultData)(ctx.state, ctx.action),
})
