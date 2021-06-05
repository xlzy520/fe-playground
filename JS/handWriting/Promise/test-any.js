// 即使第一个返回的 promise 是失败的，Promise.any() 依然使用第一个成功状态的 promise 来返回。
// 这与使用首个（无论 rejected 还是 fullfiled）promise 来返回的 Promise.race() 相反。

const MyPromise = require('./any')

const pErr = new MyPromise((resolve, reject) => {
  reject("总是失败");
});

const pSlow = new MyPromise((resolve, reject) => {
  setTimeout(resolve, 500, "最终完成");
});

const pFast = new MyPromise((resolve, reject) => {
  setTimeout(resolve, 100, "很快完成");
});

MyPromise.any([pErr, pSlow, pFast]).then((value) => {
  console.log('最终结果：', value);
  // pFast fulfils first
})
