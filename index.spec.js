import commonTests from './misc/common-tests'
import * as libES from './dist/index.es'
import * as libCJS from './dist/index'

// commonTests(libES, 'es version')
commonTests(libCJS, 'cjs version')
