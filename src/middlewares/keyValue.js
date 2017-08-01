import { keyBy, without, uniq, omit } from 'lodash'
import { SET, ADD, UPDATE, REMOVE, RESET, ADD_OR_UPDATE } from '../actions'

export const initState = { data: {}, keys: [], array: [], initialized: false }

const keyAlreadyExists =
  state => (key, instanceKey) => state.array.find(o => o[key] === instanceKey)

const update = (key, state, payload) => {
  const instanceKey = payload[key]

  return {
    ...state,
    data: { ...state.data, [instanceKey]: { ...state.data[instanceKey], ...payload } },
    array: state.array.map(o => (o[key] === instanceKey ? { ...o, ...payload } : o)),
  }
}

const reducer = key => prefix => (/* defaultData */) =>
  (state = initState, { type, payload } = {}) => {
    switch (type) {
      case SET(prefix):
        return {
          data: keyBy(payload, key),
          keys: uniq(payload.map(element => element[key])),
          array: payload,
          initialized: true,
        }
      case ADD(prefix): {
        let array
        const instanceKey = payload[key]
        if (!keyAlreadyExists(state)(key, instanceKey)) {
          array = [...state.array, payload]
        } else {
          array = state.array.map(o => (o[key] === instanceKey ? payload : o))
        }

        return {
          ...state,
          data: { ...state.data, [instanceKey]: payload },
          keys: uniq([...state.keys, instanceKey]),
          array,
          initialized: true,
        }
      }
      case ADD_OR_UPDATE(prefix): return update(key, state, payload)
      case UPDATE(prefix): {
        const instanceKey = payload[key]
        if (!keyAlreadyExists(state)(key, instanceKey)) return state
        return update(key, state, payload)
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

export default key => prefix => defaultData => (ctx = {}) => ({
  ...ctx,
  state: reducer(key)(prefix)(defaultData)(ctx.state, ctx.action),
})
