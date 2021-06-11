const postcss = require('postcss')
const rename = require('./my-rename')
const fs = require('fs')

fs.readFile('./test.css', (err, css) => {
  postcss([rename({ 'w': 'a' })])
    .process(css, { from: './test.css', to: './test1.css' })
    .then(result => {
      fs.writeFile('./test1.css', result.css, () => true)
      if (result.map) {
        fs.writeFile('./test1.css.map', result.map.toString(), () => true)
      }
    })
})
