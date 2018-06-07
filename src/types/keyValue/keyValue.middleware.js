import { SET, ADD, UPDATE, REMOVE, RESET, ADD_OR_UPDATE } from './keyValue.actions'

export const initState = {
  data: {},
  keys: [],
  array: [],
  initialized: false,
}

const getAsArray = entry => (Array.isArray(entry) ? entry : [entry])

const toObject = (key, entry) => {
  const object = {}
  getAsArray(entry).forEach((entity) => { object[entity[key]] = entity })

  return object
}

const keyAlreadyExists = state => key => (state.data[key] !== undefined)

const mapDataToState = state => data => ({
  ...state,
  data,
  keys: Object.keys(data),
  array: Object.values(data),
  initialized: true,
})

const set = (key, state, payload) => mapDataToState(state)(toObject(key, payload))

const add = (key, state, payload) => {
  const instanceKey = payload[key]

  return mapDataToState(state)({ ...state.data, [instanceKey]: payload })
}

const addOrUpdate = (key, state, payload) => {
  const instanceKey = payload[key]

  return mapDataToState(state)({ ...state.data, [instanceKey]: { ...state.data[instanceKey], ...payload } })
}

const remove = (key, state, payload) => {
  const keysToRemove = getAsArray(payload)
  const data = { ...state.data }

  keysToRemove.forEach((k) => { delete data[k] })

  return mapDataToState(state)(data)
}

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

      // default
      default: return state
    }
  }

export default key => prefix => name => defaultData => (ctx = {}) => ({
  ...ctx,
  state: reducer(key)(prefix)(name)(defaultData)(ctx.state, ctx.action),
})
