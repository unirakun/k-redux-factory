import { at } from 'lodash'

export const getState = path => prefix => (state) => {
  let subState = state
  if (path !== undefined) subState = at(state, path)[0]

  return subState[prefix]
}

const getFactory = key => path => prefix => state => getState(path)(prefix)(state)[key]
export const getKeys = getFactory('keys')
export const getAsArray = getFactory('array')
export const getNb = getFactory('nb')
export const isInitialized = getFactory('initialized')

const getData = getFactory('data')
export const get = path => prefix => keys => (state) => {
  const data = getData(path)(prefix)(state)
  // All data
  if (!keys) return data
  // By keys
  if (Array.isArray(keys)) return keys.map(k => data[k])
  // By key
  return data[keys]
}

export const getBy = path => prefix => (propertyPath, values) => (state) => {
  const data = getAsArray(path)(prefix)(state)
  if (!data) return []
  if (Array.isArray(values)) return data.filter(d => values.includes(at(d, propertyPath)[0]))
  return data.filter(d => values === at(d, propertyPath)[0])
}
