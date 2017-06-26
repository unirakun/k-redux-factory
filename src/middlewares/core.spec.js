/* eslint-env jest */
import { set, add, del, reset } from '../actions'
import { initState } from '../reducer'
import core from './core'

const prefix = 'testPrefix'
const Element = code => ({ code, some: 'other', infos: code })
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

describe('middlewares/core', () => {
  // Use the factory to create a new reducer named 'testPrefix'
  // It uses 'code' as key in givent elements
  const testPrefix = core('code')(prefix)

  it('should initialize', () => expect(testPrefix()).toMatchSnapshot())

  it('should add element [elm4] on initial store', () => expect(
    testPrefix({
      state: initState,
      action: add(prefix)(Element('elm4')),
    }),
  ).toMatchSnapshot())

  it('should add element [elm4]', () => expect(
    testPrefix({
      state,
      action: add(prefix)(Element('elm4')),
    }),
  ).toMatchSnapshot())

  it('should set elements [elm1,elm2]', () => expect(
    testPrefix({
      state,
      action: set(prefix)([Element('elm1'), Element('elm2')]),
    }),
  ).toMatchSnapshot())

  it('should delete element [elm1]', () => expect(
    testPrefix({
      state,
      action: del(prefix)('elm1'),
    }),
  ).toMatchSnapshot())

  it('should reset state', () => expect(
    testPrefix({
      state,
      action: reset(prefix)(),
    }),
  ).toMatchSnapshot())
})
