import { keyBy, without, uniq, omit } from 'lodash'
import { SET, ADD, DEL, RESET } from './actions'
import generateId from './utils'

export const initState = { data: {}, keys: [], array: [], nb: 0, initialized: false }

export default (key, getNextId, start) => prefix =>
  (state = initState, { type = 'UNKONWN', payload } = {}) => {
    switch (type) {
      case SET(prefix): {
        const p = generateId(payload)(key)(state.keys)(getNextId, start)
        return {
          data: keyBy(p, key),
          keys: p.map(element => element[key]),
          array: p,
          nb: p.length,
          initialized: true,
        }
      }
      case ADD(prefix): {
        const p = generateId(payload)(key)(state.keys)(getNextId, start)
        return {
          ...state,
          data: { ...state.datas, [p[key]]: p },
          keys: uniq([...state.keys, p[key]]),
          array: [...state.array, p],
          nb: state.keys.length + 1,
          initialized: true,
        }
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
