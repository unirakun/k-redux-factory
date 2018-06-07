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
export const getKeys = getFactory('keys')
export const getAsArray = getFactory('array')
export const getLength = options => state => getKeys(options)(state).length
export const isInitialized = getFactory('initialized')

const getData = options => getFactory('data')(options)
export const get = options => keys => (state) => {
  const data = getData(options)(state)
  // All data
  if (keys === undefined || keys === null) return data
  // By keys
  if (Array.isArray(keys)) return keys.map(k => data[k])
  // By key
  return data[keys]
}

// const at = (data, path) => eval(`${data}${path}`)
export const getBy = options => (path, values) => (state) => {
  const data = getAsArray(options)(state)

  if (Array.isArray(values)) return data.filter(d => values.includes(getFromPath(d, path)))
  return data.filter(d => values === getFromPath(d, path))
}

export const hasKey = options => key => (state) => {
  const keys = getKeys(options)(state)

  return keys.includes(key)
}
