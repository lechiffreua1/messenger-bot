'use strict'

const Http = require('http')
const app = require('./app.js')
const {server} = require('./config')
const port = process.env.PORT || server.port

const httpServer = Http.createServer(app)
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