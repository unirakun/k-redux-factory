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
  input: pkg['jsnext:main'] || 'src/helpers.js',
  output: {
    file: path.resolve('helpers', pkg.main),
    sourcemap: path.resolve('helpers', pkg.main),
    name: pkg.amdName || pkg.name,
    format: process.env.FORMAT || 'umd',
    external,
  },
  plugins: [
    babel(),
    commonjs({
      include: 'node_modules/**',
    }),
    uglify(),
  ],
}
