// 2、Promise拥有一个then方法，用以处理resolved或rejected状态下的值。
//
// then方法接收两个参数onFulfilled和onRejected，这两个参数变量类型是函数，如果不是函数将会被忽略，并且这两个参数都是可选的。
// then方法必须返回一个新的promise，记作promise2，这也就保证了then方法可以在同一个promise上多次调用。（ps：规范只要求返回promise，并没有明确要求返回一个新的promise，这里为了跟ES6实现保持一致，我们也返回一个新promise）
// onResolved/onRejected有返回值则把返回值定义为x，并执行[[Resolve]](promise2, x);
// onResolved/onRejected运行出错，则把promise2设置为rejected状态；
// onResolved/onRejected不是函数，则需要把promise1的状态传递下去。

const PENDING = 'pending', REJECTED = 'rejected', RESOLVED = 'resolve'

class MyPromise {
  status = PENDING
  data = ''
  
  // Promise resolve时的回调函数集
  onResolvedCallback = [];
  // Promise reject时的回调函数集
  onRejectedCallback = [];
  
  constructor(executor) {
    let that = this
    function resolve(value) {
      that.status = RESOLVED
      that.data = value
      for (const func of that.onResolvedCallback) {
        func(that.data)
      }
      console.log('resolve:', value);
    }
    function reject(reason) {
      that.status = REJECTED
      that.data = reason
      for (const func of that.onResolvedCallback) {
        func(that.data)
      }
    }
    
    try {
      executor(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }
  
  then(onResolved, onRejected){
    onResolved = typeof onResolved === 'function' ? onResolved: v=> v
    onRejected = typeof onRejected === 'function' ? onRejected: v=> v
    console.log('then');
    
    let newPromise = null
    
    newPromise = new MyPromise((resolve, reject)=>{
      if (this.status === RESOLVED) {
        setTimeout(()=>{
          try {
            const x = onResolved(this.data)
            this.resolvePromise(newPromise, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      }
  
      if (this.status === REJECTED) {
        setTimeout(()=>{
          try {
            const x = onRejected(this.data)
            this.resolvePromise(newPromise, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      }
      
      if (this.status === PENDING) {
        this.onResolvedCallback.push(() => {
          setTimeout(()=>{
            try {
              const x = onResolved(this.data)
              this.resolvePromise(newPromise, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0)
        })
        
        this.onRejectedCallback.push(() => {
          setTimeout(()=>{
            try {
              const x = onRejected(this.data)
              this.resolvePromise(newPromise, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0)
        })
        
      }
      
    })
    
    return newPromise
  
  }
  
  resolvePromise(promise2, x, resolve, reject) {
    console.log('x: ', x);
    let called = false
  
    if (promise2 === x) {
      return reject(new TypeError('Chaining cycle detected for promise!'))
    }
  
    // 如果x仍然为Promise的情况
    if (x instanceof Promise) {
      // 如果x的状态还没有确定，那么它是有可能被一个thenable决定最终状态和值，所以需要继续调用resolvePromise
      if (x.status === PENDING) {
        let that = this
        x.then(function (value) {
          that.resolvePromise(promise2, value, resolve, reject)
        }, reject)
      } else {
        x.then(resolve, reject)
      }
    }
  
    const isObject = Object.prototype.toString(x) === '[object Object]'
    const isFunctionObj = Object.prototype.toString(x) === '[object Function]'
  
    if (x!== null && ( isObject || isFunctionObj )) {
      try {
        // 因为x.then有可能是一个getter，这种情况下多次读取就有可能产生副作用，所以通过变量called进行控制
        const then = x.then
        // then是函数，那就说明x是thenable，继续执行resolvePromise函数，直到x为普通值
        if (typeof then === 'function') {
          then.call(x, y=> {
            if (called) {
              return;
            }
            called = true
            this.resolvePromise(promise2, y, resolve, reject)
          }, r=> {
            if (called) {
              return;
            }
            called = true
            this.resolvePromise(promise2, r, resolve, reject)
          })
        } else {
          // 如果then不是函数，那就说明x不是thenable，直接resolve x
          if (called) return;
          called = true;
          resolve(x);
        }
      } catch (e) {
        if (called) return;
        called = true;
        reject(e);
      }
    } else {
      resolve(x)
    }
    
  }
}

module.exports = MyPromise;
