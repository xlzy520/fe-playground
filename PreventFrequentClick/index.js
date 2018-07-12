(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
        typeof define === 'function' && define.amd ? define(['exports'], factory) :
            (factory((global.pfc = {})));
}(this, (function (exports) {
    var firstClickTime=0,secondClickTime=0,dValue=0

    function isDom(v) {    //判断是否为Dom
        if (v.length===undefined){    //一个Dom
            return v instanceof HTMLElement
        }
        var i=0
        while (i<v.length){     //多个Dom
            if (v[i] instanceof HTMLElement===false) return false
            if (v[v.length-1] instanceof HTMLElement===true) return true
            i++
        }
    }

    function init(dom,opts) {
        if (dom){
            if (isDom(dom)){
                if (dom.length===undefined){
                    bindEvent(dom,opts)
                }
                else if (dom.length>1){
                    for (var i=0;i<dom.length;i++){
                        bindEvent(dom[i],opts)
                    }
                }
            }else {
                throw "该参数不为DOM对象"
            }
        }else {
            throw "该DOM对象不存在"
        }
    }

    function timeDifference() {
        if (firstClickTime!==undefined){
            secondClickTime=firstClickTime
        }
        firstClickTime= new Date().getTime()
        return firstClickTime-secondClickTime
    }

    function main(dom,opts) {
        dValue=timeDifference()
        if ( dValue<opts.duration) {
            dom.disabled=true
            console.log(dValue,'小于'+opts.duration+'毫秒')
            setTimeout(function () {
                dom.disabled=false
            },opts.durationDisable)
        }else {
            console.log(dValue,'大于200毫秒')
        }
    }
    function bindEvent(dom,opts){
        if (dom.attachEvent){
            dom.attachEvent('onclick',function () {
                main(dom,opts)
            })
        }  //兼容IE事件
        dom.addEventListener('click',function () {
               main(dom,opts)
            },false)
        }

    exports.init=init
})))