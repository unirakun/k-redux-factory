import * as actions from './actions'
import * as selectors from './selectors'
import reducer from './reducer'

export default (key, getNextKey, start) => path => prefix => Object.assign(
  reducer(key, getNextKey, start)(prefix),
  ...Object.keys(actions).map(k => ({ [k]: actions[k](prefix) })),
  ...Object.keys(selectors).map(k => ({ [k]: selectors[k](path)(prefix) })),
)
