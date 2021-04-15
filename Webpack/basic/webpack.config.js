const path = require('path');

module.exports = {
  // entry: './helloworld.js', // 单入口
  entry: ['./helloworld.js', './helloworld1.js'], // 多入口合并打包成一个文件
  output:{
    filename:'[name]-[hash].js',
    path: path.resolve(__dirname,'dist')
  },
};
