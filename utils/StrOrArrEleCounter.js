/**
 * 统计数组中每个元素出现的次数，返回一个对象,使用Object.keys()获取去重后的数组，还需要将每个元素转为number型
 * @param arr
 * @returns Object
 */
export default function arrEleCounter(arr){
  var b={}
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
export function strEleCounter(str) {
  return str.replace(/(\w)\1*/g,(reg,c)=>reg.length+c)  // \w匹配字母  \1匹配出现第一个一样的数组重复一次
}
