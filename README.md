# trampss-redux-data-store

Factory of Redux reducers and their associated actions and selectors.
> Make your Redux code base tinier and simpler to maintain

[![CircleCI](https://circleci.com/gh/Trampss/trampss-redux-data-store.svg?style=shield)](https://circleci.com/gh/Trampss/trampss-redux-data-store) [![Coverage Status](https://coveralls.io/repos/github/Trampss/trampss-redux-data-store/badge.svg?branch=master)](https://coveralls.io/github/Trampss/trampss-redux-data-store?branch=master) [![NPM Version](https://badge.fury.io/js/trampss-redux-data-store.svg)](https://www.npmjs.com/package/trampss-redux-data-store)

## Contents
 - [Purpose](#purpose)
 - [Why](#why)
 - [Installation](#installation)
 - [API](#api)

## Purpose
`trampss-redux-data-store` generates generic reducers, actions and selectors in two lines.

```es6
import factory from 'trampss-redux-data-store'
export default factory('id')('api')('todos')
```
That's it, you exported a function wich is a reducer to include in a Redux `combineReducer`.
The exported function also have actions and selectors ! Easy.

In this example, we have a `todos` reducer, it has to be combined into `state.api.todos`

## Why
Using `redux-saga` make our Redux code base simpler : it's like a key/value store. But one drawback is the amount of duplicate code, each ressource has its reducers, actions and selectors.

To avoid growing Redux code base, and to avoid inconsistency, and pain maintenability, we created this lightweight library (<4Kb) that is a factory of reducers, actions and selectors.

## Installation
 - `yarn add trampss-redux-data-store`
 - `npm i trampss-redux-data-store``

### peer dependency
 - `lodash` : we use the minimum of lodash function trying to have a lightweight webpack bundle.
   - `keyBy`
   - `without`
   - `uniq`
   - `omit`
   - `at`

## API
 - [factory](#factory)
 - [actions](#actions)
 - [selectors](#selectors)

### factory
You need to use the factory to get a new set of reducer/actions/selectors :
```es6
import factory from 'trampss-redux-data-store'
```

This factory takes three parameters :
 - **first**, the field used to identify your objects (`id` for example)
   - you have to set this parameter.
 - **second**, where the reducer will be combined via `combineReducer`
   - you can leave it empty: the reducer is to the root of the Redux state
   - you can use dot notation, like `api.raw`: your reducer will be combined into `state.api.raw.<your_reducer>`
 - **third**, the reducer name (for instance: `todos`)
   - it's used to generate actions types
   - it's used to retrieve informations from selectors

Example:
 - this reducer will use `id` as key field
 - it's combined into `state.api.raw`
 - its name is `todos`
```es6
import factory from 'trampss-redux-data-store'
// factory(fieldKey)(path)(name)
export default factory('id')('api.raw')('todos')
```

Data will be stored into `state.api.raw.todos`

### reducer
Previous factory returns a function which is a reducer.
You just have to combine it like any other reducer :
```es6
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'

// import your reducer
// (created by tramps-redux-data-store factory)
import todos from './myTodosReducer'

// create your Redux store as usual
const store = createStore(
  combineReducers({
    api: combineReducers({
      raw: combineReducers({
        // import your reducer into api.raw
        // since we configured this path
        todos,
      }),
    }),
  }),
  /* your Redux middlewares */
)

export default store
```

### actions
The factory returns a reducer (function). It also contains actions and selectors as fields.
We have created some generic actions. By now, this is not possible to add yours.

Actions are:
 - `set` : set an array of instances of your ressource
   - `set(<array>)`
   - will generate this kind of Redux action:
     - `{ type: 'SET_todos', payload: <array> }`
 - `add` : add an instance of your ressource
   - `add(<instance>)`
   - will generate this kind of Redux action:
     - `{ type: 'GET_todos', payload: <instance> }`
 - `del` : delete one instance of your ressource by its key
   - `del(<key>)`
   - will generate this kind of Redux action:
     - `{ type: 'DEL_todos', payload: <key> }`
 - `reset` : reset the reducer (wipe all data)
   - `reset()`
   - will generate this kind of Redux action:
     - `{ type: 'RESET_todos' }`

Example, we set todos to our reducer:
```es6
// import your reducer
// (created by tramps-redux-data-store factory)
import todos from './myTodosReducer'

// dispatch can be given by one of your middleware (redux-thunk, redux-saga, etc)
// or it can be given by react-redux for example (mapDispatchToProps)
dispatch(
  // set todos
  todos.set([
    {
      id: '1', // we set 'id' as key in the factory
      visible: true,
      label: 'My first todo',
    },
    {
      id: '2',
      visible: false,
      label: 'This todo is done',
    },
  ])
)

```


### selectors
The factory returns a reducer (function). It also contains actions and selectors as fields.
We have created some generics selectors. By now, this is not possible to add yours.

Selectors are:
 - `get(<id>)(state)`: returns all data, or specific(s) one(s) (by key(s))
   - if `<id>` is `undefined`, it returns all data
   - if `<id>` is an array, it returns all instances that have their `id` into the array
   - in other cases, it returns the instance with its `id` that equal the parameter
 - `getBy(<propertyPath>, <value>)(state)`: get data specified by the field you want to filter with (take care, selectors are not memoized)
   - Example: `getBy('visible', true)(state)` returns all visible todos.
 - `getKeys(state)`: returns all store keys (in array)
 - `getAsArray(state)`: returns all data in array (raw)
 - `getNb(state)`:  returns number of stored instances
 - `isInitialized(state)`: return true if the store is initialized (by `add` or by `set` action)
 - `getState(state)`: returns the global state of your reducer, containing:
   - `data`: key/value store
   - `array`: raw data
   - `keys`: keys array
   - `nb`: number of instances
   - `initialized`: boolean (set to true by `set` and `add` actions)

Example, we retrieve the todo with id `1`:
```es6
// import your reducer
// (created by tramps-redux-data-store factory)
import todos from './myTodosReducer'

// state can be given by one of your middleware (redux-thunk, redux-saga, etc)
// or it can be given by react-redux for example (mapStateToProps)
todos.get('1')(state)

```
