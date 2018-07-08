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
const LENGTH = 1000

const rerun = callback => Array.from({ length: RERUN }).reduce(callback)
const rerunSelectors = callback => Array.from({ length: RERUN_SELECTORS }).reduce(callback)

describe('performance', () => {
  const genData = (label, offset) => (curr, index) => ({
    code: (index + offset),
    other: `value-${(index + offset)}`,
    label,
  })

  const data = {
    defaultData: Array.from({ length: LENGTH }).map(genData('default', 0)),
    sets: Array.from({ length: LENGTH }).map(genData('sets', 0)),
    add: genData('add', 100000)(0),
    adds: Array.from({ length: LENGTH }).map(genData('adds', 100002)),
    update: genData('update', 100000)(0),
    updates: Array.from({ length: LENGTH }).map(genData('updates', 100002)),
    remove: genData('remove', 2)(0),
    removes: Array.from({ length: LENGTH }).map(genData('removes', 4)),
    addOrUpdate: genData('addOrUpdate', 100500)(0),
    addOrUpdates: Array.from({ length: LENGTH }).map(genData('addOrUpdates', 100502)),
    getByIds: Array.from({ length: LENGTH }).map((...args) => genData('getByIds', 120)(args).code),
  }

  const timers = {
    writes: {},
    reads: {},
  }

  const getReadOrWrite = (what) => {
    switch (what) {
      case 'sets':
      case 'add':
      case 'adds':
      case 'update':
      case 'updates':
      case 'remove':
      case 'removes':
      case 'addOrUpdate':
      case 'addOrUpdates':
        return 'writes'
      default: return 'reads'
    }
  }

  const runWithTimers = (state, reducer, what, args) => {
    let result
    const readOrWrite = getReadOrWrite(what)
    const multiple = what.endsWith('s')
    const action = multiple ? what.slice(0, -1) : what

    timers[readOrWrite][what] = Date.now()

    if (readOrWrite === 'writes') result = rerun(() => reducer(state, reducer[action](data[what])))
    else result = args !== undefined ? rerunSelectors(() => reducer[action === 'getById' ? 'get' : what](...args)(state)) : rerunSelectors(() => reducer[what](state))

    timers[readOrWrite][what] = Date.now() - timers[readOrWrite][what]
    timers[readOrWrite][what] = `${timers[readOrWrite][what] / (readOrWrite === 'writes' ? RERUN : RERUN_SELECTORS)}ms / op [${multiple ? LENGTH : 1}]`

    return result
  }

  it('should print perf', () => {
    let state
    timers.all = Date.now()

    // writes
    timers.writes.total = Date.now()
    // - init
    timers.writes.init = Date.now()
    const reducer = rerun(() => keyValue({ name: 'perf', key: 'code', defaultData: data.defaultData }))
    state = reducer()
    timers.writes.init = Date.now() - timers.writes.init
    timers.writes.init = `${timers.writes.init / RERUN}ms / op [1000]`
    // - writes
    state = runWithTimers(state, reducer, 'sets')
    state = runWithTimers(state, reducer, 'add')
    state = runWithTimers(state, reducer, 'adds')
    state = runWithTimers(state, reducer, 'update')
    state = runWithTimers(state, reducer, 'updates')
    state = runWithTimers(state, reducer, 'remove')
    state = runWithTimers(state, reducer, 'removes')
    state = runWithTimers(state, reducer, 'addOrUpdate')
    state = runWithTimers(state, reducer, 'addOrUpdates')
    // end writes tests
    timers.writes.total = Date.now() - timers.writes.total

    // reads
    timers.reads.total = Date.now()
    state = { perf: state }
    // - reads
    runWithTimers(state, reducer, 'getState')
    runWithTimers(state, reducer, 'getKeys')
    runWithTimers(state, reducer, 'getAsArray')
    runWithTimers(state, reducer, 'getLength')
    runWithTimers(state, reducer, 'isInitialized')
    runWithTimers(state, reducer, 'get', [])
    runWithTimers(state, reducer, 'getById', [19])
    runWithTimers(state, reducer, 'getByIds', [data.getByIds])
    runWithTimers(state, reducer, 'hasKey', [137])
    // - getBy
    // TODO:

    // end reads tests
    timers.reads.total = Date.now() - timers.reads.total

    // prints
    timers.all = Date.now() - timers.all
    console.log('results (ms):', JSON.stringify(timers, null, 2))
  })
})
