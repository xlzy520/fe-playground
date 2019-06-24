/**
 * 寻常递归复制属性到一个新的数组或者对象
 * @param o
 * @returns {*}
 */
function deepCopy(o) {
  if (o instanceof Array) { // 先判断Array
    var n = []
    for (var i = 0; i < o.length; ++i) {
      n[i] = deepCopy(o[i])
    }
    return n
  } else if (o instanceof Object) {
    var n = {}
    for (var i in o) {
      n[i] = deepCopy(o[i])
    }
    return n
  } else {
    return o
  }
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
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
function deepCopyV(obj, cache) {
  if (cache === void 0) cache = []

  // just return if obj is immutable value
  if (obj === null || typeof obj !== 'object') {
    return obj
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
    copy[key] = deepCopy(obj[key], cache)
  })

  return copy
}

/**
 * forEach for object
 */

// Credits: borrowed code from fcomb/redux-logger
/*
## 为什么需要DeepCopy

在JS里，除Array和Object之外的数据类型的复制可以直接通过等号=来实现，
但Array和Object类型的数据通过等号只是起引用作用，指向的是同一块内存地址。
当源数据改变，引用的数据也同时会发生变化。
*/

module.exports = {
  deepCopy, deepCopyV
}
