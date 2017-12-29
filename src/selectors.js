import { at } from 'lodash'

export const getState = options => (state) => {
  /* local storage option */
  if (options.localStorage && localStorage) {
    const key = `@@KRF_${options.path ? `${options.path}.` : ''}${options.name}`
    if (localStorage.getItem(key)) return JSON.parse(localStorage.getItem(key))
  }

  let subState = state
  if (options.path !== undefined) subState = at(subState, options.path)[0]
  return subState[options.name]
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
