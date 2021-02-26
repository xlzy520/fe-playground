const assert = require('assert');
const { solution } = require('./solution')
const tests = [
  {A: 'loveleetcode', k:  'e',      expected: [3, 2, 1, 0, 1, 0, 0, 1, 2, 2, 1, 0]},
]
describe('addToArrayForm()', function() {
  tests.forEach(test => {
    it('should return '+JSON.stringify(test.expected)+' when the value is not present', function() {
      assert.deepEqual(solution(test.A, test.k), test.expected);
    });
  })
  
});
