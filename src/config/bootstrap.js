const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const handler = require('@/handler')

class Bootstrap {
  constructor () {
    this.app = express()
  }

  async start (port, callback) {
    this.app
      // Used to handle cross domain
      .use(cors())

      // Used to accept data as json
      .use(bodyParser.json())

      // Used to handle form data
      .use(bodyParser.urlencoded({ extended: true }))

      // Parse an HTML body into a string
      .use(bodyParser.text({ type: '*/*' }))

      // log all requests
      .use(morgan('dev'))

      // init prefix and router
      .use('/qms', handler)
    
      // Listening to port
      .listen(port, callback())
  }
}

module.exports = new Bootstrap()