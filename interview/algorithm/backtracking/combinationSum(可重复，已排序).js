/***
 * 从给定有序数组中选取任意个数(可重复)，使其和为给定值
 */
class Solution {
    constructor(candidates, target) {
        this.candidates = candidates;
        this.target = target;
        this.res = [];
    }
    combinationSum() {
        this.helper(this.candidates, this.target, [], 0);
        return this.res;
    }
    helper(candidates, target, list, index) {
        if (target < 0) {
            return;
        }
        if (target === 0) {
            /***
             *  为什么res最终是[[],[],[],[],[],[],[],[],[],[],[]]？
             *  因为没有DeepCopy list，所以在循环中被pop和push更改了
             */
            this.res.push(JSON.parse(JSON.stringify(list)));
            return;
        }
        for (let i = index; i < candidates.length; i++) {
            if (candidates[i] <= target) {
                let kk = target - candidates[i];
                if (kk < 0)
                    continue;
                list.push(candidates[i]);
                this.helper(candidates, kk, list, i);
                list.pop();
            }
        }
    }
}
const test = new Solution([1, 2, 3], 10);
const res = test.combinationSum();
console.log(res);
