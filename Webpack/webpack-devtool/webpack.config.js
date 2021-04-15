const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin')
const devtools = ['eval', 'source-map', 'eval-source-map']
const devtool = devtools[2]

module.exports = {
  entry: ['/index.js'],
  mode: "development",
  devtool: devtool,
  output:{
    filename:`${devtool}-[name]-[hash].js`,
    path: path.resolve(__dirname,'dist')
  },
  plugins: [
    new htmlWebpackPlugin({
      filename: "index.html",
      template: "index.html",
      inject: "head",
      title: "Webpack App",
    })
  ]
};
