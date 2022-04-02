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
  console.log(222);
  handleDblClick(evt)
})
