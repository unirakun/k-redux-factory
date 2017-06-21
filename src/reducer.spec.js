/* eslint-env jest */
import { set, add, del, reset } from './actions'
import reducer from './reducer'

const prefix = 'testPrefix'
const Element = code => ({ code, some: 'other', infos: code })
const state = {
  datas: {
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

  it('should initialize', () => expect(testPrefix()).toMatchSnapshot())
  it('should add element [elm4]', () => expect(testPrefix(state, add(prefix)(Element('elm4')))).toMatchSnapshot())
  it('should set elements [elm1,elm2]', () => expect(testPrefix(state, set(prefix)([Element('elm1'), Element('elm2')]))).toMatchSnapshot())
  it('should delete element [elm1]', () => expect(testPrefix(state, del(prefix)('elm1'))).toMatchSnapshot())
  it('should reset state', () => expect(testPrefix(state, reset(prefix)())).toMatchSnapshot())
})
