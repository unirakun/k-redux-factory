import * as actions from './actions'
import * as selectors from './selectors'
import * as types from './types'
import reducer from './reducer'

const func = (middlewares = {}) => key => path => type => prefix => name => Object.assign(
  reducer({ ...middlewares, engine: type.middlewares })(key)(`${prefix}${name}`),

  // actions
  ...Object.keys(actions)
    .filter(k => type.actions.includes(k))
    .map(k => ({ [k]: actions[k](`${prefix}${name}`) })),

  // selectors
  ...Object.keys(selectors)
    .filter(k => type.selectors.includes(k))
    .map(k => ({ [k]: selectors[k](path)(name) })),
)


export default middlewares => key => path => (options) => {
  let name
  let prefix = ''
  let type = 'map'

  // retrieve options
  if (typeof options === 'string') name = options
  else {
    name = options.name
    prefix = options.prefix || ''
    type = options.type || 'map'
  }

  return func(middlewares)(key)(path)(types[type])(prefix)(name)
}
