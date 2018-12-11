// all方法的效果实际上是「谁跑的慢，以谁为准执行回调」，那么相对的就有另一个方法「谁跑的快，以谁为准执行回调」，这就是race方法
// 请求某个图片资源
let axios = require('axios')
function getNumber () {
  const promiseT = new Promise((resolve, reject) => {
    setTimeout(function () {
      const randomNumber = Math.ceil(Math.random() * 10)
      if (randomNumber <= 5) {
        resolve(randomNumber)
      } else {
        reject('数字大于5')
      }
    }, 10000)
  })
  return promiseT
}

getNumber().then(function (data) {
  console.log('resolved')
  console.log(data)
}).catch(function (reason) {
  console.log('rejected')
  console.log(reason)
})

function runAsync1 () {
  const p = new Promise(function (resolve, reject) {
    // 做一些异步操作
    setTimeout(function () {
      console.log('异步任务1执行完成')
      resolve('随便什么数据1')
    }, 1000)
  })
  return p
}
function runAsync2 () {
  const p = new Promise(function (resolve, reject) {
    // 做一些异步操作
    setTimeout(function () {
      console.log('异步任务2执行完成')
      resolve('随便什么数据2')
    }, 2000)
  })
  return p
}

function runAsync3 () {
  const p = new Promise(function (resolve, reject) {
    // 做一些异步操作
    setTimeout(function () {
      console.log('异步任务3执行完成')
      resolve('随便什么数据3')
    }, 2000)
  })
  return p
}
Promise.all([runAsync1(), runAsync2(), runAsync3()]).then(function (res) {
  console.log(res)
})
function requestImg () {
  const p = new Promise(function (resolve, reject) {
    axios.get('https://xlzy520.cn/images/21.gif').then(data => {
      console.log(data)
    })
  })
  return p
}

// 延时函数，用于给请求计时
function timeout () {
  const p = new Promise(function (resolve, reject) {
    setTimeout(function () {
      reject('图片请求超时')
    }, 5000)
  })
  return p
}

Promise
  .race([requestImg(), timeout()])
  .then(function (results) {
    console.log(results)
  })
  .catch(function (reason) {
    console.log(reason)
  })
