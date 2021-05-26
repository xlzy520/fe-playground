const MyPromise = require('./catch')


const promise = new MyPromise((resolve, reject)=>{
  console.log('start');
  
  setTimeout(()=>{
    console.log('timeout start');
    reject('reject 123')
  }, 500)
  // setTimeout(()=>{
  //   console.log(222);
  //   reject(222)
  // }, 1000)
})


promise.then(res=> {
  console.log('then:', res);
}).catch(err=>{
  console.log('catch reject:', err);
})
//   .then(res=>{
//   console.log(222);
//   return 333
// }).then(res=>{
//   console.log(res)
// })
