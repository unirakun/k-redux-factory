import map from '../middlewares/map'

export default {
  middlewares: [map],
  actions: ['set', 'add', 'reset', 'remove', 'update'],
  selectors: ['getState', 'getKeys', 'getAsArray', 'getLength', 'isInitialized', 'get', 'getBy'],
}
