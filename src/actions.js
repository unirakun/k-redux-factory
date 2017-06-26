const scope = action => `@trampss/${action.toUpperCase()}`

export const SET = prefix => scope(`SET_${prefix}`)
export const set = prefix => payload => ({ type: SET(prefix), payload })

export const RESET = prefix => scope(`RESET_${prefix}`)
export const reset = prefix => () => ({ type: RESET(prefix) })

export const ADD = prefix => scope(`ADD_${prefix}`)
export const add = prefix => payload => ({ type: ADD(prefix), payload })

export const DEL = prefix => scope(`DEL_${prefix}`)
export const del = prefix => key => ({ type: DEL(prefix), payload: key })
