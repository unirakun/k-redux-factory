# k-redux-factory

Factory of Redux reducers and their associated actions and selectors.
> Make your Redux code base tinier and simpler to maintain

[![CircleCI](https://circleci.com/gh/alakarteio/k-redux-factory.svg?style=shield)](https://circleci.com/gh/alakarteio/k-redux-factory) [![Coverage Status](https://coveralls.io/repos/github/alakarteio/k-redux-factory/badge.svg?branch=master)](https://coveralls.io/github/alakarteio/k-redux-factory?branch=master) [![NPM Version](https://badge.fury.io/js/k-redux-factory.svg)](https://www.npmjs.com/package/k-redux-factory)
[![Size](http://img.badgesize.io/alakarteio/k-redux-factory/master/index.js.svg)]()

## Contents
 - [Purpose](#purpose)
 - [Why ?](#why)
 - [Installation](#installation)
 - [Documentation](#api)
 - [API](./TYPES.md)

## Purpose
`k-redux-factory` creates generic reducers, actions and selectors in two lines.

```es6
import { keyValue } from 'k-redux-factory'
export default keyValue({ key: 'id', path: 'api', name: 'todos' })
```
That's it, you just exported the reducer function and now you can register it through combinerReducer in Redux.

In this example, we have a `todos` reducer, it has to be combined into `state.api.todos`.

You can now use it to dispatch actions and select some datas from this reducer:
```es6
import myReducer from './myReducer'

// ...
// add a todo
dispatch(myReducer.add({ id: 1, title: 'Apply to some CFP', completed: false })

// ...
// select a todo
myReducer.get(1)(getState())
```

One more thing, this lib handle state immutability for you !

Click [right here to see the full API.](./TYPES.md)

## Why
We like to write Redux code as simple as possible and use its middlewares to handle real world problems.
From this point of view, our Redux code base is simpler : it's like a key/value store. But one drawback is the amount of duplicated code, each resource has its own reducers, actions and selectors.

We created this lightweight library, a factory of reducers, actions and selectors, to avoid inconsistency and painful maintainability from our growing Redux code base.

## Installation
 - `yarn add k-redux-factory`
 - `npm i k-redux-factory`

### peer dependency
 - `lodash` : we use the minimum of lodash function trying to have a lightweight webpack bundle.

## Documentation
 - [factory](#factory)
 - [actions](#actions)
 - [selectors](#selectors)
 - [helpers](#helpers)

### factory
You need to use the factory to get a new set of reducer/actions/selectors :
```es6
// modular factory
import factory from 'k-redux-factory'

// or - prebuild simpleObject factory
import { simpleObject } from 'k-redux-factory'

// or - prebuild keyValue factory
import { keyValue } from 'k-redux-factory'
```

There are multiple factories signatures, take you preferred between :
 - `factory(middlewares)(options)` : this is the root factory, with middlewares
 - `factory(options)` : this is the root factory, without middlewares
 - `simpleObject(middlewares)(options)` : this is a `simpleObject` factory with middlewares
 - `simpleObject(options)` : this is a `simpleObject` factory without middlewares
 - `keyValue(middlewares)(options)` : this is a `keyValue`  factory with middlewares
 - `keyValue(options)` : this is a `keyValue`  factory without middlewares

Parameters are :
 - **middlewares** (optional), contain an object with `pre` and `post` fields. Both are an array of middlewares to apply before and after the `core` middleware
 - **options** (mandatory), either a string representating the reducer `name`, either an object with these fields :
   - **key** (exists only for the `keyValue` type -mandatory-), the field used to identify your objects (`id` for example)
   - **path** (optional), where the reducer will be combined via `combineReducer`
     - if empty, the reducer will be register at the root level of the redux state
     - you can use dot notation, like `api.raw`: your reducer will be combined into `state.api.raw.<your_reducer>`
   - **name** (mandatory), the reducer name (for instance: `todos`)
     - it's used to generate actions types
     - it's used to retrieve informations from selectors
   - **prefix** (optional) is added to actions to avoid some collisions when there are two reducers with the same name in two distincts paths
   - **type** (optional) can be `keyValue` or `simpleObject` (default is `keyValue`)
   - **defaultData** (optional), set the default data value, used by `reset` action and for initialisation (default is an empty object `{}` for `simpleObject` and default hashmap model for `keyValue` - see [keyValue types section](./TYPES.md#state))

Example:
 - this reducer will use `id` as key field
 - it's combined into `state.api.raw`
 - it's name is `todos`
 - have default data
```es6
import factory from 'k-redux-factory'

const defaultData = [
  {
    id: 1,
    todo: 'write README.MD',
  },
  {
    id: 2,
    todo: 'watch rick and morty season three',
  },
]

export default factory({ key: 'id', path: 'api.raw', name: 'todos', defaultData })
```

Data will be stored into `state.api.raw.todos`.

### [Types](./TYPES.md)
Types are :
  - `keyValue` : your state is a hashmap, useful to bind your API to Redux with the following redux state model :
```es6
{
  data: { <key1>: <instance1>, <key2>: <instance2> },
  array: [<instance1>, <instance2>],
  keys: [<key1>, <key2>],
  initialized: true,
}
```

  - `simpleObject` : your state is directly your `<instance>`. **This implies that you can not set undefined.**

Default type is `keyValue`.

### reducer
The previous factory returns a function which is a reducer.
You just have to combine it like any other reducer :
```es6
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'

// import your reducer
// (created by k-redux-factory)
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

#### Exemple keyValue with default state
```es6
import { keyValue } from 'k-redux-factory'

const defaultData = [
  {
    id: 1,
    todo: 'write README.MD',
  },
  {
    id: 2,
    todo: 'watch rick and morty season three',
  },
]

export default keyValue({ key: 'id', defaultData})
```

```es6
{
  data: { 1: { id: 1, todo: 'write README.MD' }, 2: { id: 2, todo: 'watch rick and morty season three' }},
  array: [{ id: 1, todo: 'write README.MD' }, { id: 2, todo: 'watch rick and morty season three' }],
  keys: [1, 2],
  initialized: true,
}
```

### actions
The factory returns a function (this is the reducer) that also contains actions and selectors as fields.
Some generic actions are available. By now, it's not possible to add custom ones.

To see them go to [TYPES.md](./TYPES.md).

Example, we set todos to our typed `keyValue` reducer:
```es6
// import your reducer
// (created by k-redux-factory)
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

You can also retrieve action name like this : `todos.SET`

### selectors
The factory returns a function (this is the reducer) that also contains actions and selectors as fields.
Some generic selectors are available. By now, it's not possible to add custom ones.

To see them go to [TYPES.md](./TYPES.md).

Example, we retrieve the todo with id `1`:
```es6
// import your reducer
// (created by k-redux-factory)
import todos from './myTodosReducer'

// state can be given by one of your middleware (redux-thunk, redux-saga, etc)
// or it can be given by react-redux for example (mapStateToProps)
todos.get('1')(state)
```
### helpers

| signature | description | comment |
|---|---|---|
|`mapAction(<mapper(action)>)`| create middleware and map only redux action | mapper(action) is mandatory |
|`mapState(<regex>)(<mapper(state)>)`| create middleware and map the state of the corresponding redux actions type by the regex |
|`reducer(<yourReducer(action, state)>)`| create a middleware from a standard redux reducer |
|`mapPayload(<regex>)(<mapper(payload)>)`| create middleware and map the payload of the corresponding redux actions type by the regex |

#### Example, we create a middleware but we modify only the action :
```es6
import factory from 'k-redux-factory'
// import your helpers
import { mapAction } from 'k-redux-factory/helpers'

// define a function to map action
const mapper = action => ({ ...action, type: `SET_${action.type}` })
// create your reducer and transform the type of action before core middleware
export default factory({ pre: [mapAction(mapper)] })({ key: 'id', path: 'api.raw', name: 'todos' })
```

#### Example, we create a middleware but we modify only the state :
```es6
import factory from 'k-redux-factory'
// import your helpers
import { mapState } from 'k-redux-factory/helpers'

// define a function to change state
const mapper = state => ({...state, todos: 'TODO_CHANGED'})
// create your reducer and transform the state before core middleware
export default factory({ pre: [mapState(/SET_TODOS/)(mapper)] })({ key: 'id', path: 'api.raw', name: 'todos' })
```

#### Example, we create a middleware but we modify action and state :
```es6
import factory from 'k-redux-factory'
// import your helpers
import { reducer } from 'k-redux-factory/helpers'

// define a function to map state depending on the action
const mapper = (action, state) => {
  switch (action.type) {
    case 'SET_TODOS': return { todos: 'TODOS_CHANGED' }
    case 'LOG_TODOS': console.log(state)
    default: return state
  }
}
// create your reducer and transform the action and state before core middleware
export default factory({ pre: [reducer(mapper)] })({ key: 'id', path: 'api.raw', name: 'todos' })
```

#### Example, we create a middleware but we modify only the payload :
```es6
import factory from 'k-redux-factory'
// import your helpers
import { mapPayload } from 'k-redux-factory/helpers'

// define a function to map payload
const mapper = payload => payload.map(p => ({ ...p, id: `ID_${p.id}` }))
// create your reducer and transform the payload before core middleware
export default factory({ pre: [mapPayload(/SET_TODOS/)(mapper)] })({ key: 'id', path: 'api.raw', name: 'todos' })
```

# About ![alakarte](https://i.imgur.com/PKlqzvj.png)
**alakarte** is created by two passionate french developers.

Do you want to contact them ? Go to their [website](http://alakarte.io)

<table border="0">
 <tr>
  <td align="center"><img src="https://avatars1.githubusercontent.com/u/26094222?s=460&v=4" width="100" /></td>
  <td align="center"><img src="https://avatars1.githubusercontent.com/u/17828231?s=460&v=4" width="100" /></td>
 </tr>
 <tr>
  <td align="center"><a href="https://github.com/guillaumecrespel">Guillaume CRESPEL</a></td>
  <td align="center"><a href="https://github.com/fabienjuif">Fabien JUIF</a></td>
</table>
