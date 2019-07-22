var express = require('express');
var app = express();
var fs = require("fs");

var bodyParser = require('body-parser');
// var multer  = require('multer');

let getClientIp = function (req) {
  return req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress || '';
};

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(multer({ dest: '/tmp/'}).array('image'));

app.get('/', function (req, res) {
  res.sendFile( __dirname + "/" + "StarParticles.html" );
})
app.post('/market/goods/detail', function (req, res) {
  if (req.body.goodsId === 8) {
    res.send({
      "code": 0,
      "msg": null,
      "data": {
        "saveDate": null,
        "modifyDate": null,
        "operatorId": null,
        "modifierId": null,
        "roleCode": null,
        "realName": null,
        "goodsId": 8,
        "goodsName": "餐馆餐具",
        "fileUrls": ["ZmlsZXMvMjc0YTE5NGYwMWE1NGE4NjllZGViZGZmZmY4Mzc5MDQxNTYzMTk2NTIxNTY1LnBuZw=="],
        "description": "",
        "orderId": null,
        "quantity": null,
        "useTypeId": 2,
        "priceStr": "16.0",
        "specsList": [{
          "saveDate": null,
          "modifyDate": null,
          "operatorId": null,
          "modifierId": null,
          "roleCode": null,
          "realName": null,
          "specsId": 6,
          "useTypeId": 2,
          "quantity": 18,
          "specsName": "一件规格",
          "unit": null,
          "specsStr": "18套/件",
          "price": 16.0,
          "pack": false,
          "deleted": null
        }, {
          "saveDate": null,
          "modifyDate": null,
          "operatorId": null,
          "modifierId": null,
          "roleCode": null,
          "realName": null,
          "specsId": 5,
          "useTypeId": 2,
          "quantity": 0,
          "specsName": "一套规格",
          "unit": null,
          "specsStr": "餐盘*1,餐碗*1,筷子*1,钢化杯*1",
          "price": null,
          "pack": true,
          "deleted": null
        }],
        "specsId": null,
        "price": null,
        "useType": "餐馆餐具",
        "useTypeCode": "restaurant",
        "sale": true,
        "deleted": null
      },
      "success": true
    })
  } else {
    res.send(
      {
        "code": 0,
        "msg": null,
        "data": {
          "saveDate": null,
          "modifyDate": null,
          "operatorId": null,
          "modifierId": null,
          "roleCode": null,
          "realName": null,
          "goodsId": 11,
          "goodsName": "幼儿园餐具",
          "fileUrls": [
            "ZmlsZXMvYzZkY2VjY2Y4MjcxNDRkMzgwODlmYjg2NTAyMzU3MzQxNTYzMTk4NjkzNzQ2LnBuZw==",
            "ZmlsZXMvYTAyNjhlMDA5OTYwNDZmMzkyYWEzZjdmMTQ5Y2RhMzMxNTYzMTk4NzE4ODExLnBuZw=="
          ],
          "description": "",
          "orderId": null,
          "quantity": null,
          "useTypeId": 3,
          "priceStr": "0.3~0.5",
          "specsList": [
            {
              "saveDate": null,
              "modifyDate": null,
              "operatorId": null,
              "modifierId": null,
              "roleCode": null,
              "realName": null,
              "specsId": 7,
              "useTypeId": 3,
              "quantity": 0,
              "specsName": "规格A",
              "unit": null,
              "specsStr": "不锈钢碗（4.5cm）*1,不锈钢勺*1",
              "price": 0.3,
              "pack": true,
              "deleted": null
            },
            {
              "saveDate": null,
              "modifyDate": null,
              "operatorId": null,
              "modifierId": null,
              "roleCode": null,
              "realName": null,
              "specsId": 8,
              "useTypeId": 3,
              "quantity": 0,
              "specsName": "规格B",
              "unit": null,
              "specsStr": "不锈钢勺*1,不锈钢餐盘（20cm）*1",
              "price": 0.5,
              "pack": true,
              "deleted": null
            }
          ],
          "specsId": null,
          "price": null,
          "useType": "幼儿园餐具",
          "useTypeCode": "kindergarten",
          "sale": true,
          "deleted": null
        },
        "success": true
      }
    )
  }
})
app.get('/ip', function (req, res) {
  console.log(req.ip);
  res.sendFile( __dirname + "/" + "ip.txt" );
})

app.post('/addClient', function (req, res) {
  const {client, width, height } = req.body;
  let ip = getClientIp(req).match(/\d+.\d+.\d+.\d+/);
  ip = ip ? ip.join('.') : null;
  fs.appendFileSync('ip.txt', `${new Date().toLocaleString()} ${ip} ${width} ${height} ${client}\r`)
  res.send({
    success: true
  })
})

app.post('/file_upload', function (req, res) {
  
  console.log(req.files[0]);  // 上传的文件信息
  console.log(JSON.stringify(req.body));  // 附带的额外数据
  
  var des_file = __dirname + "/" + req.files[0].originalname;
  fs.readFile( req.files[0].path, function (err, data) {
    fs.writeFile(des_file, data, function (err) {
      if( err ){
        console.log( err );
      }else{
        response = {
          message:'文件上传成功',
          filename:req.files[0].originalname,
          success: false
        };
      }
      console.log( response );
      res.end( JSON.stringify( response ) );
    });
  });
})

var server = app.listen(8081, function () {
  
  var host = server.address().address
  var port = server.address().port
  
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
  
})
