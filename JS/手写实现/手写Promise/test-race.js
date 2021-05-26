// Promise.race方法接收一个promise数组, 返回一个新promise2，顺序执行数组中的promise，
// 有一个promise状态确定，promise2状态即确定，并且同这个promise的状态一致。
// 即，只要有一个成功，这个promise就是成功的

const MyPromise = require('./race')

const promises = [
  new MyPromise((resolve, reject)=>{
    setTimeout(()=>{
      console.log('timeout start 500');
      reject(1)
    }, 500)
  }),
  new MyPromise((resolve, reject)=>{
    setTimeout(()=>{
      console.log('timeout start 1000');
      resolve(1)
    }, 1000)
  })
]


MyPromise.race(promises).then(res=> {
  console.log('then:', res);
}).catch(err=>{
  console.log('catch reject:', err);
}).finally(() => {
  console.log('finally:');
})
