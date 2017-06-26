import * as actions from './actions'
import * as selectors from './selectors'
import reducer from './reducer'

const func = middlewares => key => path => prefix => Object.assign(
  reducer(middlewares)(key)(prefix),
  ...Object.keys(actions).map(k => ({ [k]: actions[k](prefix) })),
  ...Object.keys(selectors).map(k => ({ [k]: selectors[k](path)(prefix) })),
)

export default (...args) => {
  const length = args.length
  const [middlewares, key, path, prefix] = args

  if (length < 2) return func(middlewares)
  if (length === 2) return func(middlewares)(key)
  if (length === 3) return func(middlewares)(key)(path)
  return func(middlewares)(key)(path)(prefix)
}
