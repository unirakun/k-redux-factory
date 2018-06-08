# Types
 - [Factories](#factories)
 - [keyValue](#keyvalue)
 - [simpleObject](#simpleobject)

# Factories
Factories are used to create a reducer with its selectors and its actions.

There are multiple factories signatures, take you favorite between:
 - `factory(middlewares)(options)` : this is the root factory, with middlewares
 - `factory(options)` : this is the root factory, without middlewares
 - `simple(middlewares)(options)` : this is a `simpleObject` factory with middlewares
 - `simple(options)` : this is a `simpleObject` factory without middlewares
 - *DEPRECATED* `simpleObject(middlewares)(options)` : this is a `simpleObject` factory with middlewares
 - *DEPRECATED* `simpleObject(options)` : this is a `simpleObject` factory without middlewares
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
   - **defaultData** (optional), set the default data value, used by `reset` action and for initialisation

You can see documentation about specific factories there:
 - [keyValue](#keyvalue)
 - [simple](#simple)
 - *DEPRECATED* [simpleObject](#simpleobject)

## keyValue
### factory
```es6
import { keyValue } from 'k-redux-factory'

export default keyValue(/* options */)
```

or

```es6
import factory from 'k-redux-factory'

export default factory({ type: 'keyValue', /* other options */ })
```

There are multiple factories signatures, take you favorite between:
 - `keyValue(middlewares)(options)` : this is a `keyValue`  factory with middlewares
 - `keyValue(options)` : this is a `keyValue`  factory without middlewares

Parameters are :
 - **middlewares** (optional), contain an object with `pre` and `post` fields. Both are an array of middlewares to apply before and after the `core` middleware
 - **options** (mandatory), either a string representating the reducer `name`, either an object with these fields :
   - **key** (optional), the field used to identify your objects (`id` is the default value)
   - **path** (optional), where the reducer will be combined via `combineReducer`
     - if empty, the reducer will be register at the root level of the redux state
     - you can use dot notation, like `api.raw`: your reducer will be combined into `state.api.raw.<your_reducer>`
   - **name** (mandatory), the reducer name (for instance: `todos`)
     - it's used to generate actions types
     - it's used to retrieve informations from selectors
   - **prefix** (optional) is added to actions to avoid some collisions when there are two reducers with the same name in two distincts paths
   - **defaultData** (optional), set the default data value, used by `reset` action and for initialisation (default is an empty hashmap model)

### state
```es6
{
  data: { <key1>: <instance1>, <key2>: <instance2> },
  array: [<instance1>, <instance2>],
  keys: [<key1>, <key2>],
  initialized: <boolean>,
}
```

### actions

| function name | description | signature | generated action |
|---|---|---|---|
| `set` | set instance(s) of your resource (remove older ones) | `set(<array>)` or `set(instance)` | `{ type: '@@krf/SET>TODOS', payload: <array> or <instance> }` |
| `add` | add instance(s) of your resource | `add(<instance>)` or `add(<array>)` | `{ type: '@@krf/ADD>TODOS', payload: <instance> or <array> }` |
| `update` | update existing instance(s) of your resource | `update(<instance>)` or `update(<array>)` | `{ type: '@@krf/UPDATE>TODOS', payload: <instance> or <array> }` |
| `addOrUpdate` | update existing instance(s) of your resource, or add them if not found | `addOrUpdate(<instance>)` or `addOrUpdate(<array>)` | `{ type: '@@krf/ADD_OR_UPDATE>TODOS', payload: <instance> or <array> }` |
| `remove` | remove instance(s) of your resource by its key | `remove([<key>])` | `{ type: '@@krf/REMOVE>TODOS', payload: [<key>] }` |
| `reset` | reset the reducer (wipe all data) | `reset()` | `{ type: '@@krf/RESET>TODOS' }` |

### selectors
| signature | description | comment |
|---|---|---|
| primary |
| `get(<id>)(state)` | returns all data, or specific one(s) (by key(s)) | <ul><li>if `<id>` is `undefined`, it returns all data</li><li>if `<id>` is an array, it returns all instances that match one of the ids</li><li>in other cases, it returns the instance which `id` matches the parameter</li></ul> |
| `getBy(<propertyPath>, <value>)(state)` | get data specified by the field you want to filter with (take care, selectors are not memoized) | Example: `getBy('visible', true)(state)` returns all visible todos.
| `getKeys(state)` | returns all store keys (in array) | |
| `getAsArray(state)` | returns all data in array (raw) | |
| `getLength(state)` | returns number of stored instances | |
| `isInitialized(state)` | returns true if the store has been initialized (by `add` or by `set` action) | |
| `getState(state)` | returns the global state of your reducer | |
| secondary |
| `hasKey(<key>)(state)` | returns `true` if the given `<key>` is present | |

## simple
### factory
```es6
import { simple } from 'k-redux-factory'

export default simple(/* options */)
```

or

```es6
import factory from 'k-redux-factory'

export default factory({ type: 'simple', /* other options */ })
```

or

```es6
import factory from 'k-redux-factory'

export default factory({ type: 'simple.string', /* other options */ })
```

There are multiple factories signatures, take you favorite between:
 - `simple(middlewares)(options)` : this is a `simple` factory with middlewares
 - `simple(options)` : this is a `simple` factory without middlewares
 - `simple.bool(options)` : this is a `simple boolean` factory initialize to `false`
 - `simple.string(options)` : this is a `simple string` factory initialize to `''`
 - `simple.array(options)` : this is a `simple array` factory initialize to `[]`

Parameters are :
 - **middlewares** (optional), contain an object with `pre` and `post` fields. Both are an array of middlewares to apply before and after the `core` middleware
 - **options** (mandatory), either a string representating the reducer `name`, either an object with these fields :
   - **path** (optional), where the reducer will be combined via `combineReducer`
     - if empty, the reducer will be register at the root level of the redux state
     - you can use dot notation, like `api.raw`: your reducer will be combined into `state.api.raw.<your_reducer>`
   - **name** (mandatory), the reducer name (for instance: `todos`)
     - it's used to generate actions types
     - it's used to retrieve informations from selectors
   - **prefix** (optional) is added to actions to avoid some collisions when there are two reducers with the same name in two distincts paths
   - **defaultData** (optional), set the default data value, used by `reset` action and for initialisation (default is an empty object `{}`)

### state (without defaultData)
```es6
{}
```
### state (with defaultData: `'todo'`)
```es6
'todo'
```
### state (with simple.bool)
```es6
false
```


### actions

| function name | description | signature | generated action |
|---|---|---|---|
| `set` | set the instance | `set(<instance>)` | `{ type: '@@krf/SET_TODOS', payload: <instance> }` |
| `update` | update the instance of your resource | `update(<instance>)` | `{ type: '@@krf/UPDATE>TODOS', payload: <instance> }` |
| `reset` | reset the reducer (wipe all data) | `reset()` | `{ type: '@@krf/RESET>TODOS' }` |

### selectors

| signature | description | comment |
|---|---|---|
| `get()(state)` | returns data (instance) | |
| `isInitialized(state)` | returns true if the store has been initialized (by `set` action) | |

## simpleObject
### factory
```es6
import { simpleObject } from 'k-redux-factory'

export default simpleObject(/* options */)
```

or

```es6
import factory from 'k-redux-factory'

export default factory({ type: 'simpleObject', /* other options */ })
```

There are multiple factories signatures, take you favorite between:
 - `simpleObject(middlewares)(options)` : this is a `simpleObject` factory with middlewares
 - `simpleObject(options)` : this is a `simpleObject` factory without middlewares

Parameters are :
 - **middlewares** (optional), contain an object with `pre` and `post` fields. Both are an array of middlewares to apply before and after the `core` middleware
 - **options** (mandatory), either a string representating the reducer `name`, either an object with these fields :
   - **path** (optional), where the reducer will be combined via `combineReducer`
     - if empty, the reducer will be register at the root level of the redux state
     - you can use dot notation, like `api.raw`: your reducer will be combined into `state.api.raw.<your_reducer>`
   - **name** (mandatory), the reducer name (for instance: `todos`)
     - it's used to generate actions types
     - it's used to retrieve informations from selectors
   - **prefix** (optional) is added to actions to avoid some collisions when there are two reducers with the same name in two distincts paths
   - **defaultData** (optional), set the default data value, used by `reset` action and for initialisation (default is an empty object `{}`)

### state (without defaultData)
```es6
{}
```
### state (with defaultData: `'todo'`)
```es6
'todo'
```


### actions

| function name | description | signature | generated action |
|---|---|---|---|
| `set` | set the instance | `set(<instance>)` | `{ type: '@@krf/SET_TODOS', payload: <instance> }` |
| `update` | update the instance of your resource | `update(<instance>)` | `{ type: '@@krf/UPDATE>TODOS', payload: <instance> }` |
| `reset` | reset the reducer (wipe all data) | `reset()` | `{ type: '@@krf/RESET>TODOS' }` |

### selectors

| signature | description | comment |
|---|---|---|
| `get()(state)` | returns data (instance) | |
| `isInitialized(state)` | returns true if the store has been initialized (by `set` action) | |
