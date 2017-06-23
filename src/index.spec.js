/* eslint-env jest */
import factory from './index'

const Todo = id => ({ id, some: `information ${id}` })

const subState = {
  datas: {
    1: Todo(1),
    20: Todo(20),
    2: Todo(2),
  },
  keys: [1, 20, 2],
  nb: 3,
  initialized: true,
}

describe('index', () => {
  const test = (reducer, state) => {
    it('should prefix actions', () => expect(reducer.add(Todo(2))).toMatchSnapshot())
    it('should prefix selectors', () => expect(reducer.get()(state)).toMatchSnapshot())
    it('should prefix reducer', () => expect(reducer(subState, reducer.del(20))).toMatchSnapshot())
  }

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

  describe('with id generator', () => {
    test(factory('id', keys => keys[keys.length] + 1)()('todos'), { todos: subState })
  })
  describe('with id generator and default value to start', () => {
    test(factory('id', (keys, start) => (keys.length < 1 ? start : keys[keys.length] + 1))()('todos'), { todos: subState })
  })
})
