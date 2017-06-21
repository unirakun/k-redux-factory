/* eslint-env jest */
import { getKeys, getNb, getState, get, getAsArray, isInitialized } from './selectors'

const Element = code => ({ code, some: 'other', infos: code })

const path = 'api.raw'
const prefix = 'testPrefix'
const subState = {
  testPrefix: {
    datas: {
      elm2: Element('elm2'),
      elm1: Element('elm1'),
      elm3: Element('elm3'),
    },
    keys: ['elm2', 'elm1', 'elm3'],
    array: [Element('elm2'), Element('elm1'), Element('elm3')],
    nb: 3,
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
  it('should retrieve nb', () => expect(getNb(path)(prefix)(state)).toMatchSnapshot())
  it('should retrieve initialized value', () => expect(isInitialized(path)(prefix)(state)).toMatchSnapshot())
  it('should retrieve all datas, without key', () => expect(get(path)(prefix)()(state)).toMatchSnapshot())
  it('should retrieve data by ids, with an array of keys', () => expect(get(path)(prefix)(['elm1', 'elm3'])(state)).toMatchSnapshot())
  it('should retrieve data by id, with a single key', () => expect(get(path)(prefix)('elm3')(state)).toMatchSnapshot())
  it('should retrieve all datas, without key to array', () => expect(getAsArray(path)(prefix)(state)).toMatchSnapshot())
})
