# Migrating Guide
## From 5.X.X to 6.0.0
### Deprecated
 - `simpleObject` factory is deprecated. [You can now use `simple` factories](./TYPES.md):
    * `simple.object`
    * `simple.string`
    * `simple.bool`
    * `simple.array`

### Breaking changes
 - `replace` action is removed, use `add` action
 - `orderBy` action is removed
    * You can write [your own with a middleware](./README.md#example-we-create-a-middleware-but-we-modify-action-and-state-)
    * You can use [k-ramel](https://github.com/alakarteio/k-ramel) to handle your logical code and use `k-redux-factory` for the key/value store only
    * You can use [redux-saga](https://github.com/redux-saga/redux-saga) to handle your logical code and use `k-redux-factory` for the key/value store only
 - `factory` export is not the default one
    * **Before**: `import factory, { keyValue } from 'k-redux-factory'`
    * **Now**: `import { factory, keyValue } from 'k-redux-factory'`
 - `state` created by `k-redux-factory` is modified to be less bloated when serialized:
    * `getState` selector returns a new shape, see [dedicated chapter](#state)
    * all other selectors work as before 👌

### State
The state shape used by `k-redux-factory` is changed to be less bloated when serialized.
Under the hood we use Javascript *Map* object.

This is a breaking change when you:
 - manually retrieve the substate from a `k-redux-factory` reducer
 - or use the `getState` selector

All other selectors work as before 👌

**k-redux-factory v5.x.x**
```js
{
  data: { <key1>: <instance1>, <key2>: <instance2> },
  array: [<instance1>, <instance2>],
  keys: [<key1>, <key2>],
  initialized: true,
}
```

**k-redux-factory v6.0.0**
```js
{
  data: [
    [<key1>, <instance1>],
    [<key2>, <instance2>],
  ],
  initialized: true,
}
```
