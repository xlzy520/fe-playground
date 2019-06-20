const test1 = [1, 1, 1, 1, 2, 2, 6, 8, 9]
const test2 = [1, 1, 1, 6, 6, 6, 8, 8, 9]
const test3 = [1, 1, 1, 6, 6, 6, 8, 8, 9]
const resMap = []
const counter = arrEleCounter(test1)
const keys = Object.keys(counter)
const values = Object.values(counter)
const Length = keys.length

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

console.log(arrEleCounter(test1))
console.log(resMap)
