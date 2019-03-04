const axios = require('axios')
const fs = require('fs')

const getAccess_token = new Promise(((resolve, reject) => {
  fs.readFile('./a.json', 'utf-8', (err, data) => {
    const access_token = JSON.parse(data).access_token
    resolve(access_token)
    if (err) {
      reject(err)
    }
  })
}))
const fetch = axios.create({
  baseURL: 'https://aip.baidubce.com/rest/2.0/ocr/v1/',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
});
const map={
  '驾驶证': 'driving_license',
  '行驶证': 'vehicle_license'
}

const dirPath = './测试资源/'
const imageList = fs.readdirSync(dirPath)

const imgCount = imageList.length
let i = 0
const renameTime = setInterval(()=>{
  if (i<imgCount) {
    const imagePath = dirPath + imageList[i];
    const imageBuf = fs.readFileSync(imagePath);
    const imgBase64 = imageBuf.toString('base64')
    renameMain(dirPath, imagePath, imgBase64)
    i++
  } else {
    clearInterval(renameTime)
  }
},1000)

function request(imgBase64,access_token) {
  return fetch({
    method: 'post',
    url: `/${map['行驶证']}?access_token=${access_token}`,
    data: 'image='+encodeURIComponent(imgBase64)+'&detect_direction=true'
  })
}

function renameMain(dirPath, imagePath, imgBase64) {
  return getAccess_token.then((access_token) => {
    console.time('a')
    request(imgBase64,access_token).then(res=>{
      console.log(res.data);
      let ownerName = res.data.words_result['所有人'].words
      if (ownerName.length>0) {
        fs.access(`./完成结果/${ownerName}.jpg`, fs.constants.F_OK, (err) => {
          console.log(err);
          if (!err) {
            fs.rename(imagePath, `./完成结果/${ownerName}-${new Date().getTime()}.jpg`,(err)=>{
              if (err) throw err;
              console.log(`Rename complete!new name is ${ownerName}`);
            })
          } else {
            fs.rename(imagePath, `./完成结果/${ownerName}.jpg`,(err)=>{
              if (err) throw err;
              console.log(`Rename complete!new name is ${ownerName}`);
            })
          }
        });
      } else {
        throw new Error('识别失败！')
      }
      console.timeEnd('a')
    })
  })
  
}




