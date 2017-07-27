/* eslint-env jest */
import { isInitialized, get } from './simpleObject.selectors'
import { initState } from './simpleObject.middleware'

describe('selectors/simpleObject => ', () => {
  describe('isInitialized() :', () => {
    describe('without defaultData', () => {
      const withoutDefault = { name: 'o' }
      it('not initialized', () => {
        expect(isInitialized(withoutDefault)({ o: initState })).toMatchSnapshot()
      })
      it('initialized with object value', () => {
        expect(isInitialized(withoutDefault)({ o: { i: 'initialized' } })).toMatchSnapshot()
      })
      it('initialized with string value', () => {
        expect(isInitialized(withoutDefault)({ o: 'initialized' })).toMatchSnapshot()
      })
    })

    describe('defaultData should be a string', () => {
      const string = { name: 'o', defaultData: 'defaultData' }
      it('not initialized', () => {
        expect(isInitialized(string)({ o: string.defaultData })).toMatchSnapshot()
      })
      it('initialized', () => {
        expect(isInitialized(string)({ o: 'initialized' })).toMatchSnapshot()
      })
    })

    describe('defaultData should be an object', () => {
      const object = { name: 'o', defaultData: {} }
      it('not initialized', () => {
        expect(isInitialized(object)({ o: object.defaultData })).toMatchSnapshot()
      })
      it('initialized', () => {
        expect(isInitialized(object)({ o: { i: 'initialized' } })).toMatchSnapshot()
      })
    })
  })

  describe('get(): ', () => {
    describe('without defaultData', () => {
      const withoutDefault = { name: 'o' }
      it('and get the initState', () => {
        expect(get(withoutDefault)()({ o: initState })).toMatchSnapshot()
      })
    })

    describe('defaultData should be a string', () => {
      const string = { name: 'o', defaultData: '' }
      it('and get the default data', () => {
        expect(get(string)()({ o: string.defaultData })).toMatchSnapshot()
      })
      it('and get the data', () => {
        expect(get(string)()({ o: 'DATA' })).toMatchSnapshot()
      })
    })

    describe('defaultData should be an object', () => {
      const object = { name: 'o', defaultData: {} }
      it('and get the default data', () => {
        expect(get({ name: 'o' })()({ o: object.defaultData })).toMatchSnapshot()
      })
      it('and get the data', () => {
        expect(get(object)()({ o: { i: 'DATA' } })).toMatchSnapshot()
      })
    })
  })
})
