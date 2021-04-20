let context = {
  a: 1,
  b: 2,
  commit: function (str) {
    console.log(this.a, str)
  }
}

let actions = {
  increment(context) {
    const commit = context.commit
    context.commit('with context')   // 1 with context
    commit('ref context') // undefined ref context
  },
  decrement({commit}) {
    commit('no context')  // undefined no context
    commit.apply(context, ['no context'])  // 1 no context
  }
}

actions.increment(context)
actions.decrement(context)

// 参数解构或者提取会导致this指向问题
