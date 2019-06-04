var http = require("http");
var express = require("express");
var fs = require("fs");

var app = express();
app.get("/download/*", function (req, res, next) {
  //第一种方式
  //var f="F:/ftproot/NW.js.docx";
  //var f="f:/ftproot/我是中文的语言.txt"
  ////var f = req.params[0];
  //f = path.resolve(f);
  //console.log('Download file: %s', f);
  //res.download(f);

  //第二种方式
  var path = "D:\\搜狗高速下载\\flutter_windows_v1.0.0-stable.zip";
  var f = fs.createReadStream(path);
  res.writeHead(200, {
    "Content-Type": "application/force-download",
    "Content-Disposition": "attachment; filename=test.zip"
  });
  f.pipe(res);
});

http.createServer(app).listen(3000);
