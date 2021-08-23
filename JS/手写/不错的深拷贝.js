const cloneDeep = (obj, cache = [])=> {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }
  
  const hit = cache.find(v=> v.original === obj)
  if (hit) {
    return hit.copy
  }
  
  const Constructor = obj.constructor
  // typeof null的返回值为object，所以可以直接省略
  if (Constructor === RegExp) {
    return new Constructor(obj)
  } else if (Constructor === Date) {
    return new Constructor(obj.getTime())
  }
  
  let copy = Array.isArray(obj) ? []: {}
  cache.push({
    original: copy,
    copy
  })
  
  Object.keys(copy).forEach(key=> {
    copy[key] = cloneDeep(copy[key], cache)
  })
  
  return copy
}
