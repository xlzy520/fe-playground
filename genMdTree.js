const fs = require('fs');
const main = require('md-file-tree/main')


const config = {
  ignore: ['Webpack', 'PostCSS'],
  prefix: '.html'
}

fs.writeFile('list.md', main(config), (err,data)=> {
  console.log(err, data);
})
