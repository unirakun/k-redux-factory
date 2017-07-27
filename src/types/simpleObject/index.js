import middleware from './simpleObject.middleware'
import * as selectors from './simpleObject.selectors'

export default {
  middlewares: [middleware],
  actions: ['set', 'reset', 'update'],
  selectorsEnabled: ['getState', 'isInitialized', 'get'],
  selectors,
}
