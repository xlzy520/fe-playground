const fs=require('fs')
const axios=require('axios')
// const AV = require('leancloud-storage');
// const { Query, User } = AV;
// // 实时消息服务
// const { Realtime, TextMessage } = require('leancloud-realtime');
//
//
// const APP_ID = 'xYQtJbiDo44xLG5JLfzk3eqh-gzGzoHsz';
// const APP_KEY = 'UrNG3XlppUl09YlhSjEwXLcw';
//
// const CQSSC = AV.Object.extend('CQSSC');
// const CQSSCTest = new CQSSC();
// const query=new AV.Query(CQSSC).limit(100).descending('qiHao')
// AV.init({
//     appId: APP_ID,
//     appKey: APP_KEY
// });
//
//
// let recentDay=1
// let rows=30
// const host='https://6y12.com/lottery/trendChart/lotteryOpenNum.do?lotCode=CQSSC&recentDay='+recentDay+'&rows='+rows
// axios.get(host).then(res=>{
//     res=res.data.map(function (obj) {
//         return {
//             qiHao: obj.qiHao,
//             endTime:new Date(obj.endTime).toLocaleString(),
//             openTime: new Date(obj.openTime).toLocaleString(),
//             haoMa: obj.haoMa.substring(0,1)
//         }
//     })
// })
// let wanWeiArr=[]
// query.find().then(res=>{
//     for (let x of res){
//         wanWeiArr.push(parseInt(x._serverData.haoMa))
//     }
//     console.log(wanWeiArr,wanWeiArr.length)
// })
/**
 * @return {boolean}
 */
function Deduplication(arr) {
    isArray(arr)
    return arr.filter((item,index)=>{
        return arr.indexOf(item)===index
    })
}
function isArray(arr) {
    return Object.prototype.toString.call(arr)==='[object Array]'
}
function main(arr) {
    isArray(arr)
    let newArray=[],repeatCount=[]
    arr.forEach((item)=>{
        newArray.push(item.haoMa.substring(0,1))
        console.log("push,此时数组为："+newArray)
        if (Deduplication(newArray).length > 5) {
            let popNum=newArray.shift()
            // console.log("出现六个不同的数字，把数组第一个数抛出,抛出"+popNum,"此时数组为："+newArray)
            while (newArray[0]===popNum||Deduplication(newArray).length > 5){
                let popSecNum=newArray.shift()
                // console.log("继续抛出"+popSecNum,"此时数组为："+newArray)
            }
        }
        if (Deduplication(newArray).length<=5&&newArray.length>9) {
            console.log('----------------------连续'+newArray.length+"期,重复的五个数字为："
                +Deduplication(newArray).toLocaleString()+"\t数组为："+newArray+"\t期数："
                +item.qiHao+"\t时间"+new Date(item.openTime).toLocaleString()+"--------------------")
            repeatCount.push(newArray.length)

        }else {

        }
    })
    return repeatCount
}

// 一千条数据
// const file='CQSSC.json'
// fs.readFile(file,'utf8',function (err,res) {
//     if(err) console.log(err);
//     res=JSON.parse(res)
//     let arr=[]
//     for (let x of res){
//         arr.push({
//             haoma:x.haoMa.substring(0,1),
//             qishu:x.qiHao
//         })
//     }
//     console.log("连续重复超过9次："+main(arr))
// })

//一万条数据
let allData=[]
const base_url='https://6y12.com/lottery/trendChart/lotteryOpenNum.do'

function di_gui_tong_ji(i,end) {
    axios.get(base_url,{
        params:{
            lotCode:'CQSSC',
            recentDay: i,
            rows: 200
        }
    }).then(function (res) {
        allData=allData.concat(res.data)
        console.log(allData.length)
        i=i+1
        if (i < end) {
            di_gui_tong_ji(i,end)
        }else {
            console.log("超过9期以上的次数："+main(allData.reverse()))
        }

    })
}

di_gui_tong_ji(1,1)
