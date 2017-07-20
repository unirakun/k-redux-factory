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

const execHelper = context => helper => helper()()()(context)

describe('helpers/mapPayload', () => {
  it('should map payload without matching type', () => expect(execHelper(ctx)(mapPayload()(mapperPayload))).toMatchSnapshot())
  it('should not map payload (type matcher is KO)', () => expect(execHelper(ctx)(mapPayload(/NOTHING/)(mapperPayload))).toMatchSnapshot())
  it('should map payload (type matcher OK)', () => expect(execHelper(ctx)(mapPayload(/TYPE/)(mapperPayload))).toMatchSnapshot())
})

describe('helpers/mapAction', () => {
  it('should map action', () => expect(execHelper(ctx)(mapAction(mapperAction))).toMatchSnapshot())
})
