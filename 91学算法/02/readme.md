【基础篇 - Day 02】 2021-02-02 - 821. 字符的最短距离（01. 数组 ）

入选理由
仍然是一道简单题，不过比昨天的题目难度增加一点
虽然这是一个字符串的题目，但其实字符串和数组没有本质差别，这在讲义中也提到了。
题目描述
给定一个字符串 S 和一个字符 C。返回一个代表字符串 S 中每个字符到字符串 S 中的字符 C 的最短距离的数组。

示例 1:

输入: S = "loveleetcode", C = 'e'
输出: [3, 2, 1, 0, 1, 0, 0, 1, 2, 2, 1, 0]
说明:

- 字符串 S 的长度范围为 [1, 10000]。
- C 是一个单字符，且保证是字符串 S 里的字符。
- S 和 C 中的所有字母均为小写字母。



### 思路
先拆分字符串，将匹配的e替换为0，中间的字符串放在一起。如`[ 0, 'lov', 0, 'l', 0, 0, 'tcod', 0, 'aa', 0, 'aaa', 0 ]`。
然后判断是头或者尾，再对每个非0字符串进行判断是奇数还是偶数，再算距离

### 代码
```js
function solution(S = '', C = '') {
  const len = S.length
  const arr = []
  let str = ''
  for (let i = 0; i < len; i++) {
    if (S[i]!==C) {
      str += S[i]
    } else {
      if (str) {
        arr.push(str)
      }
      arr.push(0)
      str = ''
    }
    if (i === len - 1 && S[i]!==C) {
      arr.push(str)
    }
  }
  let result = []
  arr.forEach((value, index) => {
    if (value) {
      const isLeft = index === 0
      const isRight = index === arr.length - 1
      const valueLen = value.length
      let distance = 0
      const middle = Math.ceil(valueLen / 2)
      for (let i = 0; i < valueLen; i++) {
        if (isLeft || isRight) {
          distance = isLeft ? valueLen - i : i + 1
        } else {
          const isEven = valueLen % 2 === 0
          const rightValue = isEven ? 2 * middle - i : i - middle + 1
          distance = i < middle ? i + 1 : rightValue
        }
        result.push(distance)
      }
    } else {
      result.push(0)
    }
  })
  return result
}
```

### 复杂度分析

时间复杂度：O(N)，其中 N 为数组长度。
空间复杂度：O(N)
