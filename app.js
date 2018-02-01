'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const webhookRouter = require('./routes/webhook.js')
const app = express()

app.use(bodyParser.json())
app.use('/webhook', webhookRouter)

module.exports = app