const MyPromise = require('./finally')

const promise = new MyPromise((resolve, reject)=>{
  console.log('start');
  
  setTimeout(()=>{
    console.log('timeout start');
    reject('reject 123')
  }, 500)
})


promise.then(res=> {
  console.log('then:', res);
}).catch(err=>{
  console.log('catch reject:', err);
}).finally(() => {
  console.log('finally:');
})
