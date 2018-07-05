const getFromPath = (data, path) => path.split('.').reduce(
  (curr, sub) => curr && curr[sub],
  data,
)

export const getState = options => (state) => {
  let subState = state
  const { name, path } = options

  if (path !== undefined && path.length > 0) subState = getFromPath(state, path)

  return subState[name]
}

const getFactory = key => options => state => getState(options)(state)[key]
export const isInitialized = getFactory('initialized')
const getData = getFactory('data')

// TODO: memoize
const getMap = options => state => new Map(getData(options)(state))

// TODO: memoize
const getAsObject = options => (state) => {
  const object = {}

  getData(options)(state).forEach(([key, value]) => { object[key] = value })

  return object
}

export const get = options => keys => (state) => {
  const map = getMap(options)(state)

  // All data
  if (keys === undefined || keys === null) return getAsObject(options)(state)
  // By keys or key
  if (Array.isArray(keys)) return keys.map(k => map.get(k))
  // By key
  return map.get(keys)
}

// TODO: memoize
export const getKeys = options => state => Array.from(getMap(options)(state).keys())
// TODO: memoize
export const getAsArray = options => state => Array.from(getMap(options)(state).values())
export const getLength = options => state => getData(options)(state).length

export const getBy = options => (path, values) => (state) => {
  const data = getAsArray(options)(state)

  if (Array.isArray(values)) return data.filter(d => values.includes(getFromPath(d, path)))
  return data.filter(d => values === getFromPath(d, path))
}

export const hasKey = options => key => state => !!get(options)(key)(state)
