/* eslint-env jest */
import * as selectors from './simple.selectors'
import { initState } from './simple.middleware'

describe('selectors/simple => ', () => {
  describe('isInitialized', () => {
    describe('without defaultData', () => {
      const options = { name: 'o' }
      it('should not be initialized', () => {
        expect(selectors.isInitialized(options)({ o: initState })).toMatchSnapshot()
      })
      it('should be initialized -object-', () => {
        expect(selectors.isInitialized(options)({ o: { i: 'initialized' } })).toMatchSnapshot()
      })
      it('should be initialized -string-', () => {
        expect(selectors.isInitialized(options)({ o: 'initialized' })).toMatchSnapshot()
      })
    })

    describe('defaultData as a string', () => {
      const options = { name: 'o', defaultData: 'defaultData' }
      it('should not be initialized', () => {
        expect(selectors.isInitialized(options)({ o: options.defaultData })).toMatchSnapshot()
      })
      it('should be initialized', () => {
        expect(selectors.isInitialized(options)({ o: 'initialized' })).toMatchSnapshot()
      })
    })

    describe('defaultData as an object', () => {
      const options = { name: 'o', defaultData: {} }
      it('should not be initialized', () => {
        expect(selectors.isInitialized(options)({ o: options.defaultData })).toMatchSnapshot()
      })
      it('should be initialized', () => {
        expect(selectors.isInitialized(options)({ o: { i: 'initialized' } })).toMatchSnapshot()
      })
    })
  })

  describe('get', () => {
    describe('without defaultData', () => {
      const options = { name: 'o' }
      it('should return the initState', () => {
        expect(selectors.get(options)()({ o: initState })).toMatchSnapshot()
      })
    })

    describe('defaultData as a string', () => {
      const options = { name: 'o', defaultData: '' }
      it('should return the default data', () => {
        expect(selectors.get(options)()({ o: options.defaultData })).toMatchSnapshot()
      })
      it('should return the current data', () => {
        expect(selectors.get(options)()({ o: 'DATA' })).toMatchSnapshot()
      })
    })

    describe('defaultData as an object', () => {
      const options = { name: 'o', defaultData: {} }
      it('should return the default data', () => {
        expect(selectors.get({ name: 'o' })()({ o: options.defaultData })).toMatchSnapshot()
      })
      it('should return the current data', () => {
        expect(selectors.get(options)()({ o: { i: 'DATA' } })).toMatchSnapshot()
      })
    })
  })
})
