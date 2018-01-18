import path from 'path'
import fs from 'fs'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import uglify from 'rollup-plugin-uglify'

const pkg = JSON.parse(fs.readFileSync('./package.json'))
const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
]

export default {
  input: pkg['jsnext:main'] || 'src/index.js',
  output: {
    file: pkg.main,
    sourcemap: path.resolve(pkg.main),
    name: pkg.amdName || pkg.name,
    format: process.env.FORMAT || 'umd',
    globals: {
      lodash: '_',
    },
  },
  plugins: [
    commonjs({
      include: 'node_modules/**',
    }),
    babel(),
    uglify(),
  ],
  external,
}
