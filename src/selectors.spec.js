/* eslint-env jest */
import {
  getKeys,
  getLength,
  getState,
  get,
  getBy,
  getAsArray,
  isInitialized,
  hasKey,
} from './selectors'

const Element = code => ({ code, some: 'other', infos: code })
const SubElement = code => subCode => ({ ...Element(code), sub: { subCode } })

const path = 'api.raw'
const name = 'testName'
const subState = {
  testName: {
    data: [
      ['elm2', Element('elm2')],
      ['elm1', Element('elm1')],
      ['elm3', Element('elm3')],
      ['elm4', SubElement('elm4')('subelm4')],
      ['elm5', SubElement('elm5')('subelm5')],
      [false, Element(false)],
      [0, Element(0)],
    ],
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
  it('should retrieve state', () => expect(getState({ path, name })(state)).toMatchSnapshot())
  it('should retrieve state, without path set', () => expect(getState({ name })(subState)).toMatchSnapshot())
  it('should retrieve keys', () => expect(getKeys({ path, name })(state)).toMatchSnapshot())
  it('should retrieve length', () => expect(getLength({ path, name })(state)).toMatchSnapshot())
  it('should retrieve initialized value', () => expect(isInitialized({ path, name })(state)).toMatchSnapshot())
  it('should retrieve all data, without key', () => expect(get({ path, name })()(state)).toMatchSnapshot())
  it('should retrieve all data, with null parameters', () => expect(get({ path, name })(null)(state)).toMatchSnapshot())
  it('should retrieve data by ids, when ids is false', () => expect(get({ path, name })(false)(state)).toMatchSnapshot())
  it('should retrieve data by ids, when ids is 0', () => expect(get({ path, name })(0)(state)).toMatchSnapshot())
  it('should retrieve data by ids, with an array of keys', () => expect(get({ path, name })(['elm1', 'elm3'])(state)).toMatchSnapshot())
  it('should retrieve data by id, with a single key', () => expect(get({ path, name })('elm3')(state)).toMatchSnapshot())
  it('should retrieve all data, without key to array', () => expect(getAsArray({ path, name })(state)).toMatchSnapshot())
  it('should retrieve all data, validate (path, values), with simple path and simple value', () => expect(getBy({ path, name })('code', 'elm2')(state)).toMatchSnapshot())
  it('should retrieve all data, validate (path, values), with sub path and simple value', () => expect(getBy({ path, name })('sub.subCode', 'subelm4')(state)).toMatchSnapshot())
  it('should retrieve all data, validate (path, values), with simple path and multi value', () => expect(getBy({ path, name })('code', ['elm1', 'elm4', 'subelm5'])(state)).toMatchSnapshot())
  it('should retrieve all data, validate (path, values), with sub path and multi value', () => expect(getBy({ path, name })('sub.subCode', ['subelm4', 'subelm5', 'elm1'])(state)).toMatchSnapshot())
  it('should retrieve all data, validate (path, values), with wrong path', () => expect(getBy({ path, name })('sub.wrong', 'subelm4')(state)).toMatchSnapshot())
  it('should retrieve all data, validate (path, values), when not find value', () => expect(getBy({ path, name })('sub.wrong', 'subelm4')(state)).toMatchSnapshot())
  it('should find the given key', () => expect(hasKey({ path, name })('elm3')(state)).toBe(true))
  it('should not find the given key', () => expect(hasKey({ path, name })('not-found')(state)).toBe(false))

  describe('bugs', () => {
    it('should works with empty path (not undefined) for first level reducer', () => {
      const bugState = {
        firstLevel: 'firstLevel',
      }

      expect(getState({ path: '', name: 'firstLevel' })(bugState)).toMatchSnapshot()
    })
  })
})
