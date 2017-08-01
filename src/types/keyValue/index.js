import middleware from './keyValue.middleware'

export default {
  middlewares: [middleware],
  actions: ['set', 'add', 'reset', 'remove', 'update', 'addorupdate'],
  selectors: ['getState', 'getKeys', 'getAsArray', 'getLength', 'isInitialized', 'get', 'getBy'],
}
