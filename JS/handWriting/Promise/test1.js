const MyPromise = require('./规范1')


const promise = new MyPromise((resolve, reject)=>{
  console.log('start');
  
  setTimeout(()=>{
    console.log('timeout start');
    resolve('resolve')
  }, 1000)
  // setTimeout(()=>{
  //   console.log(222);
  //   reject(222)
  // }, 1000)
})
