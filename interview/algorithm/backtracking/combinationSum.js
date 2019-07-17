/***
 * 从给定有序数组中选取任意个数(可重复)，使其和为给定值
 */
var Solution = /** @class */ (function () {
    function Solution(candidates, target) {
        this.candidates = candidates;
        this.target = target;
        this.res = [];
    }
    Solution.prototype.combinationSum = function () {
        this.helper(this.candidates, this.target, [], 0);
        console.log(this.res);
        // todo 为什么res最终是[[],[],[],[],[],[],[],[],[],[],[]]
        return this.res;
    };
    Solution.prototype.helper = function (candidates, target, list, index) {
        if (target < 0) {
            return;
        }
        if (target === 0) {
            console.log(list);
            this.res.push(list);
            return;
        }
        for (var i = index; i < candidates.length; i++) {
            if (candidates[i] <= target) {
                var kk = target - candidates[i];
                if (kk < 0)
                    continue;
                list.push(candidates[i]);
                this.helper(candidates, kk, list, i);
                list.pop();
            }
        }
    };
    return Solution;
}());
var test = new Solution([1, 2, 3, 4, 5, 6], 10);
var res = test.combinationSum();
console.log(res);
