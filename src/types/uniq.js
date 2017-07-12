import uniq from '../middlewares/uniq'

export default {
  middlewares: [uniq],
  actions: ['set', 'reset'],
  selectors: ['getState', 'isInitialized', 'get'],
}
