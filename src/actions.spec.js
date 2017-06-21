/* eslint-env jest */
import { set, del, add, reset } from './actions'

const prefix = 'testPrefix'
const Element = code => ({ code, an: `element_${code}` })

describe('actions', () => {
  it('should trigger a set action', () => expect(set(prefix)([Element('set1'), Element('set2')])).toMatchSnapshot())
  it('should trigger a del action', () => expect(del(prefix)('del')).toMatchSnapshot())
  it('should trigger an add action', () => expect(add(prefix)(Element('add'))).toMatchSnapshot())
  it('should trigger a reset action', () => expect(reset(prefix)()).toMatchSnapshot())
})
