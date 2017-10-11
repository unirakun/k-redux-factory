/* eslint-env jest */
import { set, add, update, remove, reset, addOrUpdate, orderBy } from '../../actions'
import { initState } from '../../reducer'
import keyValue from './keyValue.middleware'

const prefix = 'testPrefix'
const Element = code => ({ code, some: 'other', infos: code, subinfos: { info: code } })
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
  const testPrefix = keyValue('code')(prefix)(/* defaultData */)

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

  it('should remove many element [elm1, elm2]', () => expect(
    testPrefix({
      state,
      action: remove(prefix)(['elm1', 'elm2']),
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

  it('should not update element if not found [elm12]', () => expect(
    testPrefix({
      state,
      action: update(prefix)(Element('elm12')),
    }),
  ).toMatchSnapshot())

  it('should update element [elm3]', () => expect(
    testPrefix({
      state,
      action: addOrUpdate(prefix)({ ...Element('elm3'), some: 'other ADD OR UPDATE' }),
    }),
  ).toMatchSnapshot())

  it('should add element if not found [elm12]', () => expect(
    testPrefix({
      state,
      action: addOrUpdate(prefix)(Element('elm12')),
    }),
  ).toMatchSnapshot())

  it('should order elements by identity -code asc-', () => expect(
    testPrefix({
      state,
      action: orderBy(prefix)('code'),
    }),
  ).toMatchSnapshot())

  it('should order elements by identity -sub info asc-', () => expect(
    testPrefix({
      state,
      action: orderBy(prefix)('subinfos.info'),
    }),
  ).toMatchSnapshot())

  it('should order elements by identity -code desc-', () => expect(
    testPrefix({
      state,
      action: orderBy(prefix)({ by: 'code', desc: true }),
    }),
  ).toMatchSnapshot())

  it('should order elements by identity -sub info desc-', () => expect(
    testPrefix({
      state,
      action: orderBy(prefix)({ by: 'subinfos.info', desc: true }),
    }),
  ).toMatchSnapshot())

  it('should order elements with function -code desc-', () => expect(
    testPrefix({
      state,
      action: orderBy(prefix)({ by: e => e.code, desc: true }),
    }),
  ).toMatchSnapshot())

  it('should order elements with function -code asc (objec mode)-', () => expect(
    testPrefix({
      state,
      action: orderBy(prefix)({ by: e => e.code, desc: false }),
    }),
  ).toMatchSnapshot())

  it('should order elements with function -code asc-', () => expect(
    testPrefix({
      state,
      action: orderBy(prefix)(e => e.code),
    }),
  ).toMatchSnapshot())
})
