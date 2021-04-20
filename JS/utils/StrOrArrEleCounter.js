/**
 * 统计数组中每个元素出现的次数，返回一个对象,使用Object.keys()获取去重后的数组，还需要将每个元素转为number型
 * @param arr
 * @returns Object
 */
function arrEleCounter(arr) {
  var b = {}
  for (let i = 0; i < arr.length; i++) {
    b[arr[i]] = (b[arr[i]] + 1) || 1
  }
  return b
}

/**
 * 返回String中重复出现的元素以及次数
 * @param str   if('aabbcc11')
 * @returns {*}  return 2a2b2c21
 */
function strEleCounter(str) {
  return str.replace(/(\w)\1*/g, (reg, c) => reg.length + c) // \w匹配字母  \1匹配出现第一个一样的数组重复一次
}

function ArrayUnique1(arr) {
  if (!(arr instanceof Array)) return
  console.log(Object.prototype.toString.call(arr))
  const temp = []
  arr.map((a, index) => {
    if (arr.indexOf(a) === index) {
      temp.push(a)
    }
  })
  return temp
}

function ArrayUnique2(arr) {
  return arr.reduce((prev, cur) => {
    prev.indexOf(cur) === -1 && prev.push(cur)
    return prev
  }, [])
}

console.log(ArrayUnique1([1, 2, 2, 2, 3, 3, 8, 8, null]))
