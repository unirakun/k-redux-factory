import * as types from './types/index'
import reducer from './reducer'

const defaultOptions = {
  key: 'id',
  type: 'keyValue',
  prefix: '',
}

const getWrappedStore = (middlewares = {}) => (options = {}) => {
  const innerOptions = { ...defaultOptions, ...options }
  const {
    key,
    type,
    prefix,
    name,
    defaultData,
  } = innerOptions

  const typeConfig = types[type]

  return Object.assign(
    reducer({ ...middlewares, engine: typeConfig.middlewares })(key)(prefix)(name)(defaultData),

    // type (debug purpose)
    {
      krfType: type,
      krfDefaultData: defaultData,
    },

    // actions
    ...Object.keys(typeConfig.actions).map(k => ({ [k]: typeConfig.actions[k](prefix)(name) })),

    // selectors
    ...Object.keys(typeConfig.selectors).map(k => ({ [k]: typeConfig.selectors[k](innerOptions) })),
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

export const keyValue = factory({ type: 'keyValue' })

const simpleFactory = defaultData => factory({ type: 'simpleObject', defaultData })
export const simple = simpleFactory({})
Object.assign(
  simple,
  {
    bool: simpleFactory(false),
    string: simpleFactory(''),
    array: simpleFactory([]),
  },
)

// older method deprecated
export const simpleObject = (params) => {
  console.warn('/KRF/ You use a deprecated "simpleObject" method. We recommended using only "simple" method')
  return factory({ type: 'simpleObject' })(params)
}

// default public factory
export default factory()
