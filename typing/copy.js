const fs = require('fs')

fs.copyFile('typing/index.d.ts', 'dist/index.d.ts', (err) => {
  // eslint-disable-next-line no-console
  if (err) console.error('unable to copy typing file to the dist directory', err)
})
