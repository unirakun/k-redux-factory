import middleware from './simpleObject.middleware'
import * as actions from './simpleObject.actions'
import * as selectors from './simpleObject.selectors'

export default {
  middlewares: [middleware],
  actions,
  selectors,
}
