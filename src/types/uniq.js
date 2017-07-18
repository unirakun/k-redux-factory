import uniq from '../middlewares/uniq'

export default {
  middlewares: [uniq],
  actions: ['set', 'reset', 'update'],
  selectors: ['getState', 'isInitialized', 'get'],
}
