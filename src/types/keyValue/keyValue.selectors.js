const getFromPath = (data, path) => path.split('.').reduce(
  (curr, sub) => curr && curr[sub],
  data,
)

const memoize = (callback) => {
  const memory = {
    data: undefined,
    result: undefined,
  }

  return (data) => {
    if (memory.data !== data) {
      memory.data = data
      memory.result = callback(data)
    }

    return memory.result
  }
}

export default (options) => {
  // get reducer state from rootState
  const getState = (rootState) => {
    const { path, name } = options
    let subState = rootState

    if (path !== undefined && path.length > 0) subState = getFromPath(rootState, path)

    return subState[name]
  }

  // basic selectors
  const getData = rootState => getState(rootState).data
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
    getState,
    get,
    getKeys,
    getBy,
    getAsArray: rootState => mapToValues(getData(rootState)),
    getLength: rootState => getData(rootState).length,
    hasKey: key => rootState => getMap(getData(rootState)).has(key),
    isInitialized: rootState => getState(rootState).initialized,
  }
}
