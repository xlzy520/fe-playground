(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
        typeof define === 'function' && define.amd ? define(['exports'], factory) :
            (factory((global.pfc = {})));
}(this, (function (exports) {
    var submit_btn
    var firstClickTime = 0, secondClickTime = 0;  //  全局点击时间记录
    /**
     * 文档加载结束后执行
     */
    window.onload=function () {
        submit_btn=document.getElementsByClassName('submit')
        var submit_body=document.getElementsByTagName("body")
        submit_body[0].onclick=function (evt) {
            if (evt.target.nodeName === 'INPUT'||evt.target.nodeName ==='BUTTON'){
                if (evt.target.className.includes('submit')){
                    init(evt.target)
                }
            }
        }
        init(submit_btn)
    }

    /**
     * 返回标签中的配置，如果没有，则返回默认配置
     * @param dom
     * @returns {{duration: *, durationDisable: *}}
     */
    function getOptions(dom) {
        var duration=dom.getAttribute('data-duration')
        var durationDisable=dom.getAttribute('data-durationDisable')
        if (typeof duration==='string'){
            this.duration=duration||200
        }
        if (typeof durationDisable==='string') {
            this.durationDisable=durationDisable||1000
        }
        return {
            duration: this.duration,
            durationDisable: this.durationDisable
        }
    }
    
    /**
     * 判断一个或者多个节点是否为Dom
     * @param v
     * @returns {boolean}
     */
    function isDom(v) {
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

    /**
     * 得到连续点击两次之间的时间差
     * @returns {number}
     */
    function timeDifference() {
        if (firstClickTime!==undefined){
            secondClickTime=firstClickTime
        }
        firstClickTime= new Date().getTime()
        return firstClickTime-secondClickTime
    }

    /**
     * 给按钮绑定点击事件
     * @param dom
     * @param opts
     */
    function bindEvent(dom,opts){
        if (dom.attachEvent){
            dom.attachEvent('onclick',function (evt) {
                evt.stopPropagation()
                main(dom,opts)
            })
        }  //兼容IE事件
        dom.addEventListener('click',function (evt) {
            evt.stopPropagation()
            main(dom,opts)
            },false)
        }
    
    /**
     * 根据时间差判断是否禁用按钮
     * @param dom
     * @param opts
     */
    function main(dom,opts) {
        var dValue=timeDifference()
        if ( dValue<opts.duration) {
            dom.setAttribute('disabled','true')
            if (dom.tagName === 'A') {
                dom.setAttribute('style','border-color: buttonface;background-color: buttonface;color:graytext;pointer-events:none')
            }
            console.log(dValue,'小于'+opts.duration+'毫秒')
            setTimeout(function () {
                if (dom.tagName === 'A') {
                    dom.setAttribute('style','border-color: ;background-color: ;color:;pointer-events:')
                }
                dom.setAttribute('disabled','false')
            },opts.durationDisable)
        }else {
            console.log(dValue,'大于200毫秒')
        }
    }
    
    /**
     * 初始化
     * @param dom
     */
    function init(dom) {
        if (dom){
            if (isDom(dom)){
                var opts={}
                if (dom.length===undefined){
                    opts=getOptions(dom)
                    bindEvent(dom,opts)
                }
                else if (dom.length>1){
                    for (var i=0;i<dom.length; i++){
                        opts=getOptions(dom[i])
                        bindEvent(dom[i],opts)
                    }
                }
            }else {
                throw new Error("该参数不为DOM对象")
            }
        }else {
            throw new Error("该DOM对象不存在")
        }
    }
    
})))