/* eslint-env jest */
import { set, add, del, reset } from './actions'
import reducer, { initState } from './reducer'

const prefix = 'testPrefix'
const ElementWithoutCode = code => ({ some: 'other', infos: code })
const Element = code => ({ ...ElementWithoutCode(code), code })
const state = {
  data: {
    elm2: Element('elm2'),
    elm1: Element('elm1'),
    elm3: Element('elm3'),
  },
  keys: ['elm2', 'elm1', 'elm3'],
  array: [Element('elm2'), Element('elm1'), Element('elm3')],
  nb: 3,
  initialized: false,
}

describe('reducer', () => {
  // Use the factory to create a new reducer named 'testPrefix'
  // It uses 'code' as key in givent elements
  const testPrefix = reducer('code')(prefix)
  const testGetNextId = reducer('code', keys => keys[keys.length - 1] + 1, 'elm')(prefix)

  it('should initialize', () => expect(testPrefix()).toMatchSnapshot())
  // ADD
  it('should add element [elm4] on initial store', () => expect(testPrefix(initState, add(prefix)(Element('elm4')))).toMatchSnapshot())
  it('should add element [elm4]', () => expect(testPrefix(state, add(prefix)(Element('elm4')))).toMatchSnapshot())
  it('should add element [elm4] with getNextId', () => expect(testGetNextId(state, add(prefix)(Element('elm4')))).toMatchSnapshot())
  it('should add element [elm] with getNextId', () => expect(testGetNextId(state, add(prefix)(ElementWithoutCode('elmWithoutCode')))).toMatchSnapshot())
  // SET
  it('should set elements [elm1,elm2] with initState', () => expect(testPrefix(initState, set(prefix)([Element('elm1'), Element('elm2')]))).toMatchSnapshot())
  it('should set elements [elm1,elm2]', () => expect(testPrefix(state, set(prefix)([Element('elm1'), Element('elm2')]))).toMatchSnapshot())
  it('should set elements [elm1,elm2] without code and initState', () => expect(testGetNextId(initState, set(prefix)([ElementWithoutCode('elm1'), ElementWithoutCode('elm2')]))).toMatchSnapshot())
  it('should set elements [elm12,elm13] without code', () => expect(testGetNextId(state, set(prefix)([ElementWithoutCode('elm12'), ElementWithoutCode('elm13')]))).toMatchSnapshot())
  it('should set elements [elm12,elm13] without nextId and code', () => expect(testPrefix(state, set(prefix)([ElementWithoutCode('elm12'), ElementWithoutCode('elm13')]))).toMatchSnapshot())
  // DELETE
  it('should delete element [elm1]', () => expect(testPrefix(state, del(prefix)('elm1'))).toMatchSnapshot())
  // RESET
  it('should reset state', () => expect(testPrefix(state, reset(prefix)())).toMatchSnapshot())
})
