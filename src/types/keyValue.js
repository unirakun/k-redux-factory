import keyValue from '../middlewares/keyValue'

export default {
  middlewares: [keyValue],
  actions: ['set', 'add', 'reset', 'remove'],
  selectors: ['getState', 'getKeys', 'getAsArray', 'getLength', 'isInitialized', 'get', 'getBy'],
}
