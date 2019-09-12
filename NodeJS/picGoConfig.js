const express = require('express')
const app = express()
const fs = require('fs')

const absPath = __dirname + '/'
const configPath = absPath + 'data.json'
const fileExists = fs.existsSync(configPath)
if (!fileExists) {
  fs.writeFile(configPath, 'zuoyeti', (err) => {
    console.log(err)
  })
}

app.get('/picGoConfig/download', (req, res) => {
  if (fileExists) {
    res.sendFile(configPath)
  } else {
    const response = {
      message: '配置文件不存在',
      success: false
    }
    res.send(response)
  }
})

app.post('/picGoConfig/update', (req, res) => {
  const { client, width, height } = req.body
  res.send({
    success: true
  })
})

const server = app.listen(9527, function() {
  // const host = server.address().address
  const host = 'localhost'
  const port = server.address().port

  console.log('应用实例，访问地址为 http://%s:%s', host, port)
})
