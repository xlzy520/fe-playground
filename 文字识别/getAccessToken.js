var https = require('https');
var qs = require('querystring');
const fs =require('fs')

const param = qs.stringify({
  'grant_type': 'client_credentials',
  'client_id': 'dKoINK2aSnh9IUmfw9NMlGPw',
  'client_secret': '8M3VQuyt0dPPvYsTsCHwLFtIGzOixjeW'
});

https.get(
    {
      hostname: 'aip.baidubce.com',
      path: '/oauth/2.0/token?' + param,
    },
    function (res) {
      // 在标准输出中查看运行结果
      res.pipe(process.stdout);
      res.on('data', (d) => {
        process.stdout.write(d);
        fs.writeFile('./a.json', d, function(err) {
          if (err) {
            throw err;
          }})
      });
    }
);

