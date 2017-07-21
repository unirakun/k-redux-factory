import * as actions from './actions'
import * as selectors from './selectors'
import * as types from './types'
import reducer from './reducer'

const getWrappedStore = (middlewares = {}) => (options) => {
  const { key, path, type = 'keyValue', prefix = '', name, defaultData } = options
  const typeConfig = types[type]

  return Object.assign(
    reducer({ ...middlewares, engine: typeConfig.middlewares })(key)(`${prefix}${name}`)(defaultData),

    // type (debug purpose)
    { trampssType: type },

    // actions
    ...Object.keys(actions)
      .filter(k => typeConfig.actions.includes(k.toLowerCase()))
      .map(k => ({ [k]: actions[k](`${prefix}${name}`) })),

    // selectors
    ...Object.keys(selectors)
      .filter(k => typeConfig.selectors.includes(k))
      .map(k => ({ [k]: selectors[k](path)(name) })),
  )
}

// error :( - not a middleware nor an option parameter
const error = () => { throw Error('parameter is not a middleware configuration, nor a factory option object.') }

// params checkers
const isMiddleware = params => params.engine || params.pre || params.post
const isOptions = params => (!!params.name) || (typeof params === 'string')

// eslint-disable-next-line consistent-return
const factory = (forcedOptions = {}) => (params) => {
  // no param : error
  if (params === null || params === undefined) error()

  // middleware case
  if (isMiddleware(params)) {
    return options => getWrappedStore(params)({ ...options, ...forcedOptions })
  }
  // no middleware case
  if (isOptions(params)) {
    if (typeof params === 'string') return getWrappedStore()({ name: params, ...forcedOptions })
    return getWrappedStore()({ ...params, ...forcedOptions })
  }

  // not a valid param
  error()
}

export const simpleObject = factory({ type: 'simpleObject' })
export const keyValue = factory({ type: 'keyValue' })

// default public factory
export default factory()
