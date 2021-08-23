const myFlat = (arr)=> {
  let queue = arr, res = [], level = 0
  while (queue.length){
    const node = queue.shift()
    if (Array.isArray(node)) {
      level++
      queue = node.concat(queue)
      console.log(level, node);
    } else {
      res.push(node)
    }
  }
  console.log(res, level);
  return res
}

myFlat([1,2,[3,4,[5,6],9, [10]]])
