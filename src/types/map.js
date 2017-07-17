import map from '../middlewares/map'

export default {
  middlewares: [map],
  actions: ['set', 'add', 'reset', 'remove'],
  selectors: ['getState', 'getKeys', 'getAsArray', 'getLength', 'isInitialized', 'get', 'getBy'],
}
