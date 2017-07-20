# trampss-redux-factory

Factory of Redux reducers and their associated actions and selectors.
> Make your Redux code base tinier and simpler to maintain

[![CircleCI](https://circleci.com/gh/Trampss/trampss-redux-factory.svg?style=shield)](https://circleci.com/gh/Trampss/trampss-redux-factory) [![Coverage Status](https://coveralls.io/repos/github/Trampss/trampss-redux-factory/badge.svg?branch=master)](https://coveralls.io/github/Trampss/trampss-redux-factory?branch=master) [![NPM Version](https://badge.fury.io/js/trampss-redux-factory.svg)](https://www.npmjs.com/package/trampss-redux-factory)
[![Size](http://img.badgesize.io/Trampss/trampss-redux-factory/master/index.js.svg)]()

## Contents
 - [Purpose](#purpose)
 - [Why ?](#why)
 - [Installation](#installation)
 - [API](#api)

## Purpose
`trampss-redux-factory` creates generic reducers, actions and selectors in two lines.

```es6
import { map } from 'trampss-redux-factory'
export default map({ key: 'id', path: 'api', name: 'todos' })
```
That's it, you just exported the reducer function and now you can register it through combinerReducer in Redux.

In this example, we have a `todos` reducer, it has to be combined into `state.api.todos`.

One more thing, this lib handle state immutability for you !

## Why
We like to write Redux code as simple as possible and use its middlewares to handle real world problems.
From this point of view, our Redux code base is simpler : it's like a key/value store. But one drawback is the amount of duplicated code, each resource has its own reducers, actions and selectors.

We created this lightweight library, a factory of reducers, actions and selectors, to avoid inconsistency and painful maintainability from our growing Redux code base.

## Installation
 - `yarn add trampss-redux-factory`
 - `npm i trampss-redux-factory`

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
 - [helpers](#helpers)

### factory
You need to use the factory to get a new set of reducer/actions/selectors :
```es6
// modular factory
import factory from 'trampss-redux-factory'

// or - prebuild uniq factory
import { uniq } from 'trampss-redux-factory'

// or - prebuild map factory
import { map } from 'trampss-redux-factory'
```

There are multiple factories signatures, take you preferred between :
 - `factory(middlewares)(options)` : this is the root factory, with middlewares
 - `factory(options)` : this is the root factory, without middlewares
 - `uniq(middlewares)(options)` : this is a `uniq` factory with middlewares
 - `uniq(options)` : this is a `uniq` factory without middlewares
 - `map(middlewares)(options)` : this is a `map`  factory with middlewares
 - `map(options)` : this is a `map`  factory without middlewares

Parameters are :
 - **middlewares** (optional), contain an object with `pre` and `post` fields. Both are an array of middlewares to apply before and after the `core` middleware.
 - **options** (mandatory), either a string representating the reducer `name`, either an object with these fields :
   - **key** (optional), the field used to identify your objects (`id` for example)
   - **path** (optional), where the reducer will be combined via `combineReducer`
     - if empty, the reducer will be register at the root level of the redux state
     - you can use dot notation, like `api.raw`: your reducer will be combined into `state.api.raw.<your_reducer>`
   - **name** (mandatory), the reducer name (for instance: `todos`)
     - it's used to generate actions types
     - it's used to retrieve informations from selectors
   - **prefix** (optional) is added to actions to avoid some collisions when there are two reducers with the same name in two distincts paths
   - **type** (optional) can be `map` or `uniq` (default is `map`)

Example:
 - this reducer will use `id` as key field
 - it's combined into `state.api.raw`
 - its name is `todos`
```es6
import factory from 'trampss-redux-factory'

export default factory({ key: 'id', path: 'api.raw', name: 'todos' })
```

Data will be stored into `state.api.raw.todos`.

### [Types](./TYPES.md)
Types are :
  - `map` : your state is a hashmap, useful to bind your API to Redux with the following redux state model :
```es6
{
  data: { <key1>: <instance1>, <key2>: <instance2> },
  array: [<instance1>, <instance2>],
  keys: [<key1>, <key2>],
  initialized: true,

}
```

  - `uniq` : your state is an object, simpler, with the following redux state model :
```es6
{
  data: <instance>,
  initialized: true,
}
```

Default type is `map`.

### reducer
The previous factory returns a function which is a reducer.
You just have to combine it like any other reducer :
```es6
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'

// import your reducer
// (created by tramps-redux-data-store factory)
import todos from './myTodosReducer'

// create your Redux store as usual
const store = createStore(
  combineReducers({
    // [other reducer]
    api: combineReducers({
      // [other reducer]
      raw: combineReducers({
        // import your reducer into api.raw
        // since we configured this path
        todos,
      }),
      // [other reducer]
    }),
    // [other reducer]
  }),
  /* your Redux middlewares */
)

export default store
```

### actions
The factory returns a function (this is the reducer) that also contains actions and selectors as fields.
Some generic actions are available. By now, it's not possible to add custom ones.

To see them go to [TYPES.md](./TYPES.md).

Example, we set todos to our typed `map` reducer:
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
The factory returns a function (this is the reducer) that also contains actions and selectors as fields.
Some generic selectors are available. By now, it's not possible to add custom ones.

To see them go to [TYPES.md](./TYPES.md).

Example, we retrieve the todo with id `1`:
```es6
// import your reducer
// (created by tramps-redux-data-store factory)
import todos from './myTodosReducer'

// state can be given by one of your middleware (redux-thunk, redux-saga, etc)
// or it can be given by react-redux for example (mapStateToProps)
todos.get('1')(state)
```
### helpers

| signature | description | comment |
|---|---|---|
|`mapAction(<mapper(action)>)`| create middleware and map only redux action | mapper(action) is mandatory |
|`mapPayload(<regex>)(<mapper(payload)>)`| create middleware and map the payload of the corresponding redux actions type by the regex |

#### Example, we create a middleware but we modify only the action :
```es6
import factory from 'trampss-redux-factory'
// import your helpers
import { mapAction } from 'trampss-redux-factory/helpers'

// define a function to map action
const mapper = action => ({ ...action, type: `SET_${action.type}` })
// create your reducer and transform the type of action before core middleware
export default factory({ pre: [mapAction(mapper)] })({ key: 'id', path: 'api.raw', name: 'todos' })
```

#### Example, we create a middleware but we modify only the payload :
```es6
import factory from 'trampss-redux-factory'
// import your helpers
import { mapPayload } from 'trampss-redux-factory/helpers'

// define a function to map payload
const mapper = payload => payload.map(p => ({ ...p, id: `ID_${p.id}` }))
// create your reducer and transform the payload before core middleware
export default factory({ pre: [mapPayload(/SET_TODOS/)(mapper)] })({ key: 'id', path: 'api.raw', name: 'todos' })
```
