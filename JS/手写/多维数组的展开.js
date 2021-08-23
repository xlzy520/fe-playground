const flat = (arr)=> {
  if (!Array.isArray(arr)) {
    throw new Error('不是一个数组')
  }
  let ans = []
  arr.forEach(v=> {
    if (Array.isArray(v)) {
      ans = ans.concat(flat(v))
    } else {
      ans.push(v)
    }
  })
  return ans
}

console.log(flat([1, [2, 3], [1,[2,[3]]]]));


const myinstanceof = (left, right)=> {
  let leftP = left.__proto__
  let rightP = right.prototype
  while (true){
    if (leftP === null) {
      return false
    }
    if (leftP === rightP) {
      return true
    }
    leftP = leftP.__proto__
  }
}


console.log(myinstanceof([1], Array));
