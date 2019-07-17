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
app.get('/fire', function (req, res) {
  res.sendFile( __dirname + "/" + "A-Cool-Flame-Fire-Effect-Using-Particles.html" );
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
