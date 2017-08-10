# Types

 - [keyValue](#keyValue)
 - [simpleObject](#simpleObject)

## keyValue
### factory
```es6
import { keyValue } from 'trampss-redux-factory'

export default keyValue(/* options */)
```

or

```es6
import factory from 'trampss-redux-factory'

export default factory({ type: 'keyValue', /* other options */ })
```

### state
```es6
{
  data: { <key1>: <instance1>, <key2>: <instance2> },
  array: [<instance1>, <instance2>],
  keys: [<key1>, <key2>],
  initialized: true,
}
```

### actions

| function name | description | signature | generated action |
|---|---|---|---|
| `set` | set an array of instances of your resource | `set(<array>)` | `{ type: '@trampss/SET_TODOS', payload: <array> }` |
| `add` | add an instance of your resource | `add(<instance>)` | `{ type: '@trampss/ADD_TODOS', payload: <instance> }` |
| `update` | update an existing instance of your resource | `update(<instance>)` | `{ type: '@trampss/UPDATE_TODOS', payload: <instance> }` |
| `addOrUpdate` | update an existing instance of your resource, or add it if not found | `addOrUpdate(<instance>)` | `{ type: '@trampss/ADD_OR_UPDATE_TODOS', payload: <instance> }` |
| `remove` | remove one instance of your resource by its key | `remove(<key>)` | `{ type: '@trampss/REMOVE_TODOS', payload: <key> }` |
| `orderBy` | order array and keys by path (see lodash function `orderBy` and `get`). The payload can be a `string` or a `function`, then the desc is `false`. | `orderBy({ by: <path|function>, desc: <boolean>) })` | `{ type: '@trampss/ORDER_BY_TODOS', payload: { by: <path|function>, desc: <boolean> } }` |
| `reset` | reset the reducer (wipe all data) | `reset()` | `{ type: '@trampss/RESET_TODOS' }` |

### selectors

| signature | description | comment |
|---|---|---|
| `get(<id>)(state)` | returns all data, or specific one(s) (by key(s)) | <ul><li>if `<id>` is `undefined`, it returns all data</li><li>if `<id>` is an array, it returns all instances that match one of the ids</li><li>in other cases, it returns the instance which `id` matches the parameter</li></ul> |
| `getBy(<propertyPath>, <value>)(state)` | get data specified by the field you want to filter with (take care, selectors are not memoized) | Example: `getBy('visible', true)(state)` returns all visible todos.
| `getKeys(state)` | returns all store keys (in array) | |
| `getAsArray(state)` | returns all data in array (raw) | |
| `getLength(state)` | returns number of stored instances | |
| `isInitialized(state)` | returns true if the store has been initialized (by `add` or by `set` action) | |
| `getState(state)` | returns the global state of your reducer | |

## simpleObject
### factory
```es6
import { simpleObject } from 'trampss-redux-factory'

export default simpleObject(/* options */)
```

or

```es6
import factory from 'trampss-redux-factory'

export default factory({ type: 'simpleObject', /* other options */ })
```

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
| `set` | set the instance | `set(<instance>)` | `{ type: '@trampss/SET_TODOS', payload: <instance> }` |
| `update` | update the instance of your resource | `update(<instance>)` | `{ type: '@trampss/UPDATE_TODOS', payload: <instance> }` |
| `reset` | reset the reducer (wipe all data) | `reset()` | `{ type: '@trampss/RESET_TODOS' }` |

### selectors

| signature | description | comment |
|---|---|---|
| `get()(state)` | returns data (instance) | |
| `isInitialized(state)` | returns true if the store has been initialized (by `set` action) | |
