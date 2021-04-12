const quickSort = (arr)=>{
  if (arr.length < 2) {
    return arr
  }
  let ret = []
  let flagIndex = Math.floor(arr.length / 2)
  let flag = arr.splice(flagIndex, 1)[0]
  let left = [], right = []
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]>flag) {
      right.push(arr[i])
    } else {
      left.push(arr[i])
    }
  }
  return quickSort(left).concat([flag], quickSort(right))
  
}



let rest = quickSort([1,3,4,2])
console.log(rest);
