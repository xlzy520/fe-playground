function Person(name) {
  console.log(this.name);
  this.name = name
  console.log(name);
}

Function.prototype.myCall = function (context, ...args){
  console.log(context);
  const ctx = context || window
  console.log(this, ctx);
  ctx.fn = this
  const result = ctx.fn(...args)
  delete ctx.fn
  return result
}

Function.prototype.myApply = function (context, args){
  const ctx = context || window
  ctx.fn = this
  let result
  if (args && Array.isArray(args)) {
    result = ctx.fn(...args)
  } else {
    result = ctx.fn()
  }
  delete ctx.fn
  return result
}


const ctx = { name: 123 }

const name = 234

const retApply = Person.myApply(ctx, [name])
const retCall = Person.myCall(ctx, name)

console.log('result:', retApply, retCall);
