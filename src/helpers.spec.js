/* eslint-env jest */
import { mapAction, mapPayload } from './helpers'

const ctx = {
  action: {
    payload: 'payload',
    type: 'TYPE',
  },
  state: {},
}

const mapperAction = () => 'ACTION MAPPED !'
const mapperPayload = () => 'PAYLOAD MAPPED !'

describe('helpers/mapPayload', () => {
  it('should map payload without matching type', () => expect(mapPayload()(mapperPayload)()()(ctx)).toMatchSnapshot())
  it('should not map payload (type matcher is KO)', () => expect(mapPayload(/NOTHING/)(mapperPayload)()()(ctx)).toMatchSnapshot())
  it('should map payload (type matcher OK)', () => expect(mapPayload(/TYPE/)(mapperPayload)()()(ctx)).toMatchSnapshot())
})

describe('helpers/mapAction', () => {
  it('should map action', () => expect(mapAction(mapperAction)()()(ctx)).toMatchSnapshot())
})
