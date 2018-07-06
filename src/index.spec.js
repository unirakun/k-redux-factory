/* eslint-env jest */
import { factory, keyValue, simple, simpleObject } from './index'

const Todo = id => ({ id, some: `information ${id}` })

const subState = {
  data: [
    [1, Todo(1)],
    [20, Todo(20)],
    [2, Todo(2)],
  ],
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
      factory({ name: 'todos', prefix: 'ui' }),
      { todos: subState },
    )
  })

  describe('with name and key', () => {
    it('should use custom key', () => {
      const reducer = factory({ name: 'todos', key: 'some' })
      const state = reducer(undefined, reducer.set([Todo(7), Todo(11)]))

      expect(reducer.getKeys({ todos: state })).toMatchSnapshot()
    })
  })

  describe('with name and empty prefix', () => {
    test(
      factory({ name: 'todos' }),
      { todos: subState },
    )
  })

  describe('with path', () => {
    test(
      factory({ path: 'api', name: 'todos' }),
      {
        api: {
          todos: subState,
        },
      },
    )
  })

  describe('without path', () => {
    test(factory({ name: 'todos' }), { todos: subState })
  })

  describe('with middleware', () => {
    const middleware = middlewareName => key => prefix => name => defaultData => ctx => ({
      ...ctx,
      state: {
        ...ctx.state,
        [middlewareName]: true,
        key,
        prefix,
        name,
        defaultData,
        prevCtx: ctx,
      },
      action: {
        ...ctx.action,
        [middlewareName]: true,
      },
    })

    test(
      factory({
        pre: [middleware('pre1')],
        post: [middleware('post1')],
      })({ name: 'todos' }),
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
    it('should instanciate a simple reducer', () => {
      expect(simple({ name: 'a simple' }).krfType).toMatchSnapshot()
    })

    it('should instanciate a keyValue reducer (specified)', () => {
      expect(keyValue({ name: 'a keyValue' }).krfType).toMatchSnapshot()
    })

    it('should instanciate a keyValue reducer (default)', () => {
      expect(factory({ name: 'a keyValue' }).krfType).toMatchSnapshot()
    })
  })

  describe('extended selectors', () => {
    it('should extends isInitialized selector on simple', () => {
      expect(simple({ name: 'o' }).isInitialized({ o: '' })).toMatchSnapshot()
    })
    it('should extends get selector on simple', () => {
      expect(simple({ name: 'o', defaultData: {} }).get()({ o: 'DATA' })).toMatchSnapshot()
    })
  })

  describe('action type factories', () => {
    it('should export action type factories', () => {
      expect(simple({ name: 'a simple' }).SET).toMatchSnapshot()
    })
  })

  describe('suffix of simple factory', () => {
    it('should make a simple object init to empty', () => {
      expect(simple({ name: 'object' })()).toMatchSnapshot()
      expect(simple({ name: 'simple object', defaultData: {} })()).toMatchSnapshot()
      expect(simple.object({ name: 'simple object' })()).toMatchSnapshot()
      expect(factory({ name: 'simple object', type: 'simple.object' })()).toMatchSnapshot()
    })
    it('should make a simple boolean init to false', () => {
      expect(simple.bool({ name: 'bool' })()).toMatchSnapshot()
      expect(simple({ name: 'simple bool', defaultData: false })()).toMatchSnapshot()
      expect(factory({ name: 'simple bool', type: 'simple.bool' })()).toMatchSnapshot()
    })
    it('should make a simple string init to blank', () => {
      expect(simple.string({ name: 'string' })()).toMatchSnapshot()
      expect(simple({ name: 'simple string', defaultData: '' })()).toMatchSnapshot()
      expect(factory({ name: 'simple string', type: 'simple.string' })()).toMatchSnapshot()
    })
    it('should make a simple array init to empty', () => {
      expect(simple.array({ name: 'array' })()).toMatchSnapshot()
      expect(simple({ name: 'simple array', defaultData: [] })()).toMatchSnapshot()
      expect(factory({ name: 'simple array', type: 'simple.array' })()).toMatchSnapshot()
    })
    it('should make a simple object init to empty when subtype is unknow', () => {
      expect(factory({ name: 'unknow', type: 'simple.unknow' })()).toMatchSnapshot()
    })
  })

  describe('suffix of simpleObject factory', () => {
    it('should make a simple object init to empty', () => {
      expect(simpleObject({ name: 'object' })()).toMatchSnapshot()
    })
    it('should make a simple string init to blank', () => {
      expect(simpleObject({ name: 'string', defaultData: '' })()).toMatchSnapshot()
    })
  })

  describe('default data', () => {
    it('should have default inner data', () => {
      expect({
        bool: simple.bool({ name: 'bool' })(),
        array: simple.array({ name: 'array' })(),
        object: simple.object({ name: 'object' })(),
        string: simple.string({ name: 'string' })(),
      }).toMatchSnapshot()
    })

    it('should override inner default data', () => {
      expect({
        bool: simple.bool({ name: 'bool', defaultData: true })(),
        array: simple.array({ name: 'array', defaultData: ['default'] })(),
        object: simple.object({ name: 'object', defaultData: { object: true } })(),
        string: simple.string({ name: 'string', defaultData: 'string' })(),
      }).toMatchSnapshot()
    })
  })
})
