import { keyBy, without, uniq, omit } from 'lodash'
import { SET, ADD, DEL, RESET } from './actions'

export const initState = { data: {}, keys: [], array: [], nb: 0, initialized: false }

export default key => prefix =>
  (state = initState, { type = 'UNKONWN', payload } = {}) => {
    switch (type) {
      case SET(prefix):
        return {
          data: keyBy(payload, key),
          keys: payload.map(element => element[key]),
          array: payload,
          nb: payload.length,
          initialized: true,
        }
      case ADD(prefix):
        return {
          ...state,
          data: { ...state.data, [payload[key]]: payload },
          keys: uniq([...state.keys, payload[key]]),
          array: [...state.array, payload],
          nb: state.keys.length + 1,
          initialized: true,
        }
      case DEL(prefix):
        return {
          ...state,
          data: omit(state.data, [payload]),
          keys: without(state.keys, payload),
          array: state.array ? state.array.filter(o => o[key] !== payload) : [],
          nb: state.keys.length - 1,
        }
      case RESET(prefix):
        return initState
      default:
        return state
    }
  }
