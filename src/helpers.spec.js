/* eslint-env jest */
import { mapAction, mapPayload, mapState } from './helpers'

const ctx = {
  action: {
    payload: 'payload',
    type: 'TYPE',
  },
  state: 1,
}

const mapperAction = () => 'ACTION MAPPED !'
const mapperPayload = () => 'PAYLOAD MAPPED !'
const mapperPayloadParam = (p, state) => state + 1
const mapperState = state => `${state} MAPPED !`

const execHelper = context => helper => helper()()()(context)

describe('helpers/mapPayload', () => {
  it('should map payload without matching type', () => expect(execHelper(ctx)(mapPayload()(mapperPayload))).toMatchSnapshot())
  it('should not map payload (type matcher is KO)', () => expect(execHelper(ctx)(mapPayload(/NOTHING/)(mapperPayload))).toMatchSnapshot())
  it('should map payload (type matcher OK)', () => expect(execHelper(ctx)(mapPayload(/TYPE/)(mapperPayload))).toMatchSnapshot())
  it('should map payload retrieve current state', () => expect(execHelper(ctx)(mapPayload(/TYPE/)(mapperPayloadParam))).toMatchSnapshot())
})

describe('helpers/mapAction', () => {
  it('should map action', () => expect(execHelper(ctx)(mapAction(mapperAction))).toMatchSnapshot())
})

describe('helpers/mapState', () => {
  it('should map state without matching type', () => expect(execHelper(ctx)(mapState()(mapperState))).toMatchSnapshot())
  it('should map state (type matcher is KO)', () => expect(execHelper(ctx)(mapState(/NOTHING/)(mapperState))).toMatchSnapshot())
  it('should map state (type matcher OK)', () => expect(execHelper(ctx)(mapState(/TYPE/)(mapperState))).toMatchSnapshot())
})
