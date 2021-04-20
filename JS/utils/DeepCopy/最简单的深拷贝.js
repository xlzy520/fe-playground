function deepCopy(obj) {
  let _obj = Array.isArray(obj) ? [] : {}
  for (let i in obj) {
    _obj[i] = typeof obj[i] === 'object' ? deepCopy(obj[i]) : obj[i]
  }
  return _obj
}
const obj1 = {x: 2, y: {z: 3}}
obj1.fn = function add() {
  return 's'
}
const obj2 = deepCopy(obj1);
console.log(obj1)
console.log(obj2)
/*
只能支持普通对象，不支持循环引用、Date、RegExp
{ x: 2, y: { z: 3 }, fn: [Function: add] }
{ x: 2, y: { z: 3 }, fn: [Function: add] }
 */
