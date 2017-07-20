import keyValue from '../middlewares/keyValue'

export default {
  middlewares: [keyValue],
  actions: ['set', 'add', 'reset', 'remove', 'update'],
  selectors: ['getState', 'getKeys', 'getAsArray', 'getLength', 'isInitialized', 'get', 'getBy'],
}
