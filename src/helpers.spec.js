/* eslint-env jest */
import { payloadWrapper } from './helpers'

const ctx = {
  action: {
    payload: 'payload',
    type: 'TYPE',
  },
  state: {},
}

const actionMatches = /TYPE/
const wrapper = () => 'PAYLOAD WRAPPED !'

describe('helpers/payloadWrapper', () => {
  it('should wrappe without type and wrapper function', () => expect(payloadWrapper()()()()(ctx)).toMatchSnapshot())
  it('should not wrappe without wrapper function', () => expect(payloadWrapper(actionMatches)()()()(ctx)).toMatchSnapshot())
  it('should wrappe without type', () => expect(payloadWrapper()(wrapper)()()(ctx)).toMatchSnapshot())
  it('should wrappe payload', () => expect(payloadWrapper(actionMatches)(wrapper)()()(ctx)).toMatchSnapshot())
})
