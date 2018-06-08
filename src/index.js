import * as types from './types/index'
import reducer from './reducer'

const defaultOptions = {
  key: 'id',
  type: 'keyValue',
  prefix: '',
}

const simpleDefaultData = {
  bool: false,
  string: '',
  array: [],
  object: {},
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

  const [innerType, subType] = type.split('.')
  const typeConfig = types[innerType]
  const innerDefaultData = (innerType === 'simple' && subType) ? simpleDefaultData[subType] : defaultData

  return Object.assign(
    reducer({ ...middlewares, engine: typeConfig.middlewares })(key)(prefix)(name)(innerDefaultData),

    // type (debug purpose)
    { krfType: type },

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

export const simple = factory({ type: 'simple' })
Object.assign(
  simple,
  {
    object: factory({ type: 'simple.object' }),
    bool: factory({ type: 'simple.bool' }),
    string: factory({ type: 'simple.string' }),
    array: factory({ type: 'simple.array' }),
  },
)

// older method deprecated
export const simpleObject = (params) => {
  console.warn('/KRF/ You use a deprecated "simpleObject" method. We recommended using only "simple" method')
  return simple(params)
}

// default public factory
export default factory()
