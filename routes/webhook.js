'use strict'

const express = require('express')
const Webhook = require('../models/webhook.js')
const Router = express.Router()
const {token} = require('../config').facebook

const webhook = new Webhook({
  token
})

Router
  .get('/', (req, res, next) => {
    webhook.handleGet(req, res, next)
  })
  .post('/', (req, res, next) => {
    webhook.handlePost(req, res, next)
  })

module.exports = Router