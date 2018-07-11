export const getFromPath = (data, path) => path.split('.').reduce(
  (curr, sub) => curr && curr[sub],
  data,
)

export const memoize = (callback) => {
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
