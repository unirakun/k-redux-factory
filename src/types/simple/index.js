import middleware from './simple.middleware'
import * as actions from './simple.actions'
import * as selectors from './simple.selectors'

export default {
  middlewares: [middleware],
  actions,
  selectors,
}
