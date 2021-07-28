// 1、Promise有三种状态pending，fulfilled和rejected。（为了一致性，此文章称fulfilled状态为resolved状态）
//
// 状态转换只能是pending到resolved或者pending到rejected；
// 状态一旦转换完成，不能再次转换。

const PENDING = 'pending', REJECTED = 'rejected', RESOLVED = 'resolve'

class MyPromise {
  status = PENDING
  data = ''
  constructor(executor) {
    let that = this
    function resolve(value) {
      that.status = RESOLVED
      that.data = value
      console.log('resolve:', value);
    }
    function reject(reason) {
      that.status = REJECTED
      that.data = reason
    }
    
    try {
      executor(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }
}

module.exports = MyPromise;
