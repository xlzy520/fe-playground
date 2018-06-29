let str='aaa' //  'aaabbc' 'bbbccc' 'abbcccc'

const formate=(str)=>{
  return str.replace(/(\w)\1*/g,(reg,c)=>reg.length+c)  // \w匹配字母  \1匹配出现第一个一样的数组重复一次
}
console.log(formate('daaabbc'));