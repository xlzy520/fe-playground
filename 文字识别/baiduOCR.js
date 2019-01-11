const axios = require('axios')
const fs = require('fs')

let access_token
const getAccess_token = new Promise(((resolve, reject) => {
  fs.readFile('./a.json', 'utf-8', (err, data) => {
    access_token = JSON.parse(data).access_token
    resolve(access_token)
    if (err) {
      reject(err)
    }
  })
}))

const imageBuf = fs.readFileSync("./4.jpg");
const imgBase64 = imageBuf.toString('base64')

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

getAccess_token.then(() => {
  fetch({
    method: 'post',
    url: `/${map['行驶证']}?access_token=${access_token}`,
    data: 'image='+encodeURIComponent(imgBase64)+'&detect_direction=true'
  }).then(res=>{
    console.log(res.data);
  })
})



