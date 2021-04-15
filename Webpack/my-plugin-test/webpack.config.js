const path = require('path');
const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')
const ESBuildPlugin = require('esbuild-webpack-plugin').default;

const mode = true ? 'production': 'development'


module.exports = {
  mode: mode,
  entry: ['/index.js'],
  output:{
    filename:'[name]-[hash].js',
    path: path.resolve(__dirname,'dist')
  },
  optimization: {
    minimizer: [
      new ESBuildPlugin(),
    ]
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      { test: /\.css$/, use: ['style-loader','css-loader'] },
    ]
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
