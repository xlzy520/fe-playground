// 643. 子数组最大平均数 I
// 给定 n 个整数，找出平均数最大且长度为 k 的连续子数组，并输出该最大平均数。
//
//
//
// 示例：
//
// 输入：[1,12,-5,-6,50,3], k = 4
// 输出：12.75
// 解释：最大平均数 (12-5-6+50)/4 = 51/4 = 12.75
//
//
// 提示：
//
// 1 <= k <= n <= 30,000。
// 所给数据范围 [-10,000，10,000]。

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findMaxAverage = function(nums, k) {
  let len = nums.length
  let total = 0
  let temp = 0
  if (len>=k) {
    for (let i = 0; i < k; i++) {
      total += nums[i]
    }
    temp = total
    for (let i = k; i < len; i++) {
      temp = temp-nums[i-k]+nums[i]
      if (temp > total) {
        total = temp
      }
    }
  }
  console.log(total / k);
  return total / k
};

// const res = findMaxAverage([4, 2, 1, 3, 3], 2)
// const res = findMaxAverage([0, 4, 0, 3, 2], 1)
const res = findMaxAverage([1,12,-5,-6,50,3], 4)
console.log(res);

