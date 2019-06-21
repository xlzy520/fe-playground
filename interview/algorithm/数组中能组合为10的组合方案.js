const test1 = [1, 1, 1, 1, 2, 2, 3, 4, 6, 8, 9]
const test2 = [1, 1, 1, 6, 6, 6, 8, 8, 9]
const test3 = [1, 1, 1, 6, 6, 6, 8, 8, 9]
const resMap = []
const counter = arrEleCounter(test1)

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

}
peer(counter, 10, '')
console.log(counter)
console.log(resMap)
console.log(resMap.length)
console.log([28, 46, 19, 1234, 136, 118, 11224, 11134, 111223, 11116])
