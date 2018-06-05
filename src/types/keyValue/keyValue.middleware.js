import { omit, orderBy, get } from 'lodash'
import { SET, ADD, UPDATE, REMOVE, RESET, ADD_OR_UPDATE, REPLACE, ORDER_BY } from './keyValue.actions'

export const initState = {
  data: {},
  keys: [],
  array: [],
  initialized: false,
}

const keyAlreadyExists = state => key => state.keys.includes(key)

const mapDataToState = state => data => ({
  ...state,
  data,
  keys: Object.keys(data),
  array: Object.values(data),
  initialized: true,
})

const set = (key, state, payload) => {
  const data = [].concat(payload).reduce(
    (acc, curr) => ({ ...acc, [curr[key]]: curr }),
    {},
  )

  return mapDataToState(state)(data)
}

const add = (key, state, payload) => {
  const instanceKey = payload[key]

  return mapDataToState(state)({ ...state.data, [instanceKey]: payload })
}

const addOrUpdate = (key, state, payload) => {
  const instanceKey = payload[key]

  return mapDataToState(state)({ ...state.data, [instanceKey]: { ...state.data[instanceKey], ...payload } })
}

const remove = (key, state, payload) => mapDataToState(state)(omit(state.data, [].concat(payload)))

const defaultState = (key, defaultData) => (defaultData !== undefined ? set(key, {}, defaultData) : initState)

const reducer = key => prefix => name => defaultData =>
  (state = defaultState(key, defaultData), { type, payload } = {}) => {
    switch (type) {
      // simple
      case SET(prefix)(name): return set(key, state, payload)
      case ADD(prefix)(name): return add(key, state, payload)
      case ADD_OR_UPDATE(prefix)(name): return addOrUpdate(key, state, payload)
      case REMOVE(prefix)(name): return remove(key, state, payload)
      case RESET(prefix)(name): return defaultState(key, defaultData)

      // with key existance test
      case UPDATE(prefix)(name): return keyAlreadyExists(state)(payload[key]) ? addOrUpdate(key, state, payload) : state
      case REPLACE(prefix)(name): return keyAlreadyExists(state)(payload[key]) ? add(key, state, payload) : state

      // heavy
      case ORDER_BY(prefix)(name): {
        let by = payload
        let orders = 'asc'
        if (typeof payload === 'object' && payload.by) {
          by = payload.by // eslint-disable-line prefer-destructuring
          orders = payload.desc ? 'desc' : 'asc'
        }

        const arraySorted = orderBy(
          state.array,
          typeof by === 'string' ? p => get(p, by) : by,
          orders,
        )

        return {
          ...state,
          array: arraySorted,
          keys: arraySorted.map(element => element[key]),
        }
      }
      default: return state
    }
  }

export default key => prefix => name => defaultData => (ctx = {}) => ({
  ...ctx,
  state: reducer(key)(prefix)(name)(defaultData)(ctx.state, ctx.action),
})
