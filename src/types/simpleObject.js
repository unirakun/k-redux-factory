import simpleObject from '../middlewares/simpleObject'

export default {
  middlewares: [simpleObject],
  actions: ['set', 'reset', 'update'],
  selectors: ['getState', 'isInitialized', 'get'],
}
