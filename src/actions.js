export const SET = prefix => `@trampss/SET_${prefix.toUpperCase()}`
export const set = prefix => payload => ({ type: SET(prefix), payload })

export const RESET = prefix => `@trampss/RESET_${prefix.toUpperCase()}`
export const reset = prefix => () => ({ type: RESET(prefix) })

export const ADD = prefix => `@trampss/ADD_${prefix.toUpperCase()}`
export const add = prefix => payload => ({ type: ADD(prefix), payload })

export const DEL = prefix => `@trampss/DEL_${prefix.toUpperCase()}`
export const del = prefix => key => ({ type: DEL(prefix), payload: key })
