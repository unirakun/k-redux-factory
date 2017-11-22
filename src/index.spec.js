/* eslint-env jest */
import factory, { keyValue, simpleObject } from './index'

const Todo = id => ({ id, some: `information ${id}` })

const subState = {
  data: {
    1: Todo(1),
    20: Todo(20),
    2: Todo(2),
  },
  keys: [1, 20, 2],
  initialized: true,
}

describe('index', () => {
  const test = (reducer, state) => {
    it('should prefix actions', () => expect(reducer.add(Todo(2))).toMatchSnapshot())
    it('should prefix selectors', () => expect(reducer.get()(state)).toMatchSnapshot())
    it('should prefix reducer', () => expect(reducer(subState, reducer.remove(20))).toMatchSnapshot())
  }

  describe('with name and prefix', () => {
    test(
      factory({ key: 'id', name: 'todos', prefix: 'ui' }),
      { todos: subState },
    )
  })

  describe('with name and empty prefix', () => {
    test(
      factory({ key: 'id', name: 'todos', prefix: undefined }),
      { todos: subState },
    )
  })

  describe('with path', () => {
    test(
      factory({ key: 'id', path: 'api', name: 'todos' }),
      {
        api: {
          todos: subState,
        },
      },
    )
  })

  describe('without path', () => {
    test(factory({ key: 'id', name: 'todos' }), { todos: subState })
  })

  describe('with middleware', () => {
    const middleware = name => key => prefix => defaultData => ctx => ({
      ...ctx,
      state: { ...ctx.state, [name]: true, key, prefix, defaultData, prevCtx: ctx },
      action: { ...ctx.action, [name]: true },
    })

    test(
      factory({
        pre: [middleware('pre1')],
        post: [middleware('post1')],
      })({ key: 'id', name: 'todos' }),
      { todos: subState },
    )
  })

  describe('type validation', () => {
    it('should be on error [undefined]', () => {
      let error

      try {
        factory()
      } catch (ex) {
        error = ex
      }

      expect(error).toMatchSnapshot()
    })

    it('should be on error [not a middleware object, nor an option object]', () => {
      let error

      try {
        factory({ oups: 'unknown' })
      } catch (ex) {
        error = ex
      }

      expect(error).toMatchSnapshot()
    })

    it('should instanciate a reducer (options as object)', () => {
      expect(factory({ name: 'aa' }).krfType).toMatchSnapshot()
    })

    it('should instanciate a reducer (options as string -name-)', () => {
      expect(factory('a reducer').krfType).toMatchSnapshot()
    })
  })

  describe('named factory', () => {
    it('should instanciate a simpleObject reducer', () => {
      expect(simpleObject({ name: 'a simpleObject' }).krfType).toMatchSnapshot()
    })

    it('should instanciate a keyValue reducer (specified)', () => {
      expect(keyValue({ name: 'a keyValue' }).krfType).toMatchSnapshot()
    })

    it('should instanciate a keyValue reducer (default)', () => {
      expect(factory({ name: 'a keyValue' }).krfType).toMatchSnapshot()
    })
  })

  describe('extended selectors', () => {
    it('should extends isInitialized selector on simpleObject', () => {
      expect(simpleObject({ name: 'o' }).isInitialized({ o: '' })).toMatchSnapshot()
    })
    it('should extends get selector on simpleObject', () => {
      expect(simpleObject({ name: 'o', defaultData: {} }).get()({ o: 'DATA' })).toMatchSnapshot()
    })
  })

  describe('action type factories', () => {
    it('should export action type factories', () => {
      expect(simpleObject({ name: 'a simpleObject' }).SET).toMatchSnapshot()
    })
  })
})
