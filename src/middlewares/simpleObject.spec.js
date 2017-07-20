/* eslint-env jest */
import { set, reset, update } from '../actions'
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

  it('should initialize', () => expect(testPrefix(/* defaultData */)()).toMatchSnapshot())

  it('should set element [elm2]', () => expect(
    testPrefix(/* defaultData */)({
      state,
      action: set(prefix)(Element('elm2')),
    }),
  ).toMatchSnapshot())

  it('should reset state', () => expect(
    testPrefix(/* defaultData */)({
      state,
      action: reset(prefix)(),
    }),
  ).toMatchSnapshot())

  it('should update element', () => expect(
    testPrefix(/* defaultData */)({
      state,
      action: update(prefix)({ some: 'other 2', modifi: 'cation' }),
    }),
  ).toMatchSnapshot())

  it('should take defaultData param to populate data field', () => {
    const defaultData = { im: 'default' }
    // init
    expect(testPrefix(defaultData)()).toMatchSnapshot()

    // reset
    expect(testPrefix(defaultData)({ state, action: reset(prefix)() })).toMatchSnapshot()
  })
})
