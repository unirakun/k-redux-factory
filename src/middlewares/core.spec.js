/* eslint-env jest */
import { set, add, update, remove, reset } from '../actions'
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

  it('should remove element [elm1]', () => expect(
    testPrefix({
      state,
      action: remove(prefix)('elm1'),
    }),
  ).toMatchSnapshot())

  it('should reset state', () => expect(
    testPrefix({
      state,
      action: reset(prefix)(),
    }),
  ).toMatchSnapshot())

  it('should not duplicate object with same key [elm2]', () => expect(
    testPrefix({
      state,
      action: add(prefix)(Element('elm2')),
    }),
  ).toMatchSnapshot())

  it('should update an element [elm3]', () => expect(
    testPrefix({
      state,
      action: update(prefix)({ ...Element('elm3'), some: 'other UPDATE' }),
    }),
  ).toMatchSnapshot())

  it('should update an element not present [elm12]', () => expect(
    testPrefix({
      state,
      action: update(prefix)(Element('elm12')),
    }),
  ).toMatchSnapshot())
})
