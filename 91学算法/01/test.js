const assert = require('assert');
const { addToArrayForm } = require('./solution')
const tests = [
  {A: [0], k:  1,      expected: [1]},
  {A: [1,2,0,0], k:  34,      expected: [1,2,3,4]},
  {A: [2,7,4], k:  181,      expected: [4,5,5]},
  {A: [9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9], k:  10000000,      expected: [1,2,3,4]},
]
describe('addToArrayForm()', function() {
  tests.forEach(test => {
    it('should return '+JSON.stringify(test.expected)+' when the value is not present', function() {
      assert.deepEqual(addToArrayForm(test.A, test.k), test.expected);
    });
  })
  
});
