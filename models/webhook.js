'use strict'

const EE = require('events')

class Webhook extends EE {
  constructor (options) {
    super()
    this.token = options.token
  }

  handleGet (req, res, next) {
    const mode = req.query['hub.mode']
    const token = req.query['hub.verify_token']
    const challenge = req.query['hub.challenge']

    if (mode && token) {
      if (mode === 'subscribe' && token === this.token) {
        console.log('WEBHOOK_VERIFIED')
        res.send(challenge)
      }
      else {
        res.sendStatus(403)
      }
    }
  }

  handlePost (req, res, next) {
    const {object, entry} = req.body

    if (object === 'page') {
      entry.forEach((entry) => {
        const webhook_event = entry.messaging[0]
        console.log(webhook_event)
      });

      res.send('EVENT_RECEIVED')
    }
    else {
      res.sendStatus(404)
    }
  }
}

module.exports = Webhook