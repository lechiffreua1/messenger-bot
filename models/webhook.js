'use strict'

const EE = require('events')
const Https = require('https')

class Webhook extends EE {
  constructor (options) {
    super()

    this.token = options.token
    this.apiUrl = options.apiUrl
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

        if (typeof webhook_event.message === 'object' && webhook_event.message.text) {
          console.log('text', webhook_event.message.text)
          this.apiSend(webhook_event.sender.id)
        }
      })
      res.sendStatus(200)
    }
    else {
      res.sendStatus(404)
    }
  }

  apiSend (psid) {
    const obj = {
      recipient: {
        id: psid
      },
      message: {
        text: 'Hello, human! I\'m bot!'
      }
    }

    const options = {
      protocol: 'https:',
      hostname: this.apiUrl,
      method: 'POST',
      path: `?access_token=${this.token}`,
      headers: {
        'Content-Type': 'application/json'
      }
    }

    console.log('options', options)

    const request = Https.request(options)
    request
      .on('error', (err) => {
        console.error(err)
      })
      .on('response', (res) => {
        const body = []

        res.setEncoding('utf8')
        res
          .on('data', (chunk) => {
            body.push(chunk)
          })
          .on('end', () => {
            console.log(res.statusCode)
            if (res.statusCode === 200) {
              console.log(body.join(''))
            }
          })
      })

    request.write(JSON.stringify(obj))
    request.end()
  }
}

module.exports = Webhook