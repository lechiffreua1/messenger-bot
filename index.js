'use strict'

const https = require('https')
const fs = require('fs')
const app = require('./app.js')
const {server} = require('./config')
const port = process.env.PORT || server.port

const options = {
  key: fs.readFileSync('lib/ssl/key.pem'),
  cert: fs.readFileSync('lib/ssl/cert.pem')
};

const httpServer = https.createServer(options, app)
httpServer
  .on('error', (err) => {
    console.error(err)
  })
  .on('clientError', (err) => {
    console.error(err)
  })
  .on('close', () => {
    console.log('Http server is closed')
  })
  .on('listening', () => { console.log(`listening on ${port}`) })
  .listen(port)