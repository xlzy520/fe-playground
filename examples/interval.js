function say(words, time=5000) {
  setTimeout(()=>{
    console.log(words)
  },time)
}

say(1);
let i = 2;
const sayLong = setInterval(()=>{
  if (i<4) {
    say(i, 2000)
    i+=1;
  } else {
    clearInterval(sayLong)
  }
},1000)
