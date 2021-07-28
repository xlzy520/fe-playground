const MyPromise = require('./catch')

const promise = new Promise((resolve, reject)=>{
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

const fn = num=>{
  return new Promise((resolve, reject)=>{
      if (typeof num === 'number') {
        resolve(num)
      } else {
        reject(num)
      }
  })
}

fn('a').then(res=> {
  console.log(res);
}).catch(err=>{
  console.log(err);
})

fn('b').then(res=> {
  console.log(res);
},err=>{
  console.log(err);
})

fn(123).then(res=> {
  console.log(res);
}).catch(err=>{
  console.log(err);
})

fn('c').then(res=> {
  console.log(res);
}).catch(err=>{
  console.log(err);
})

console.log(777);


// fn('345-1').then(res=> {
//   console.log(res);
// }).catch(err=>{
//   console.log(err);
// })





//   .then(res=>{
//   console.log(222);
//   return 333
// }).then(res=>{
//   console.log(res)
// })
