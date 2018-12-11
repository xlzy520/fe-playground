function doubleAfter2seconds(num) {
  return new Promise((resolve, reject) => {
    setTimeout(()=>resolve(num*2),2000)
  })
}

async function getResult() {
  let testNum=await doubleAfter2seconds(2)
  console.log(testNum)
}

getResult()
