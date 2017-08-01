import keyValue from '../middlewares/keyValue'

export default {
  middlewares: [keyValue],
  actions: ['set', 'add', 'reset', 'remove', 'update', 'addOrUpdate'],
  selectors: ['getState', 'getKeys', 'getAsArray', 'getLength', 'isInitialized', 'get', 'getBy'],
}
