const MyPromise = require('./all')

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
