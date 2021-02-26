// 给你一个长度为 n 的整数数组，请你判断在 最多 改变 1 个元素的情况下，该数组能否变成一个非递减数列。
//
// 我们是这样定义一个非递减数列的： 对于数组中所有的 i (0 <= i <= n-2)，总满足 nums[i] <= nums[i + 1]。
//
//  
//
// 示例 1:
//
// 输入: nums = [4,2,3]
// 输出: true
// 解释: 你可以通过把第一个4变成1来使得它成为一个非递减数列。
// 示例 2:
//
// 输入: nums = [4,2,1]
// 输出: false
// 解释: 你不能在只改变一个元素的情况下将其变为非递减数列。
//
// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/non-decreasing-array
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var checkPossibility = function(nums) {
  let num = 0
  if (nums.length>1 ) {
    if (nums[1]>nums[0]) {
    
    } else {
      num = 1
    }
    nums[0] = - 100 * 1000
  }
  for (let i = 0; i < nums.length-1; i++) {
    if (nums[i]>nums[i+1]) {
      nums[i+1] = nums[i]
      num++
    } else {
    
    }
  }
  console.log(num);
  return num<=1
};
console.log(checkPossibility([3, 4, 2, 3]));
console.log(checkPossibility([4, 2, 3]));
console.log(checkPossibility([4, 2, 1]));
console.log(checkPossibility([-1, 4, 2, 3]));
