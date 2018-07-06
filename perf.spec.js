/* eslint-env jest */
// init avec default data
// 100 SET d'un tableau de 1000
// 100 ADD
// 100 UPDATE
// 100 ADD_OR_UPDATE
// 100 REMOVE
// <time>
// 1000 de chaque selector
const { keyValue } = require('.')

const RERUN = 100
const RERUN_SELECTORS = 100000

const rerun = callback => Array.from({ length: RERUN }).reduce(callback)
const rerunSelectors = callback => Array.from({ length: RERUN_SELECTORS }).reduce(callback)

describe('performance', () => {
  const genData = (label, offset) => (curr, index) => ({
    code: (index + offset),
    other: `value-${(index + offset)}`,
    label,
  })

  const data = {
    defaultData: Array.from({ length: 1000 }).map(genData('default', 0)),
    set: Array.from({ length: 10000 }).map(genData('set', 0)),
    add: Array.from({ length: 1000 }).map(genData('add', 100000)),
    update: Array.from({ length: 1000 }).map(genData('update', 100000)),
    remove: Array.from({ length: 1000 }).map(genData('remove', 2)),
    addOrUpdate: Array.from({ length: 1000 }).map(genData('addOrUpdate', 100500)),
    getByIds: Array.from({ length: 1000 }).map((...args) => genData('getByIds', 120)(args).code),
  }

  const timers = {
    writes: {},
    reads: {},
  }

  it('should print perf', () => {
    // TODO: make timers results in term of operation per second (OPS)
    // TODO: test returns
    let state
    timers.all = Date.now()
    timers.writes.total = Date.now()

    // writes
    timers.writes.init = Date.now()
    // - init
    // TODO: should work
    const reducer = rerun(() => keyValue({ name: 'perf', key: 'code', defaultData: data.defaultData }))
    state = reducer()
    timers.writes.init = Date.now() - timers.writes.init
    // - set
    timers.writes.set = Date.now()
    state = rerun(() => reducer(state, reducer.set(data.set)))
    timers.writes.set = Date.now() - timers.writes.set
    // - add
    timers.writes.add = Date.now()
    state = rerun(() => reducer(state, reducer.add(data.add)))
    timers.writes.add = Date.now() - timers.writes.add
    // - update
    timers.writes.update = Date.now()
    state = rerun(() => reducer(state, reducer.update(data.update)))
    timers.writes.update = Date.now() - timers.writes.update
    // - remove
    timers.writes.remove = Date.now()
    state = rerun(() => reducer(state, reducer.remove(data.remove)))
    timers.writes.remove = Date.now() - timers.writes.remove
    // - addOrUpdate
    timers.writes.addOrUpdate = Date.now()
    state = rerun(() => reducer(state, reducer.addOrUpdate(data.addOrUpdate)))
    timers.writes.addOrUpdate = Date.now() - timers.writes.addOrUpdate
    // end writes tests
    timers.writes.total = Date.now() - timers.writes.total

    // reads
    timers.reads.total = Date.now()
    state = { perf: state }
    // - getState
    timers.reads.getState = Date.now()
    rerunSelectors(() => reducer.getState(state))
    timers.reads.getState = Date.now() - timers.reads.getState
    // - getKeys
    timers.reads.getKeys = Date.now()
    rerunSelectors(() => reducer.getKeys(state))
    timers.reads.getKeys = Date.now() - timers.reads.getKeys
    // - getAsArray
    timers.reads.getAsArray = Date.now()
    rerunSelectors(() => reducer.getAsArray(state))
    timers.reads.getAsArray = Date.now() - timers.reads.getAsArray
    // - getLength
    timers.reads.getLength = Date.now()
    rerunSelectors(() => reducer.getLength(state))
    timers.reads.getLength = Date.now() - timers.reads.getLength
    // - isInitialized
    timers.reads.isInitialized = Date.now()
    rerunSelectors(() => reducer.isInitialized(state))
    timers.reads.isInitialized = Date.now() - timers.reads.isInitialized
    // - get()
    timers.reads.get = Date.now()
    rerunSelectors(() => reducer.get()(state))
    timers.reads.get = Date.now() - timers.reads.get
    // - get([id])
    timers.reads.getByIds = Date.now()
    rerunSelectors(() => reducer.get(data.getByIds)(state))
    timers.reads.getByIds = Date.now() - timers.reads.getByIds
    // - get(id)
    timers.reads.getById = Date.now()
    rerunSelectors(() => reducer.get(1300)(state))
    timers.reads.getById = Date.now() - timers.reads.getById
    // - getBy
    // TODO:
    // - hasKey
    timers.reads.hasKey = Date.now()
    rerunSelectors(() => reducer.get(137)(state))
    timers.reads.hasKey = Date.now() - timers.reads.hasKey
    // end reads tests
    timers.reads.total = Date.now() - timers.reads.total

    // prints
    timers.all = Date.now() - timers.all
    console.log('results (ms):', JSON.stringify(timers, null, 2))
  })
})
