/* eslint-env jest */
import { set, reset, update } from '../../actions'
import simpleObject from './simpleObject.middleware'

const prefix = 'testPrefix'
const name = 'testName'
const Element = code => ({ code, some: 'other', infos: code })
const state = Element('elm')

describe('middlewares/simpleObject', () => {
  // Use the factory to create a new reducer named 'testPrefix'
  // It uses 'code' as key in givent elements
  const testPrefix = simpleObject('code')(prefix)(name)

  it('should initialize', () => expect(testPrefix(/* defaultData */)()).toMatchSnapshot())

  it('should initialize with defaultData', () => expect(testPrefix('default')()).toMatchSnapshot())

  it('should set element [elm2]', () => expect(
    testPrefix(/* defaultData */)({
      state,
      action: set(prefix)(name)(Element('elm2')),
    }),
  ).toMatchSnapshot())

  it('should reset state', () => expect(
    testPrefix(/* defaultData */)({
      state,
      action: reset(prefix)(name)(),
    }),
  ).toMatchSnapshot())

  it('should update element', () => expect(
    testPrefix(/* defaultData */)({
      state,
      action: update(prefix)(name)({ some: 'other 2', modifi: 'cation' }),
    }),
  ).toMatchSnapshot())

  it('should take defaultData param to populate data field -init-', () => {
    // init - with empty object
    expect(testPrefix({})()).toMatchSnapshot()
    // init - with object
    expect(testPrefix({ im: 'default' })()).toMatchSnapshot()
    // init - with empty string
    expect(testPrefix('')()).toMatchSnapshot()
  })
  it('should take defaultData param to populate data field -reset-', () => {
    // reset
    expect(testPrefix({ im: 'default' })({ state, action: reset(prefix)(name)() })).toMatchSnapshot()
  })
})
