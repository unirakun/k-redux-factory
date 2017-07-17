/* eslint-env jest */
import { mapAction, mapPayload } from './helpers'

const ctx = {
  action: {
    payload: 'payload',
    type: 'TYPE',
  },
  state: {},
}

const actionMatches = /TYPE/
const mapperAction = () => 'ACTION MAPPED !'
const mapperPayload = () => 'PAYLOAD MAPPED !'

describe('helpers/mapPayload', () => {
  it('should map payload without type', () => expect(mapPayload()(mapperPayload)()()(ctx)).toMatchSnapshot())
  it('should map payload', () => expect(mapPayload(actionMatches)(mapperPayload)()()(ctx)).toMatchSnapshot())
})

describe('helpers/mapAction', () => {
  it('should map action', () => expect(mapAction(mapperAction)()()(ctx)).toMatchSnapshot())
})
