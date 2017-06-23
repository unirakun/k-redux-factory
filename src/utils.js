export default payload => key => keys => (getNextId, start) => {
  if (!getNextId || (keys.length === 0 && !start)) return payload
  // use case SET action
  if (Array.isArray(payload)) {
    let sequence = [start]
    return payload.map((p) => {
      if (!p[key]) {
        const raw = { ...p, [key]: getNextId(sequence) }
        sequence = [...sequence, raw[key]]
        return raw
      }
      return p
    })
  }
  // use case ADD action
  if (payload[key]) return payload
  return { ...payload, [key]: getNextId(keys || [start]) }
}
