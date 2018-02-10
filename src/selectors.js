import { at } from 'lodash'

export const getState = options => (state) => {
  let subState = state
  const { name, path } = options

  if (path !== undefined && path.length > 0) [subState] = at(state, path)

  return subState[name]
}

const getFactory = key => options => state => getState(options)(state)[key]
export const getKeys = getFactory('keys')
export const getAsArray = getFactory('array')
export const getLength = options => state => getKeys(options)(state).length
export const isInitialized = getFactory('initialized')

const getData = options => getFactory('data')(options)
export const get = options => keys => (state) => {
  const data = getData(options)(state)
  // All data
  if (!keys) return data
  // By keys
  if (Array.isArray(keys)) return keys.map(k => data[k])
  // By key
  return data[keys]
}

export const getBy = options => (propertyPath, values) => (state) => {
  const data = getAsArray(options)(state)
  if (Array.isArray(values)) return data.filter(d => values.includes(at(d, propertyPath)[0]))
  return data.filter(d => values === at(d, propertyPath)[0])
}

export const hasKey = options => key => (state) => {
  const keys = getKeys(options)(state)

  return keys.includes(key)
}
