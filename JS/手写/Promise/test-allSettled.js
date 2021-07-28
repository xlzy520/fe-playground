
// Promise.allSettled应传入一个数组，数组对象均为Promise对象，当Promise.all中，
// 所有的promise对象均出现结果后才会执行.allSettled中的.then回调
const MyPromise = require('./allSettled')

const promises = [
  new MyPromise((resolve, reject)=>{
    setTimeout(()=>{
      console.log('timeout start 500');
      resolve(1)
    }, 500)
  }),
  new MyPromise((resolve, reject)=>{
    setTimeout(()=>{
      console.log('timeout start 1000');
      resolve(1)
    }, 1000)
  })
]


MyPromise.all(promises).then(res=> {
  console.log('then:', res);
}).catch(err=>{
  console.log('catch reject:', err);
}).finally(() => {
  console.log('finally:');
})
