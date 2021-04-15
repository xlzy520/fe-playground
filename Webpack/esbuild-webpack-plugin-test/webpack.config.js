const path = require('path');
const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')
const ESBuildPlugin = require('esbuild-webpack-plugin').default;


module.exports = {
  entry: ['/index.js'],
  output:{
    filename:'[name]-[hash].js',
    path: path.resolve(__dirname,'dist')
  },
  plugins: [
    new htmlWebpackPlugin({
      filename: "index.html",
      template: "index.html",
      inject: "head",
      title: "Webpack App",
      date: new Date(),
      BASE_URL: 'dds'
    })
  ]
};
