// 入选理由
// 第一个 hard 题
// 这是一个哈希表的题目，也可使用栈来优化。
// 题目描述
// 这个问题和“最多能完成排序的块”相似，但给定数组中的元素可以重复，输入数组最大长度为2000，其中的元素最大为10**8。
//
// arr是一个可能包含重复元素的整数数组，我们将这个数组分割成几个“块”，并将这些块分别进行排序。之后再连接起来，使得连接的结果和按升序排序后的原数组相同。
//
// 我们最多能将数组分成多少块？
//
// 示例 1:
//
// 输入: arr = [5,4,3,2,1]
// 输出: 1
// 解释:
// 将数组分成2块或者更多块，都无法得到所需的结果。
// 例如，分成 [5, 4], [3, 2, 1] 的结果是 [4, 5, 1, 2, 3]，这不是有序的数组。
// 示例 2:
//
// 输入: arr = [2,1,3,4,4]
// 输出: 4
// 解释:
// 我们可以把它分成两块，例如 [2, 1], [3, 4, 4]。
// 然而，分成 [2, 1], [3], [4], [4] 可以得到最多的块数。
// 注意:
//
// arr的长度在[1, 2000]之间。
// arr[i]的大小在[0, 10**8]之间。

/**
 *
 * @param arr
 * @return {number}
 */
var maxChunksToSorted1 = function(arr = []) {
  let count = 0
  const sortedArr = [...arr].sort((a,b)=>(a-b))
  let sum1 = 0, sum2 = 0;
  for (let i = 0; i < arr.length; i++) {
    sum1 += arr[i]
    sum2 += sortedArr[i]
    if (sum1 === sum2) {
      count++
      sum1 = 0
      sum2 = 0
    }
  }
  console.log(count);
  return count
};
/**
 * 思路：创建一个排序好的数组，循环遍历，如果原数组前面n个数相加排序后的前n个数之和相等，
 * 那么说明他们是最小单元的可以无脑冲的排序的快
 */



// 思路：利用辅助栈解决，新建一个栈，栈中每一个元素表示一个块的最大值，最后栈中有多少元素即可分成多少块。
// 遍历数组，如果栈为空则添加元素。
// 如果当前数值大于等于栈的顶部元素，则直接添加
// 如果当前数值小于栈的顶部元素，则将栈顶元素pop出并保存，然后依次判断当前数值是否小于栈顶元素，如果小于则继续pop直到栈为空或者栈顶元素小于等于当前数值
var maxChunksToSorted = function(arr = []) {
  const stack = []
  for (let i = 0; i < arr.length; i++) {
    if (!stack.length || arr[i]>= stack[stack.length - 1]) {
      stack.push(arr[i])
    } else {
      let top = stack.pop()
      while (stack[stack.length - 1]> arr[i]){
        stack.pop()
      }
      stack.push(top)
    }
    
  }
  // const sortedArr = [...arr].sort((a,b)=>(a-b))
  // let sum1 = 0, sum2 = 0;
  // for (let i = 0; i < arr.length; i++) {
  //   sum1 += arr[i]
  //   sum2 += sortedArr[i]
  //   if (sum1 === sum2) {
  //     count++
  //     sum1 = 0
  //     sum2 = 0
  //   }
  // }
  console.log(stack);
  console.log(stack.length);
  // console.log(count);
  return stack.length
};



maxChunksToSorted([2,1,3,4,4])
maxChunksToSorted([5,4,3,2,1])
maxChunksToSorted([8,18,3,5,3,6,9,16,4,11,22,32,23,24,30,29,35,22,24,33])
maxChunksToSorted([0,0,1,1,1])


// const columns = [
//   { prop: 'a', label: '严重程度' },
//   { prop: 'b', label: 'b' },
//   { prop: 'c', label: 'c' },
// ]
//
// const tableData = [
//   {  a: '不严重', b: 'test', c: 'test1' },
//   {  a: '严重', b: 'test', c: 'test1' },
//   {  a: '严重1', b: 'test', c: 'test1' },
//   {  a: '严重2', b: 'test', c: 'test1' },
// ]
//
// const props = tableData.map(value => value.a)
// const keys = Object.keys(tableData[0])
// const target = keys.findIndex(value => value === 'a')
// if (target > -1) {
//   keys.splice(target, 1)
// }
// const newTableData = keys.map(key => {
//   const obj = {}
//   props.forEach((p, index)=> {
//     obj[p] = tableData[index][key]
//   })
//   return obj
// })
// console.log(newTableData);
