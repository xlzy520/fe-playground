(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
        typeof define === 'function' && define.amd ? define(['exports'], factory) :
            (factory((global.pfc = {})));
}(this, (function (exports) {
    var firstClickTime=0,secondClickTime=0,dValue=0
    function isObject(v) {
        return typeof v ==='object'
    }

    function init(dom,opts) {
        if (dom){
            if (isObject(dom)){
                if (dom.length===undefined){
                    bind(dom,opts)
                }
                else if (dom.length>1){
                    for (var i=0;i<dom.length;i++){
                        bind(dom[i],opts)
                    }
                }
            }else {
                throw "该参数不为DOM对象"
            }
        }else {
            throw "该DOM对象不存在"
        }
    }

    function difference(a,b) {
        return a-b
    }

    function bind(dom,opts){
        if (dom.attachEvent){
            dom.attachEvent('onclick',function () {
                if (firstClickTime!==undefined){
                    secondClickTime=firstClickTime
                }
                firstClickTime= new Date().getTime()
                dValue=difference(firstClickTime,secondClickTime)

                if ( dValue<opts.duration) {
                    dom.disabled=true
                    console.log(dValue,'小于'+opts.duration+'毫秒')
                    setTimeout(function () {
                        dom.disabled=false
                    },500)
                }else {
                    console.log(dValue,'大于200毫秒')
                }
                console.log(firstClickTime,secondClickTime)
            })
        }  //兼容IE事件
        else {
            dom.addEventListener('click',function () {
                if (firstClickTime!==undefined){
                    secondClickTime=firstClickTime
                }
                firstClickTime= new Date().getTime()
                dValue=difference(firstClickTime,secondClickTime)

                if ( dValue<opts.duration) {
                    dom.disabled=true
                    console.log(dValue,'小于'+opts.duration+'毫秒')
                    setTimeout(function () {
                        dom.disabled=false
                    },1000)
                }else {
                    console.log(dValue,'大于200毫秒')
                }
                console.log(firstClickTime,secondClickTime)
            },false)
        }
    }

    exports.init=init
})))