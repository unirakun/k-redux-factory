import map from '../middlewares/map'

export default {
  middlewares: [map],
  actions: ['set', 'reset'],
  selectors: ['getState', 'isInitialized', 'get'],
}
