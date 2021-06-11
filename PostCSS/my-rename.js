module.exports = (options = {}) => {
  return root => {
    const replaceClass = (pattern, replacement) => {
      if (typeof pattern !== 'string') {
        return
      }
  
      
      root.walkRules(rule => {
        const regex = new RegExp(pattern, 'gi')

        if (rule.type === 'rule') {
          console.log(rule);
          rule.selector = rule.selector.replace(regex, replacement)
        } else if (rule.type === 'atrule') {
          rule.params = rule.params.replace(regex, replacement)
        }
      })
    }

    // Replace all defined pattern and replacement
    Object.keys(options).forEach(function (p) {
      console.log(p);
      replaceClass(p, options[p])
    })
  }
}

module.exports.postcss = true
