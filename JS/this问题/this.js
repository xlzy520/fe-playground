let a  = 10
let obj = {
  a: 20,
  say: ()=> {
    console.log(this)
    console.log(this.a);
  }
}

obj.say()

const another = { a: 1}
obj.say.call(another)

// https://blog.csdn.net/weixin_42519137/article/details/88053339

