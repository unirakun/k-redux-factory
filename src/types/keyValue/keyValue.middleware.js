import { keyBy, without, uniq, omit, orderBy, get, isObjectLike, isString, flatten } from 'lodash'
import { SET, ADD, UPDATE, REMOVE, RESET, ADD_OR_UPDATE, REPLACE, ORDER_BY } from '../../actions'

export const initState = { data: {}, keys: [], array: [], initialized: false }

const keyAlreadyExists =
  state => (key, instanceKey) => state.array.find(o => o[key] === instanceKey)

const add = (key, state, payload) => {
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

const update = (key, state, payload) => {
  const instanceKey = payload[key]

  return {
    ...state,
    data: { ...state.data, [instanceKey]: { ...state.data[instanceKey], ...payload } },
    array: state.array.map(o => (o[key] === instanceKey ? { ...o, ...payload } : o)),
  }
}

const replace = (key, state, payload) => {
  const instanceKey = payload[key]

  return {
    ...state,
    data: { ...state.data, [instanceKey]: payload },
    array: state.array.map(o => (o[key] === instanceKey ? payload : o)),
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
      case ADD(prefix): return add(key, state, payload)
      case ADD_OR_UPDATE(prefix): {
        if (!keyAlreadyExists(state)(key, payload[key])) return add(key, state, payload)
        return update(key, state, payload)
      }
      case UPDATE(prefix): {
        if (!keyAlreadyExists(state)(key, payload[key])) return state
        return update(key, state, payload)
      }
      case REPLACE(prefix): {
        if (!keyAlreadyExists(state)(key, payload[key])) return state
        return replace(key, state, payload)
      }
      case ORDER_BY(prefix): {
        let by = payload
        let orders = 'asc'
        if (isObjectLike(payload)) {
          by = payload.by
          orders = payload.desc ? 'desc' : 'asc'
        }
        const arraySorted = orderBy(
          state.array,
          isString(by) ? p => get(p, by) : by,
          orders,
        )
        return {
          ...state,
          array: arraySorted,
          keys: uniq(arraySorted.map(element => element[key])),
        }
      }
      case REMOVE(prefix): {
        const removeIds = flatten([payload])
        return {
          ...state,
          data: omit(state.data, removeIds),
          keys: without(state.keys, ...removeIds),
          array: state.array ? state.array.filter(o => !removeIds.includes(o[key])) : [],
        }
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
