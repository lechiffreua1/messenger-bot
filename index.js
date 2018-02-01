'use strict'

const Http = require('http')
const app = require('./app.js')
const { port, ip } = require('./config').server

const server = Http.createServer(app)
server
  .on('listening', () => { console.log(`listen on ${ip}:${port}`) })
  .listen(port, ip)