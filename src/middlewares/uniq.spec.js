/* eslint-env jest */
import { set, reset, update } from '../actions'
import uniq from './uniq'

const prefix = 'testPrefix'
const Element = code => ({ code, some: 'other', infos: code })
const state = {
  data: Element('elm'),
  initialized: true,
}

describe('middlewares/uniq', () => {
  // Use the factory to create a new reducer named 'testPrefix'
  // It uses 'code' as key in givent elements
  const testPrefix = uniq('code')(prefix)

  it('should initialize', () => expect(testPrefix()).toMatchSnapshot())

  it('should set element [elm2]', () => expect(
    testPrefix({
      state,
      action: set(prefix)(Element('elm2')),
    }),
  ).toMatchSnapshot())

  it('should reset state', () => expect(
    testPrefix({
      state,
      action: reset(prefix)(),
    }),
  ).toMatchSnapshot())

  it('should update element', () => expect(
    testPrefix({
      state,
      action: update(prefix)({ some: 'other 2', modifi: 'cation' }),
    }),
  ).toMatchSnapshot())
})
