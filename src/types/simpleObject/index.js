import middleware from './simpleObject.middleware'

export default {
  middlewares: [middleware],
  actions: ['set', 'reset', 'update'],
  selectors: ['getState', 'isInitialized', 'get'],
}
