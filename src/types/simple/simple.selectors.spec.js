/* eslint-env jest */
import selectorsFactory from './simple.selectors'
import { initState } from './simple.middleware'

describe('selectors/simple => ', () => {
  describe('isInitialized', () => {
    describe('without defaultData', () => {
      const options = { name: 'o' }
      it('should not be initialized', () => {
        expect(selectorsFactory(options).isInitialized({ o: initState })).toMatchSnapshot()
      })
      it('should be initialized -object-', () => {
        expect(selectorsFactory(options).isInitialized({ o: { i: 'initialized' } })).toMatchSnapshot()
      })
      it('should be initialized -string-', () => {
        expect(selectorsFactory(options).isInitialized({ o: 'initialized' })).toMatchSnapshot()
      })
    })

    describe('defaultData as a string', () => {
      const options = { name: 'o', defaultData: 'defaultData' }
      it('should not be initialized', () => {
        expect(selectorsFactory(options).isInitialized({ o: options.defaultData })).toMatchSnapshot()
      })
      it('should be initialized', () => {
        expect(selectorsFactory(options).isInitialized({ o: 'initialized' })).toMatchSnapshot()
      })
    })

    describe('defaultData as an object', () => {
      const options = { name: 'o', defaultData: {} }
      it('should not be initialized', () => {
        expect(selectorsFactory(options).isInitialized({ o: options.defaultData })).toMatchSnapshot()
      })
      it('should be initialized', () => {
        expect(selectorsFactory(options).isInitialized({ o: { i: 'initialized' } })).toMatchSnapshot()
      })
    })
  })

  describe('get', () => {
    describe('without defaultData', () => {
      const options = { name: 'o' }
      it('should return the initState', () => {
        expect(selectorsFactory(options).get()({ o: initState })).toMatchSnapshot()
      })
    })

    describe('defaultData as a string', () => {
      const options = { name: 'o', defaultData: '' }
      it('should return the default data', () => {
        expect(selectorsFactory(options).get()({ o: options.defaultData })).toMatchSnapshot()
      })
      it('should return the current data', () => {
        expect(selectorsFactory(options).get()({ o: 'DATA' })).toMatchSnapshot()
      })
    })

    describe('defaultData as an object', () => {
      const options = { name: 'o', defaultData: {} }
      it('should return the default data', () => {
        expect(selectorsFactory({ name: 'o' }).get()({ o: options.defaultData })).toMatchSnapshot()
      })
      it('should return the current data', () => {
        expect(selectorsFactory(options).get()({ o: { i: 'DATA' } })).toMatchSnapshot()
      })
    })
  })
})
