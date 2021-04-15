function ArrayUnique2(arr) {
  return arr.reduce((prev, cur) => {
    prev.indexOf(cur) === -1 && prev.push(cur)
    return prev
  }, [])
}

import { findMaxAverage } from './second'
// console.log(ArrayUnique2(1,2,3))
findMaxAverage([1,3,4,5], 2)
