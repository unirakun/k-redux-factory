import { SET, ADD, UPDATE, REMOVE, RESET, ADD_OR_UPDATE, update } from './keyValue.actions'

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

const set = (key, state, payload) => mapDataToState(state)(toObject(key, getAsArray(payload)))

const add = (key, state, payload) => mapDataToState(state)({ ...state.data, ...toObject(key, getAsArray(payload)) })

const addOrUpdate = shouldAdd => (key, state, payload) => {
  const instances = getAsArray(payload)
  const updatedInstances = []

  instances.forEach((instance) => {
    if (shouldAdd || keyAlreadyExists(state)(instance[key])) {
      updatedInstances.push({ ...state.data[instance[key]], ...instance })
    }
  })

  if (updatedInstances.length === 0) return state

  return mapDataToState(state)({ ...state.data, ...toObject(key, updatedInstances) })
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
      case SET(prefix)(name): return set(key, state, payload)
      case ADD(prefix)(name): return add(key, state, payload)
      case ADD_OR_UPDATE(prefix)(name): return addOrUpdate(true)(key, state, payload)
      case REMOVE(prefix)(name): return remove(key, state, payload)
      case RESET(prefix)(name): return defaultState(key, defaultData)
      case UPDATE(prefix)(name): return addOrUpdate(false)(key, state, payload)
      default: return state
    }
  }

export default key => prefix => name => defaultData => (ctx = {}) => ({
  ...ctx,
  state: reducer(key)(prefix)(name)(defaultData)(ctx.state, ctx.action),
})
