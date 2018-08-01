import { SET, ADD, UPDATE, REMOVE, RESET, ADD_OR_UPDATE } from './keyValue.actions'

export const initState = {
  data: [], // this is a serialized Map [[key, value], [key2, value2]]
  initialized: false,
}

const getAsArray = entry => (Array.isArray(entry) ? entry : [entry])

const toEntries = (key, payload) => payload.map(entity => [entity[key], entity])

const mapDataToState = state => data => ({
  ...state,
  data,
  initialized: true,
})

const set = (key, state, payload) => mapDataToState(state)(toEntries(key, getAsArray(payload)))

const add = (key, state, payload) => mapDataToState(state)(Array.from(new Map([...state.data, ...toEntries(key, getAsArray(payload))])))

const addOrUpdate = shouldAdd => (key, state, payload) => {
  const map = new Map(state.data)
  const instances = getAsArray(payload)

  instances.forEach((instance) => {
    const stored = map.get(instance[key])
    if (shouldAdd || instance) {
      map.set(instance[key], { ...stored, ...instance })
    }
  })

  if (map.size === 0) return state

  return mapDataToState(state)(Array.from(map.entries()))
}

const remove = (key, state, payload) => {
  const map = new Map(state.data)
  const instances = getAsArray(payload)

  instances.forEach((instance) => {
    map.delete(typeof instance === 'object' ? instance[key] : instance)
  })

  return mapDataToState(state)(Array.from(map.entries()))
}

const defaultState = (key, defaultData) => (defaultData !== undefined ? set(key, initState, defaultData) : initState)

const reducer = key => prefix => name => defaultData => (
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
)

export default key => prefix => name => defaultData => (ctx = {}) => ({
  ...ctx,
  state: reducer(key)(prefix)(name)(defaultData)(ctx.state, ctx.action),
})
