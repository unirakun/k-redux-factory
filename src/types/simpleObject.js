import simpleObject from '../middlewares/simpleObject'

export default {
  middlewares: [simpleObject],
  actions: ['set', 'reset'],
  selectors: ['getState', 'isInitialized', 'get'],
}
