const scope = action => `@@krf/${action.toUpperCase()}`

const getPrefix = prefix => name => `${prefix ? '>' : ''}${prefix}>${name}`

export const SET = prefix => name => scope(`SET${getPrefix(prefix)(name)}`)
export const set = prefix => name => payload => ({ type: SET(prefix)(name), payload })

export const RESET = prefix => name => scope(`RESET${getPrefix(prefix)(name)}`)
export const reset = prefix => name => () => ({ type: RESET(prefix)(name) })

export const ADD = prefix => name => scope(`ADD${getPrefix(prefix)(name)}`)
export const add = prefix => name => payload => ({ type: ADD(prefix)(name), payload })

export const UPDATE = prefix => name => scope(`UPDATE${getPrefix(prefix)(name)}`)
export const update = prefix => name => payload => ({ type: UPDATE(prefix)(name), payload })

export const REMOVE = prefix => name => scope(`REMOVE${getPrefix(prefix)(name)}`)
export const remove = prefix => name => key => ({ type: REMOVE(prefix)(name), payload: key })

export const ADD_OR_UPDATE = prefix => name => scope(`ADD_OR_UPDATE${getPrefix(prefix)(name)}`)
export const addOrUpdate = prefix => name => payload => ({ type: ADD_OR_UPDATE(prefix)(name), payload })
