const localKey = ({ path, name }) => `@@KRF_${path ? `${path}.` : ''}${name}`

export default data => options => (mapper) => {
  if (!options.localStorage) return data
  const key = localKey(options)
  return mapper(key, data, options)
}
