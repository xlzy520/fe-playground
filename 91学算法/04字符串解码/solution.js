/**
 * @param {string} s
 * @return {string}
 */
var decodeString = function(s) {
  s = s.replace(/(\d+)\[([A-Za-z]*)\]/g, function (a, b, c, d, e) {
    return ''.padEnd(b*c.length, c)
  })
  if (s.includes('[')) {
    return decodeString(s)
  }
  console.log(s);
  return s
};


decodeString('3[a2[c]]')
