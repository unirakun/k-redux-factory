import resolve from 'rollup-plugin-node-resolve'
import uglify from 'rollup-plugin-uglify'
import babel from 'rollup-plugin-babel'

export default {
  entry: 'src/index.js',
  dest: 'lib/index.js',
  moduleName: 'trampss-redux-data-store',
  format: 'umd',
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**',
    }),
    uglify(),
  ],
}
