import * as actions from './actions'
import * as selectors from './selectors'
import reducer from './reducer'

const func = middlewares => key => path => prefix => name => Object.assign(
  reducer(middlewares)(key)(`${prefix}${name}`),
  ...Object.keys(actions).map(k => ({ [k]: actions[k](`${prefix}${name}`) })),
  ...Object.keys(selectors).map(k => ({ [k]: selectors[k](path)(name) })),
)


export default middlewares => key => path => (options) => {
  let name
  let prefix = ''

  // retrieve options
  if (typeof options === 'string') name = options
  else {
    name = options.name
    prefix = (options.prefix) || ''
  }

  return func(middlewares)(key)(path)(prefix)(name)
}
