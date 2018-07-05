let context = {
    a: 1,
    b: 2,
    commit: function (str) {
        console.log(str)
    }
}

let actions={
    increment (context) {
        context.commit('hahah')
    },
    haha ({commit}) {
        commit('wuyule')
    }
}

actions.increment(context)
actions.haha(context)
