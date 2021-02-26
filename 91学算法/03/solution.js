/**
 * @param {number} maxSize
 */
var CustomStack = function(maxSize) {
  this.maxSize = maxSize
  this.length = 0
  this.stack = []
};

/**
 * @param {number} x
 * @return {void}
 */
CustomStack.prototype.push = function(x) {
  if (this.length < this.maxSize) {
    this.stack.push(x)
    this.length++
    return this.stack
  }
};

/**
 * @return {number}
 */
CustomStack.prototype.pop = function() {
  if (this.length === 0) {
    return -1
  }
  this.length--
  return this.stack.pop()
};

/**
 * @param {number} k
 * @param {number} val
 * @return {void}
 */
CustomStack.prototype.increment = function(k, val) {
  const stackLength = this.stack.length
  const len = k < stackLength ? k: stackLength
  for (let i = 0; i < len; i++) {
    this.stack[i] = this.stack[i]+val
  }
  return this.stack
};

/**
 * Your CustomStack object will be instantiated and called as such:
 * var obj = new CustomStack(maxSize)
 * obj.push(x)
 * var param_2 = obj.pop()
 * obj.increment(k,val)
 */
const customStack = new CustomStack(3)
console.log(customStack);
console.log(customStack.push(1), customStack.stack);
console.log(customStack.push(2), customStack.stack);
console.log(customStack.pop(2), customStack.stack);
console.log(customStack.push(2), customStack.stack);
console.log(customStack.push(3), customStack.stack);
console.log(customStack.push(4), customStack.stack);
console.log(customStack.increment(5, 100), customStack.stack);
console.log(customStack.increment(2, 100), customStack.stack);
console.log(customStack.pop(2), customStack.stack);
console.log(customStack.pop(2), customStack.stack);
console.log(customStack.pop(2), customStack.stack);
console.log(customStack.pop(2), customStack.stack);

