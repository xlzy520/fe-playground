// 209. 长度最小的子数组
// 给定一个含有 n 个正整数的数组和一个正整数 s ，找出该数组中满足其和 ≥ s 的长度最小的 连续 子数组，并返回其长度。如果不存在符合条件的子数组，返回 0。
//
//
//
// 示例：
//
// 输入：s = 7, nums = [2,3,1,2,4,3]
// 输出：2
// 解释：子数组 [4,3] 是该条件下的长度最小的子数组。
//
//
// 进阶：
//
// 如果你已经完成了 O(n) 时间复杂度的解法, 请尝试 O(n log n) 时间复杂度的解法。

/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function(target, nums) {
  let left = 0;
  let total = 0;
  let right = 0;
  let len = nums.length
  let res = len+1
  while (right< len){
    total += nums[right]
    while (total>=target){
      res = Math.min(res, right-left+1)
      total -= nums[left]
      left++
    }
    right++
  }
  return res === len+1? 0 : res
};
const ans = minSubArrayLen(7, [2,3,1,2,4,3])
console.log(ans);
