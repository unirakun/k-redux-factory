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

const getDatas = getFactory('datas')
export const get = path => prefix => state => (keys) => {
  const datas = getDatas(path)(prefix)(state)
  // All datas
  if (!keys) return datas
  // By keys
  if (Array.isArray(keys)) return keys.map(k => datas[k])
  // By key
  return datas[keys]
}

