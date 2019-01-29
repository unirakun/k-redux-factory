/* eslint-env jest */
import { simple, keyValue } from './factories'

describe('factories', () => {
  it('should use options of object type', () => expect(simple.object('object').options).toMatchSnapshot())
  it('should use options of specific string type', () => expect(simple.string('string').options).toMatchSnapshot())
  it('should use options of specific array type', () => expect(simple.array('array').options).toMatchSnapshot())
  it('should use options of specific boolean type', () => expect(simple.bool('boolean').options).toMatchSnapshot())
  it('should use options of specific keyValue type', () => expect(keyValue('keyValue').options).toMatchSnapshot())

  it('should use overwrited options of object type', () => expect(simple.object({ name: 'object', defaultData: { o: 'test' } }).options).toMatchSnapshot())
  it('should use overwrited options of specific string type', () => expect(simple.string({ name: 'string', defaultData: 'test' }).options).toMatchSnapshot())
  it('should use overwrited options of specific array type', () => expect(simple.array({ name: 'array', defaultData: ['test', 1, 2] }).options).toMatchSnapshot())
  it('should use overwrited options of specific boolean type', () => expect(simple.bool({ name: 'boolean', defaultData: true }).options).toMatchSnapshot())
  it('should use overwrited options of specific keyValue type', () => expect(keyValue({
    name: 'string',
    defaultData: [
      { id: 1, value: 'test1' },
      { id: 2, value: 'test2' },
    ],
  }).options).toMatchSnapshot())
})
