import middleware from './keyValue.middleware'
import * as actions from './keyValue.actions'
import * as selectors from './keyValue.selectors'

export default {
  middlewares: [middleware],
  actions,
  selectors,
}
