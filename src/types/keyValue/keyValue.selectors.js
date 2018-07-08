import { getFromPath, memoize } from '../../utils'
import { getState } from '../../selectors'

export default (options) => {
  // get reducer state from rootState
  const getStateWithOptions = getState(options)

  // basic selectors
  const getData = rootState => getStateWithOptions(rootState).data
  const getMap = memoize(data => new Map(data))
  const mapToKeys = memoize(data => Array.from(getMap(data).keys()))
  const mapToValues = memoize(data => Array.from(getMap(data).values()))
  const getKeys = rootState => mapToKeys(getData(rootState))
  const getObject = memoize((data) => {
    const object = {}
    data.forEach(([key, value]) => {
      object[key] = value
    })
    return object
  })
  const get = keys => (rootState) => {
    const data = getData(rootState)
    // all data
    if (keys === undefined || keys === null) return getObject(data)
    // by key(s)
    const map = getMap(data)
    if (Array.isArray(keys)) return keys.map(key => map.get(key))
    return map.get(keys)
  }
  const getBy = (path, filters) => (rootState) => {
    const values = mapToValues(getMap(getData(rootState)))

    if (Array.isArray(filters)) return values.filter(d => filters.includes(getFromPath(d, path)))
    return values.filter(d => filters === getFromPath(d, path))
  }

  return {
    get,
    getKeys,
    getBy,
    getState: getStateWithOptions,
    getAsArray: rootState => mapToValues(getData(rootState)),
    getLength: rootState => getData(rootState).length,
    hasKey: key => rootState => getMap(getData(rootState)).has(key),
    isInitialized: rootState => getStateWithOptions(rootState).initialized,
  }
}
