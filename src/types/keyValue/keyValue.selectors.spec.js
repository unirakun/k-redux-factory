/* eslint-env jest */
import selectorsFactory from './keyValue.selectors'

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

const {
  getState,
  getKeys,
  getLength,
  isInitialized,
  get,
  getAsArray,
  getBy,
  hasKey,
} = selectorsFactory({ name, path })

describe('selectors', () => {
  it('should retrieve state', () => expect(getState(state)).toMatchSnapshot())
  it('should retrieve state, without path set', () => expect(selectorsFactory({ name }).getState(subState)).toMatchSnapshot())
  it('should retrieve keys', () => expect(getKeys(state)).toMatchSnapshot())
  it('should retrieve length', () => expect(getLength(state)).toMatchSnapshot())
  it('should retrieve initialized value', () => expect(isInitialized(state)).toMatchSnapshot())
  it('should retrieve all data, without key', () => expect(get()(state)).toMatchSnapshot())
  it('should retrieve all data, with null parameters', () => expect(get(null)(state)).toMatchSnapshot())
  it('should retrieve data by ids, when ids is false', () => expect(get(false)(state)).toMatchSnapshot())
  it('should retrieve data by ids, when ids is 0', () => expect(get(0)(state)).toMatchSnapshot())
  it('should retrieve data by ids, with an array of keys', () => expect(get(['elm1', 'elm3'])(state)).toMatchSnapshot())
  it('should retrieve data by id, with a single key', () => expect(get('elm3')(state)).toMatchSnapshot())
  it('should retrieve all data, without key to array', () => expect(getAsArray(state)).toMatchSnapshot())
  it('should retrieve all data, validate (path, values), with simple path and simple value', () => expect(getBy('code', 'elm2')(state)).toMatchSnapshot())
  it('should retrieve all data, validate (path, values), with sub path and simple value', () => expect(getBy('sub.subCode', 'subelm4')(state)).toMatchSnapshot())
  it('should retrieve all data, validate (path, values), with simple path and multi value', () => expect(getBy('code', ['elm1', 'elm4', 'subelm5'])(state)).toMatchSnapshot())
  it('should retrieve all data, validate (path, values), with sub path and multi value', () => expect(getBy('sub.subCode', ['subelm4', 'subelm5', 'elm1'])(state)).toMatchSnapshot())
  it('should retrieve all data, validate (path, values), with wrong path', () => expect(getBy('sub.wrong', 'subelm4')(state)).toMatchSnapshot())
  it('should retrieve all data, validate (path, values), when not find value', () => expect(getBy('sub.wrong', 'subelm4')(state)).toMatchSnapshot())
  it('should find the given key', () => expect(hasKey('elm3')(state)).toBe(true))
  it('should not find the given key', () => expect(hasKey('not-found')(state)).toBe(false))

  describe('bugs', () => {
    it('should works with empty path (not undefined) for first level reducer', () => {
      const bugState = {
        firstLevel: 'firstLevel',
      }

      expect(selectorsFactory({ path: '', name: 'firstLevel' }).getState(bugState)).toMatchSnapshot()
    })
  })
})
