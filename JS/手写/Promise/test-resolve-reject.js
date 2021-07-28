// 本质上这俩方法就是为了更方便的创建 promise...

const MyPromise = require('./resolve-reject')

const test = new MyPromise((resolve, reject)=>{
  setTimeout(()=>{
    resolve('test')
  }, 500)
})

test.then(res=> {
  console.log(res);
})


MyPromise.resolve(123).then(res=> {
  console.log('then:', res);
}).catch(err=>{
  console.log('catch reject:', err);
}).finally(() => {
  console.log('finally:');
})


MyPromise.reject(321).then(res=> {
  console.warn('then:', res);
}).catch(err=>{
  console.warn('catch reject:', err);
}).finally(() => {
  console.warn('finally:');
})
