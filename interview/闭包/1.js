var foo = function (...args) {
  foo.value = args.reduce((total, cur)=> total+cur, (foo.value || 0))
  return foo
}



foo.getValue = function (){
  var value = this.value
  this.value = null
  console.log(value)
  return value
}

// 要求实现函数体
var f1 = foo(1, 2, 3);
f1.getValue(); // 6 输出是参数的和
var f2 = foo(1)(2, 3);
f2.getValue(); // 6
var f3 = foo(1)(2)(3)(4);
f3.getValue(); // 10

f1.getValue(); // 6 输出是参数的和
