/***
 * 从给定有序数组中选取任意个数(可重复)，使其和为给定值
 */
class Solution1 {
  candidates: number[];
  target: number;
  res: number[][];
  constructor(candidates: number[], target: number){
    this.candidates = candidates
    this.target = target
    this.res = []
  }
  public combinationSum():number[][]{
    this.helper(this.candidates, this.target, [],0)
    return this.res
  }
  private helper(candidates: number[],target: number,list: number[],index: number){
    if (target<0){
      return;
    }
    if (target===0){
      /***
       *  为什么res最终是[[],[],[],[],[],[],[],[],[],[],[]]？
       *  因为没有DeepCopy list，所以在循环中被pop和push更改了
       */
      if (this.res.findIndex(v=> v.join('') === list.join('')) === -1) {
        this.res.push(JSON.parse(JSON.stringify(list)))
      }
      return;
    }
    for (let i = index; i < candidates.length; i++) {
      if (candidates[i]<=target){
        let kk = target- candidates[i]
        if (kk<0) continue;

        list.push(candidates[i])
        this.helper(candidates, kk,list,i+1)
        list.pop()
      }
    }
  }
}

const test1 = new Solution1([1,2,3,3,3,4,4,5,5,6,8], 10)
const res1 = test1.combinationSum()
console.log(res1);
