var express = require('express');
var fs=require("fs");

var app = express();
app.get('/download/img', function (req, res, next) {
  var path="./0.jpg";
  var f = fs.createReadStream(path);
  f.pipe(res);
});

app.listen(3000);
