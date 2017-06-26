import { keyBy, without, uniq, omit } from 'lodash'
import { SET, ADD, REMOVE, RESET } from '../actions'
import { initState } from '../reducer'

const coreReducer = key => prefix =>
  (state = initState, { type, payload } = {}) => {
    switch (type) {
      case SET(prefix):
        return {
          data: keyBy(payload, key),
          keys: payload.map(element => element[key]),
          array: payload,
          initialized: true,
        }
      case ADD(prefix):
        return {
          ...state,
          data: { ...state.data, [payload[key]]: payload },
          keys: uniq([...state.keys, payload[key]]),
          array: [...state.array, payload],
          initialized: true,
        }
      case REMOVE(prefix):
        return {
          ...state,
          data: omit(state.data, [payload]),
          keys: without(state.keys, payload),
          array: state.array ? state.array.filter(o => o[key] !== payload) : [],
        }
      case RESET(prefix):
        return initState
      default:
        return state
    }
  }

export default key => prefix => (ctx = {}) => ({
  ...ctx,
  state: coreReducer(key)(prefix)(ctx.state, ctx.action),
})
