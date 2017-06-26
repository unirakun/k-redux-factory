/* eslint-env jest */
import { getKeys, getLength, getState, get, getBy, getAsArray, isInitialized } from './selectors'

const Element = code => ({ code, some: 'other', infos: code })
const SubElement = code => subCode => ({ ...Element(code), sub: { subCode } })

const path = 'api.raw'
const prefix = 'testPrefix'
const subState = {
  testPrefix: {
    data: {
      elm2: Element('elm2'),
      elm1: Element('elm1'),
      elm3: Element('elm3'),
      elm4: SubElement('elm4')('subelm4'),
      elm5: SubElement('elm5')('subelm5'),
    },
    keys: ['elm2', 'elm1', 'elm3', 'elm4', 'elm5'],
    array: [Element('elm2'), Element('elm1'), Element('elm3'), SubElement('elm4')('subelm4'), SubElement('elm5')('subelm5')],
    initialized: true,
  },
}
const state = {
  api: {
    raw: {
      ...subState,
    },
  },
}

describe('selectors', () => {
  it('should retrieve state', () => expect(getState(path)(prefix)(state)).toMatchSnapshot())
  it('should retrieve state, without path set', () => expect(getState()(prefix)(subState)).toMatchSnapshot())
  it('should retrieve keys', () => expect(getKeys(path)(prefix)(state)).toMatchSnapshot())
  it('should retrieve length', () => expect(getLength(path)(prefix)(state)).toMatchSnapshot())
  it('should retrieve initialized value', () => expect(isInitialized(path)(prefix)(state)).toMatchSnapshot())
  it('should retrieve all data, without key', () => expect(get(path)(prefix)()(state)).toMatchSnapshot())
  it('should retrieve data by ids, with an array of keys', () => expect(get(path)(prefix)(['elm1', 'elm3'])(state)).toMatchSnapshot())
  it('should retrieve data by id, with a single key', () => expect(get(path)(prefix)('elm3')(state)).toMatchSnapshot())
  it('should retrieve all data, without key to array', () => expect(getAsArray(path)(prefix)(state)).toMatchSnapshot())
  it('should retrieve all data, validate (path, values), with simple path and simple value', () => expect(getBy(path)(prefix)('code', 'elm2')(state)).toMatchSnapshot())
  it('should retrieve all data, validate (path, values), with sub path and simple value', () => expect(getBy(path)(prefix)('sub.subCode', 'subelm4')(state)).toMatchSnapshot())
  it('should retrieve all data, validate (path, values), with simple path and multi value', () => expect(getBy(path)(prefix)('code', ['elm1', 'elm4', 'subelm5'])(state)).toMatchSnapshot())
  it('should retrieve all data, validate (path, values), with sub path and multi value', () => expect(getBy(path)(prefix)('sub.subCode', ['subelm4', 'subelm5', 'elm1'])(state)).toMatchSnapshot())
  it('should retrieve all data, validate (path, values), with wrong path', () => expect(getBy(path)(prefix)('sub.wrong', 'subelm4')(state)).toMatchSnapshot())
  it('should retrieve all data, validate (path, values), when not find value', () => expect(getBy(path)(prefix)('sub.wrong', 'subelm4')(state)).toMatchSnapshot())
})
