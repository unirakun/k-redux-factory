/* eslint-env jest */
import { set, add, update, remove, reset, addOrUpdate, replace, orderBy } from '../../actions'
import { initState } from '../../reducer'
import keyValue from './keyValue.middleware'

const prefix = 'testPrefix'
const name = 'testName'
const Element = code => ({ code, some: 'other', infos: code, subinfos: { info: code } })
const ElementWithoutSubInfo = code => ({ code, some: 'other', infos: code })
const Elements = [
  Element('elm1'),
  Element('elm2'),
  ElementWithoutSubInfo('elmSub'),
]
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

describe('middlewares/keyValue', () => {
  // Use the factory to create a new reducer named 'testPrefix'
  // It uses 'code' as key in givent elements
  const testPrefix = keyValue('code')(prefix)(name)(/* defaultData */)
  const testPrefixWithDefaultData = keyValue('code')(prefix)(name)(Elements)

  it('should initialize', () => expect(testPrefix()).toMatchSnapshot())

  it('should initialize with defaultData', () => expect(testPrefixWithDefaultData()).toMatchSnapshot())

  it('should add element [elm4] on initial store', () => expect(
    testPrefix({
      state: initState,
      action: add(prefix)(name)(Element('elm4')),
    }),
  ).toMatchSnapshot())

  it('should add element [elm4]', () => expect(
    testPrefix({
      state,
      action: add(prefix)(name)(Element('elm4')),
    }),
  ).toMatchSnapshot())

  it('should set elements [elm1,elm2]', () => expect(
    testPrefix({
      state,
      action: set(prefix)(name)([Element('elm1'), Element('elm2')]),
    }),
  ).toMatchSnapshot())

  it('should remove element [elm1]', () => expect(
    testPrefix({
      state,
      action: remove(prefix)(name)('elm1'),
    }),
  ).toMatchSnapshot())

  it('should remove many element [elm1, elm2]', () => expect(
    testPrefix({
      state,
      action: remove(prefix)(name)(['elm1', 'elm2']),
    }),
  ).toMatchSnapshot())

  it('should reset state', () => expect(
    testPrefix({
      state,
      action: reset(prefix)(name)(),
    }),
  ).toMatchSnapshot())

  it('should not duplicate object with same key [elm2]', () => expect(
    testPrefix({
      state,
      action: add(prefix)(name)(Element('elm2')),
    }),
  ).toMatchSnapshot())

  it('should update an element [elm3]', () => expect(
    testPrefix({
      state,
      action: update(prefix)(name)({ ...Element('elm3'), some: 'other UPDATE' }),
    }),
  ).toMatchSnapshot())

  it('should not update element if not found [elm12]', () => expect(
    testPrefix({
      state,
      action: update(prefix)(name)(Element('elm12')),
    }),
  ).toMatchSnapshot())

  it('should update element [elm3]', () => expect(
    testPrefix({
      state,
      action: addOrUpdate(prefix)(name)({ ...Element('elm3'), some: 'other ADD OR UPDATE' }),
    }),
  ).toMatchSnapshot())

  it('should add element if not found [elm12]', () => expect(
    testPrefix({
      state,
      action: addOrUpdate(prefix)(name)(Element('elm12')),
    }),
  ).toMatchSnapshot())

  it('should replace element [elm1]', () => expect(
    testPrefix({
      state,
      action: replace(prefix)(name)(ElementWithoutSubInfo('elm1')),
    }),
  ).toMatchSnapshot())

  it('should not replace element doesn\'t exist [elm12]', () => expect(
    testPrefix({
      state,
      action: replace(prefix)(name)(Element('elm12')),
    }),
  ).toMatchSnapshot())

  it('should order elements by identity -code asc-', () => expect(
    testPrefix({
      state,
      action: orderBy(prefix)(name)('code'),
    }),
  ).toMatchSnapshot())

  it('should order elements by identity -sub info asc-', () => expect(
    testPrefix({
      state,
      action: orderBy(prefix)(name)('subinfos.info'),
    }),
  ).toMatchSnapshot())

  it('should order elements by identity -code desc-', () => expect(
    testPrefix({
      state,
      action: orderBy(prefix)(name)({ by: 'code', desc: true }),
    }),
  ).toMatchSnapshot())

  it('should order elements by identity -sub info desc-', () => expect(
    testPrefix({
      state,
      action: orderBy(prefix)(name)({ by: 'subinfos.info', desc: true }),
    }),
  ).toMatchSnapshot())

  it('should order elements with function -code desc-', () => expect(
    testPrefix({
      state,
      action: orderBy(prefix)(name)({ by: e => e.code, desc: true }),
    }),
  ).toMatchSnapshot())

  it('should order elements with function -code asc (objec mode)-', () => expect(
    testPrefix({
      state,
      action: orderBy(prefix)(name)({ by: e => e.code, desc: false }),
    }),
  ).toMatchSnapshot())

  it('should order elements with function -code asc-', () => expect(
    testPrefix({
      state,
      action: orderBy(prefix)(name)(e => e.code),
    }),
  ).toMatchSnapshot())
})
