import { at } from 'lodash'

export const getState = options => (state) => {
  let subState = state
  if (options.path !== undefined) subState = at(state, options.path)[0]

  return subState[options.name]
}

const getFactory = key => options => state => getState(options)(state)[key]
export const getKeys = getFactory('keys')
export const getAsArray = getFactory('array')
export const getLength = options => state => getKeys(options)(state).length
export const isInitialized = getFactory('initialized')

const getData = options => getFactory('data')(options)
export const get = ({ path, name }) => keys => (state) => {
  const data = getData({ path, name })(state)
  // All data
  if (!keys) return data
  // By keys
  if (Array.isArray(keys)) return keys.map(k => data[k])
  // By key
  return data[keys]
}

export const getBy = ({ path, name }) => (propertyPath, values) => (state) => {
  const data = getAsArray({ path, name })(state)
  if (Array.isArray(values)) return data.filter(d => values.includes(at(d, propertyPath)[0]))
  return data.filter(d => values === at(d, propertyPath)[0])
}
