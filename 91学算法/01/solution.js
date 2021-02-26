function addToArrayForm(A, k) {
  const result = BigInt(A.join('')) + BigInt(k)
  const resArr = result.toString().split('')
  return resArr.map(parseInt);
}
console.log(s);


module.exports = {
  addToArrayForm: addToArrayForm
}
