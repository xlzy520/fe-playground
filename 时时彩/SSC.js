const axios = require('axios')

function removeDeduplication(arr) {
  isArray(arr)
  return arr.filter((item, index) => {
    return arr.indexOf(item) === index
  })
}

function isArray(arr) {
  return Object.prototype.toString.call(arr) === '[object Array]'
}

function getCountObj(arr) {
  let obj = {}
  for (const k of arr) {
    if (obj[k]) {
      obj[k]++
    } else {
      obj[k] = 1
    }
  }
  return obj
}

function main(arr) {
  isArray(arr)
  let newArray = [],
      repeatCount = []
  arr.forEach((item) => {
    newArray.push(item.haoMa.substring(0, 1))
    if (removeDeduplication(newArray).length > 5) {
      let popNum = newArray.shift()
      while (newArray[0] === popNum || removeDeduplication(newArray).length > 5) {
        newArray.shift()
      }
    }
    if (removeDeduplication(newArray).length <= 5 && newArray.length > 10) {
      console.log(`----------------------连续${newArray.length}期,重复的五个数字为：${removeDeduplication(newArray).toLocaleString()}
            \t数组为：${newArray}\t期数：${item.qiHao}\t时间` +
          new Date(item.openTime).toLocaleString() + "--------------------")
      if ((newArray.length > 13)) {
        let date = new Date()
        if (date.getHours()<22&&date.getHours()>3){
          if ((date.getTime() - item.openTime) < 600000) {
            console.log(`短信提醒`)
            shortMessage()
          } else {
            console.log("已经提示过")
          }
        }else if (date.getHours() > 2 && date.getHours() < 8) {
          if ((date.getTime() - item.openTime) < 300000) {
            console.log(`短信提醒`)
            shortMessage()
          } else {
            console.log("已经提示过")
          }
        }
        
      }
      repeatCount.push(newArray.length)
      
    }
  })
  return repeatCount
}

let allData = []
const base_url = 'https://6y12.com/lottery/trendChart/lotteryOpenNum.do'

//一万条数据
function di_gui_tong_ji(i, end) {
  axios.get(base_url, {
    params: {
      lotCode: 'CQSSC',
      recentDay: i,
      rows: 200
    }
  }).then(function (res) {
    allData = allData.concat(res.data)
    i = i + 1
    if (i < end) {
      di_gui_tong_ji(i, end)
    } else {
      let arr = main(allData.reverse())
      let obj = getCountObj(arr)
      console.log(`超过10期以上的数组：${arr}`)
      console.log(`超过10期以上的各期数次数：`, obj)
    }
  })
}

function shortMessage() {
  const account_sdk_source = 'web'
  const mobile = 13588043792
  const type = 24
  const aid = 1305
  axios.get('https://bcy.net/passport/web/send_code/', {
    params: {
      account_sdk_source: account_sdk_source,
      mobile: mobile,
      captcha: '',
      type: type,
      aid: aid
    }
  }).then(res => {
    console.log(res.data)
  })
  
}
let date = new Date()
let Interval=300000
if (date.getHours()<22&&date.getHours()>3){
  Interval=600000
}
di_gui_tong_ji(1, 2)
setInterval(function () {
  di_gui_tong_ji(1, 2)
}, Interval)


