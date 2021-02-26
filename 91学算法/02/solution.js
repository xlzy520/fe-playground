function solution(S= 'eloveleetcodeaaeaaae', C = 'e') {
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

solution()

module.exports = {
  solution: solution
}
