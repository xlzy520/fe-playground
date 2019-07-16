/**
 *  给定一个数组，数组中任意数量1-9的数，可以组合成10的方案有多少个
 */
const test1 = [1, 1, 1, 1, 2, 2, 3, 4, 5, 5, 6, 8, 9]
const target = 9
const resMap = []
const counter = arrEleCounter(test1)
peer(counter, target, '')
const removeDuplicateResult = resMap.map(allItem => allItem.split('+').map(removeDuplicateItem => Number(removeDuplicateItem)).sort().join('+'))
const mySet = new Set(removeDuplicateResult)

console.log('各个数字出现的个数:', counter)
console.log('大于5的只显示一次')
console.log('未去重结果详情:', resMap)
console.log('未去重结果个数:', resMap.length)
console.log('去重之后的结果详情:', mySet)
console.log('去重之后的结果个数:', mySet.size)

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

function arrEleCounter(arr) {
  var b = {}
  for (let i = 0; i < arr.length; i++) {
    b[arr[i]] = (b[arr[i]] + 1) || 1
    // 大于5的数 个数已经没有意义了
    if (arr[i] > 5) {
      b[arr[i]] = 1
    }
  }
  return b
}

function peer(obj, num, str) {
  for (const item in obj) {
    const item_num = Number(item)// string转为number
    if (item_num < (num + 1) / 2) {
      for (let i = 1; i < obj[item] + 1; i++) {
        const diff = num - item_num * i
        if (diff <= 0) {
          return false
        }
        const restObj = deepCopy(obj)
        restObj[item] = restObj[item] - i
        if (restObj[item] === 0) {
          delete restObj[item]
        }
        const obj_keys = Object.keys(restObj)
        if (obj_keys.includes(diff.toString())) {
          const compression = `${str}${item}+${diff}`
          if (eval(compression) === target) {
            if (compression.substr(0, 1) > 1 && compression.substr(2, 1) < 5) {
              return false
            }
            resMap.push(compression)
            peer(restObj, diff, `${str}${item}+`)
          }
        } else {
          delete restObj[item]
          peer(restObj, diff, `${str}${item}+`)
        }
      }
    }
  }
}
