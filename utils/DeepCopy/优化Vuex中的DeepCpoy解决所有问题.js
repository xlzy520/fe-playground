function find(list, f) {
  return list.filter(f)[0]
}

/**
 * 来自Vuex源码中的deepCopy方法
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */
function vuexDeepCpoy(obj, cache) {
  if (cache === void 0) cache = []
  
  // just return if obj is immutable value
  const Constructor = obj.constructor
  // typeof null的返回值为object，所以可以直接省略
  if (typeof obj !== 'object') {
    return obj
  } else if (Constructor === RegExp) {
    return new Constructor(obj)
  } else if (Constructor === Date) {
    return new Constructor(obj.getTime())
  }
  
  // if obj is hit, it is in circular structure
  var hit = find(cache, function(c) { return c.original === obj })
  if (hit) {
    return hit.copy
  }
  
  var copy = Array.isArray(obj) ? [] : {}
  // put the copy into cache at first
  // because we want to refer it in recursive deepCopy
  cache.push({
    original: obj,
    copy: copy
  })
  
  Object.keys(obj).forEach(function(key) {
    copy[key] = vuexDeepCpoy(obj[key], cache)
  })
  
  return copy
}


const obj1 = {x: 1}
const obj2 = {x: 2}
obj1.next = obj2;
obj2.next = obj1;
obj1.fn = function add() {
  return 's'
}
obj1.reg = /\s+/g
obj1.time = new Date()
const obj3 = vuexDeepCpoy(obj1);
console.log(obj1)
console.log(obj2)
console.log(obj3)
// 需要处理函数 ， 时间 ， 正则 和循环引用
