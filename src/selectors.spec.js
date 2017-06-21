/* eslint-env jest */
import { getKeys, getNb, getState, getDatas, isInitialized, getByIds } from './selectors'

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
  it('should retrieve datas', () => expect(getDatas(path)(prefix)(state)).toMatchSnapshot())
  it('should retrieve initialized value', () => expect(isInitialized(path)(prefix)(state)).toMatchSnapshot())
  it('should retrieve data by ids, with an array', () => expect(getByIds(path)(prefix)(state)(['elm1', 'elm3'])).toMatchSnapshot())
  it('should retrieve data by id, with a single key', () => expect(getByIds(path)(prefix)(state)('elm3')).toMatchSnapshot())
})
