export const SET = prefix => `SET_${prefix}`
export const set = prefix => payload => ({ type: SET(prefix), payload })

export const RESET = prefix => `RESET_${prefix}`
export const reset = prefix => () => ({ type: RESET(prefix) })

export const ADD = prefix => `ADD_${prefix}`
export const add = prefix => payload => ({ type: ADD(prefix), payload })

export const DEL = prefix => `DEL_${prefix}`
export const del = prefix => key => ({ type: DEL(prefix), payload: key })
