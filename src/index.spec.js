/* eslint-env jest */
import factory, { withMiddleware } from './index'

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
      factory('id')()({ name: 'todos', prefix: 'ui' }),
      { todos: subState },
    )
  })

  describe('with name and empty prefix', () => {
    test(
      factory('id')()({ name: 'todos', prefix: undefined }),
      { todos: subState },
    )
  })

  describe('with path', () => {
    test(
      factory('id')('api')('todos'),
      {
        api: {
          todos: subState,
        },
      },
    )
  })

  describe('without path', () => {
    test(factory('id')()('todos'), { todos: subState })
  })

  describe('with middleware', () => {
    const testMiddleware = name => key => prefix => ctx => ({
      ...ctx,
      state: { ...ctx.state, [name]: true, key, prefix, prevCtx: ctx },
      action: { ...ctx.action, [name]: true },
    })

    test(
      withMiddleware({
        pre: [testMiddleware('pre1')],
        post: [testMiddleware('post1')],
      })('id')()('todos'),
      { todos: subState },
    )
  })
})
