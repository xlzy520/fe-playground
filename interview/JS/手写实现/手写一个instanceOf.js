function Person(name) {
  console.log(this.name);
  this.name = name
  console.log(name);
}

Function.prototype.myBind = function (context, ...args){
  if (typeof this !== 'function') {
    throw new TypeError('this is not function')
  }
  let that = this
  return function Fn(...args2){
    console.log(args2);
    if (context instanceof Fn) {
      return that.apply(this, [...args, ...args2])
    } else {
      return that.apply(context, [...args, ...args2])
    }
  }
  
}

const ctx = { name: 123 }

const name = 234

const retCall = Person.myBind(ctx, name)(1111)

console.log('result:', retCall);
