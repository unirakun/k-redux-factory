const scope = action => `@trampss/${action.toUpperCase()}`

export const SET = prefix => scope(`SET_${prefix}`)
export const set = prefix => payload => ({ type: SET(prefix), payload })

export const RESET = prefix => scope(`RESET_${prefix}`)
export const reset = prefix => () => ({ type: RESET(prefix) })

export const ADD = prefix => scope(`ADD_${prefix}`)
export const add = prefix => payload => ({ type: ADD(prefix), payload })

export const UPDATE = prefix => scope(`UPDATE_${prefix}`)
export const update = prefix => payload => ({ type: UPDATE(prefix), payload })

export const REMOVE = prefix => scope(`REMOVE_${prefix}`)
export const remove = prefix => key => ({ type: REMOVE(prefix), payload: key })

export const ADD_OR_UPDATE = prefix => scope(`ADD_OR_UPDATE_${prefix}`)
export const addOrUpdate = prefix => payload => ({ type: ADD_OR_UPDATE(prefix), payload })
