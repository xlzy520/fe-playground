(function(w,d) {
  
  "use strict";
  
  w.Touch = function(id) {
    var t = {
      t: ['up', 'right', 'down', 'left'],
      tt: 300, tp: 150, dtp: 222, td: Math.round(30 / window.devicePixelRatio), lt: -1,
      ltt: null, s : null, fn: [], e: null, o: null,
      p1: {x: 0, y: 0, t: 0},
      p2: {x: 0, y: 0, t: 0},
      distance: function() {
        return Math.round(Math.sqrt(Math.pow((this.p1.x - this.p2.x), 2) + Math.pow((this.p1.y - this.p2.y), 2)));
      },
      angle: function() {
        var d = Math.abs(this.p2.x - this.p1.x);
        return Math.round(Math.acos(d / Math.sqrt(Math.pow(d, 2) + Math.pow(this.p2.y - this.p1.y, 2))) * 57.3);
      },
      reset: function() {
        var target = this.e.touches.item(0);
        this.p1.x = target.clientX;
        this.p1.y = target.clientY;
        this.p1.t = this.e.timeStamp;
        this.p2.x = this.p1.x;
        this.p2.y = this.p1.y;
        this.p2.t = this.p1.t;
      },
      update: function() {
        var target = this.e.touches.item(0);
        this.p2.t = this.e.timeStamp;
        this.p2.x = target.clientX;
        this.p2.y = target.clientY;
      },
      direction: function() {
        return (this.angle() > 45) ? ((this.p1.y < this.p2.y) ? 2 : 0) : ((this.p1.x < this.p2.x) ? 1 : 3);
      },
      time: function() {
        return this.p2.t - this.p1.t;
      },
      on: function(event, fn) {
        this.fn[event] = fn;
        return this;
      },
      swipe: function() {
        var f = 'swipe' + this.t[this.direction()];
        var e = new CustomEvent(f);
        this.o.dispatchEvent(e);
        if ('function' === typeof(this.fn[f])) {
          this.fn[f](this.o);
        }
      },
      pinch: function() {
        var e, n = 'pinch',dt = {scale : this.e.scale, style: this.s},
          p = {bubbles: false, cancelable: false, detail: dt};
        if (this.e.scale < 1.0) {
          e = new CustomEvent('pinchout',p);
          e.scale = this.e.scale;
          e.style = dt.style;
          this.o.dispatchEvent(e);
          if ('function' === typeof this.fn[n+'out']) {
            this.fn[n+'out'](this.o, dt.scale, dt.style);
          }
        } else if (this.e.scale > 1.0){
          e = new CustomEvent('pinchin',p);
          e.scale = this.e.scale;
          e.style = dt.style;
          this.o.dispatchEvent(e);
          if ('function' === typeof this.fn[n+'in']){
            this.fn[n+'in'](this.o, this.e.scale, this.s);
          }
        }
      },
      tap: function(){
        console.log(33333);
        var e = new CustomEvent('tap');
        this.o.dispatchEvent(e);
        if ('function' === typeof this.fn.tap){
          this.fn.tap(this.o);
        }
      },
      dbltap: function (){
        var e = new CustomEvent('dbltap');
        this.o.dispatchEvent(e);
        if ('function' === typeof this.fn.dbltap){
          this.fn.dbltap(this.o);
        }
      }
    };
    
    var CustomEvent = function(e, p) {
      p = p || {bubbles: false, cancelable: false, detail: undefined};
      var evt = d.createEvent('CustomEvent');
      evt.initCustomEvent(e, p.bubbles, p.cancelable, p.detail);
      return evt;
    };
    CustomEvent.prototype = w.CustomEvent.prototype;
    w.CustomEvent = CustomEvent;
    
    t.o = ('object' !== typeof id) ? d.getElementById(id) : id;
    
    if (null !== t.o) {
      t.o.addEventListener('touchstart', function(e){
        console.log(1, '===========打印的 ------ ');
        e.preventDefault();
        t.e = e;
        t.reset();
      }, false);
      
      t.o.addEventListener('touchmove', function(e){
        e.preventDefault();
        t.e = e;
        t.update();
      }, false);
      
      t.o.addEventListener('touchend', function(e){
        e.preventDefault();
        t.e = e;
        t.p2.t = e.timeStamp;
        var d, dd = t.distance(), tt = t.time();
        if ((dd > t.td) && (tt < t.tt)){
          t.swipe();
        } else if (dd < 5 && tt < t.tp){
          if (t.lt<0){t.lt = e.timeStamp;}
          d = e.timeStamp - t.lt;
          t.lt = e.timeStamp;
          if (d>10 && d<t.dtp) {
            w.clearTimeout(t.ltt);
            t.dbltap();
          } else {
            t.ltt = w.setTimeout(function(){t.tap();},t.dtp);
          }
          
        }
      }, false);
      
      t.o.addEventListener('gesturestart', function(e){
        e.preventDefault();
        t.e = e;
        var i,j,s = [], style = w.getComputedStyle(t.o, null);
        for(i = 0, j = style.length; i < j; i++){
          s[style[i]] = style.getPropertyValue(style[i]);
        }
        t.s = s;
      }, false);
      
      t.o.addEventListener('gesturechange', function(e){
        e.preventDefault();
        t.e = e;
        t.pinch();
      }, false);
      
      t.o.addEventListener('gestureend', function(e){
        e.preventDefault();
        t.p1.t = e.timeStamp - (t.tt + 1);
        t.p2.t = e.timeStamp;
      }, false);
    }
    return t;
  };
})(window, document);

const BaseUrl = 'https://service-ijd4slqi-1253419200.gz.apigw.tencentcs.com/release/'
const favTags = ['IMG', 'VIDEO']
const isBili = location.host.includes('bilibili.com')
let selectedImgClass = 'people'
let resourceData = null
const bgcMapping = {
  error: "linear-gradient(to right, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%)",
  success: "linear-gradient(to right, #00b09b, #96c93d)"
}
const toast = (text, type = 'success') => {
  window.Toastify({
    text,
    position: "center",
    backgroundColor: bgcMapping[type],
    duration: 1500
  }).showToast();
}

function addScript(url) {
  const body = document.querySelector('body')
  const script = document.createElement('script')
  script.src = url
  body.appendChild(script)
}
function addLink(url) {
  const head = document.querySelector('head')
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = url
  head.appendChild(link)
}

function addStyle(data){
  const head = document.querySelector('head')
  const style = document.createElement('style')
  style.innerHTML = data
  head.appendChild(style)
}
/***
 *
 * @param data{url, origin}
 */
function addToCloud(data, selectedImgClass) {
  const url = BaseUrl + 'resource/add'
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ...data,
      type: selectedImgClass
    })
  }).then(res=> res.json()).then(res=> {
    if (res.succeess) {
      toast('添加成功')
    } else {
      toast(res.msg, 'error')
    }
    resourceData = null
  }).catch((err) => {
    toast(err.msg, 'error')
  })
}

function renderSelect() {
  const people = `<div class="lzy-people-class">人物</div>`
  const anime = `<div class="lzy-anime-class">动画</div>`
  const content = document.createElement('div')
  content.className = 'lzy-select hidden'
  content.innerHTML = people + anime
  document.body.appendChild(content)
  const peopleDom = document.querySelector('.lzy-people-class')
  const animeDom = document.querySelector('.lzy-anime-class')
  peopleDom.addEventListener('click', ()=>{
    selectedImgClass = 'people'
    addToCloud(resourceData, selectedImgClass)
    toggleSelect(true)
  })
  animeDom.addEventListener('click', ()=>{
    selectedImgClass = 'anime'
    addToCloud(resourceData, selectedImgClass)
    toggleSelect(true)
  })
}

function toggleSelect(flag) {
  const select = document.querySelector('.lzy-select')
  if(!select) return
  if (flag) {
    select.classList.toggle('hidden')
  } else {
    select.classList.add('hidden')
  }
  
}

addScript('https://cdn.bootcdn.net/ajax/libs/toastify-js/1.10.0/toastify.min.js')

addLink('https://cdn.bootcdn.net/ajax/libs/toastify-js/1.10.0/toastify.min.css')

const styles = `
 .lzy-select{
  position: fixed;
  bottom: 30px;
  left: 0;
  right: 0;
  width: 200px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.lzy-people-class, .lzy-anime-class{
  width: 90px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background: rgba(255, 140, 0, .5);
  border-radius: 20px;
  color: #fff;
  cursor: pointer;
}

.hidden{
  display: none;
}
.lzy-select, .toastify{
  z-index: 9999999999;
}
  
  `
addStyle(styles)

renderSelect()

function getBackgroundImage(node) {
  const imgInBg = node && node.style.backgroundImage
  if (imgInBg) {
    const match = imgInBg.match(/(?<=\").+(?=\")/)
    return match && match.length && match[0]
  }
  return ''
}

/***
 *
 * @param node
 */
function shouldHandle(node) {
  let imgInBg = ''
  const allowTag = favTags.includes(node.nodeName)
  // bilibili
  // if (isBili) {
  //   imgInBg = getBackgroundImage(node)
  //   console.log(imgInBg);
  // }
  return allowTag || imgInBg
}

function handleDblClick(evt) {
  const cur = evt.target
  console.log(cur);
  if (shouldHandle(cur)) {
    resourceData = {
      url: cur.src,
      origin: location.href
    }
    toggleSelect(true)
  } else {
    const first = cur.firstChild
    if (first && shouldHandle(first)) {
      resourceData = {
        url: first.src,
        origin: location.href
      }
      toggleSelect(true)
    } else {
      toggleSelect()
    }
  }
}

if (isBili) {
  document.addEventListener('doubleTap', evt=> {
    handleDblClick(evt)
  })
}


document.addEventListener('dblclick', evt=> {
  handleDblClick(evt)
})


new Touch(document);

document.addEventListener('dbltap',evt=>{
  console.log('double tap')
  handleDblClick(evt)
});
