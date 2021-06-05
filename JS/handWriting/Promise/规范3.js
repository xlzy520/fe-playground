// 3、不同的promise实现可以的交互。
//
// 规范中称这一步操作为promise解决过程，函数标示为[[Resolve]](promise, x)，promise为要返回的新promise对
// 象，x为onResolved/onRejected的返回值。如果x有then方法且看上去像一个promise，我们就把x当成一个promise的
// 对象，即thenable对象，这种情况下尝试让promise接收x的状态。如果x不是thenable对象，就用x的值来执行 promise。
// [[Resolve]](promise, x)函数具体运行规则：
//
// 如果 promise 和 x 指向同一对象，以 TypeError 为据因拒绝执行 promise;
// 如果 x 为 Promise ，则使 promise 接受 x 的状态;
// 如果 x 为对象或者函数，取x.then的值，如果取值时出现错误，则让promise进入rejected状态，如果then不是函数，
// 说明x不是thenable对象，直接以x的值resolve，如果then存在并且为函数，则把x作为then函数的作用域this调用，
// then方法接收两个参数，resolvePromise和rejectPromise，如果resolvePromise被执行，则以resolvePromise
// 的参数value作为x继续调用[[Resolve]](promise, value)，直到x不是对象或者函数，如果rejectPromise被执行
// 则让promise进入rejected状态；
// 如果 x 不是对象或者函数，直接就用x的值来执行promise。

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
