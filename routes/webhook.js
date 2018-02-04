'use strict'

const express = require('express')
const Webhook = require('../models/webhook.js')
const Router = express.Router()
const {token, apiUrl, apiPath} = require('../config').facebook

const webhook = new Webhook({
  token,
  apiUrl,
  apiPath
})

Router
  .get('/', (req, res, next) => {
    webhook.handleGet(req, res, next)
  })
  .post('/', (req, res, next) => {
    webhook.handlePost(req, res, next)
  })

module.exports = Router