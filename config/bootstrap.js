const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

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
      .use('/qms', this.routes())
    
      // Listening to port
      .listen(port, callback())
  }

  routes () {
    const router = express.Router()

    router
      .post('/counter', (req, res) => {
        console.log(req.body)
        const response = 'success'

        res.status(200)
          .send(response)
      })

    return router
  }
}

module.exports = new Bootstrap()