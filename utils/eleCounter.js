/**
 * 统计数组中每个元素出现的次数，返回一个对象,使用Object.keys()获取去重后的数组，还需要将每个元素转为number型
 * @param arr
 * @returns Object
 */
export default function eleCounter(arr){
  var b={}
  for (let i = 0; i < arr.length; i++) {
    b[arr[i]] = (b[arr[i]] + 1) || 1
  }
  return b
}
