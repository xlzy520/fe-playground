function fun(n, o) {
  console.log(o)
  return {
    fun: function(m) {
      return fun(m, n)
    }
  }
}
var a = fun(0); a.fun(1); a.fun(2); a.fun(3)// undefined,?,?,?
var b = fun(0).fun(1).fun(2).fun(3)// undefined,?,?,?
var c = fun(0).fun(1); c.fun(2); c.fun(3)// undefined,?,?,?
// 问:三行a,b,c的输出分别是什么？

// 闭包用法
function getResources(fn) {
  const cache = []
  for (let i = 0; i < 6; i++) {
    cache.push(i)
  }
  return fn(cache)
}

getResources(function(arr) {
  console.log(arr)
})

// 只允许函数执行一次
function once(fn) {
  var called = false
  return function() {
    if (!called) {
      called = true
      // fn.apply(this, arguments)
      fn.call(this, ...arguments)
    }
  }
}

const ss = once(function(sss) {
  console.log(sss + 1)
})
ss(5)
ss(4)
