export const SET = prefix => `SET_${prefix}`
export const set = prefix => payload => ({ type: SET(prefix), payload })

export const RESET = prefix => `RESET_${prefix}`
export const reset = prefix => () => ({ type: RESET(prefix) })

export const ADD = prefix => `ADD_${prefix}`
export const add = prefix => payload => ({ type: ADD(prefix), payload })

export const REMOVE = prefix => `REMOVE_${prefix}`
export const remove = prefix => key => ({ type: REMOVE(prefix), payload: key })
