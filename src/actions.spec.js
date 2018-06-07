/* eslint-env jest */
import { set, remove, add, reset, addOrUpdate } from './actions'

const prefix = 'testPrefix'
const name = 'testName'
const Element = code => ({ code, an: `element_${code}` })

describe('actions', () => {
  it('should trigger a set action', () => expect(set(prefix)(name)([Element('set1'), Element('set2')])).toMatchSnapshot())
  it('should trigger a remove action', () => expect(remove(prefix)(name)('remove')).toMatchSnapshot())
  it('should trigger an add action', () => expect(add(prefix)(name)(Element('add'))).toMatchSnapshot())
  it('should trigger a reset action', () => expect(reset(prefix)(name)()).toMatchSnapshot())
  it('should trigger an addOrUpdate action', () => expect(addOrUpdate(prefix)(name)(Element('add'))).toMatchSnapshot())
})
