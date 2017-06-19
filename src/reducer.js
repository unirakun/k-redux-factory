import { keyBy, without, uniq, omit } from 'lodash'
import { SET, ADD, DEL, RESET } from './actions'

export const initState = { datas: {}, keys: [], nb: 0, initialized: false }

export default key => prefix =>
  (state = initState, { type = 'UNKONWN', payload } = {}) => {
    switch (type) {
      case SET(prefix):
        return {
          datas: keyBy(payload, key),
          keys: payload.map(element => element[key]),
          nb: payload.length,
          initialized: true,
        }
      case ADD(prefix):
        return {
          ...state,
          datas: { ...state.datas, [payload[key]]: payload },
          keys: uniq([...state.keys, payload[key]]),
          nb: state.keys.length + 1,
        }
      case DEL(prefix):
        return {
          datas: omit(state.datas, [payload]),
          keys: without(state.keys, payload),
          nb: state.keys.length - 1,
        }
      case RESET(prefix):
        return initState
      default:
        return state
    }
  }
