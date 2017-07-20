/* eslint-env jest */
import { set, reset } from '../actions'
import simpleObject from './simpleObject'

const prefix = 'testPrefix'
const Element = code => ({ code, some: 'other', infos: code })
const state = {
  data: Element('elm'),
  initialized: true,
}

describe('middlewares/simpleObject', () => {
  // Use the factory to create a new reducer named 'testPrefix'
  // It uses 'code' as key in givent elements
  const testPrefix = simpleObject('code')(prefix)

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
})
