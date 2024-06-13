const { Server } = require("socket.io")
const moment = require("moment")
const _ = require('lodash')

// service
const queuesService = require('@/services/queues')

class Socket {
  constructor () {
    this.client = null
  }

  get namespaces () {
    return new Set([
      'qms'
    ])
  }

  start (port, callback) {
    // const io = new Server(port)
    this.client = new Server(port, {
      transports: ['websocket', 'polling'],
      rejectUnauthorized: false
    })

    this.namespaces.forEach(namespace => {
      const ns = `ns${_.capitalize(namespace)}`
      this[ns] = this.client.of(namespace)

      this[ns].on('connection', socket => {
        // create new queues
        socket.on('generate-number', async data => {
          await queuesService.create({
            ticket: data.queue_number,
            serve_by: data.id
          })
          socket.broadcast.emit('refresh', ['queues'])
        })

        // start session
        socket.on('start-session', () => {
          socket.broadcast.emit('session-start')
        })

        // stop session
        socket.on('stop-session', () => {
          socket.broadcast.emit('session-stop')
        })

        // call again
        socket.on('call-again', data => {
          console.log('call-again:', data)
          socket.broadcast.emit('monitor:call-again', data)
        })

        // call again
        socket.on('transfer-ticket', data => {
          socket.broadcast.emit(`transfered-ticket:${data.user_id.to}`, data)
        })

        // jobs for current date
        setInterval(() => {
          socket.emit('current-date', moment().format('MMMM Do YYYY, h:mm:ss a'))
        }, 1000)

        setInterval(() => {
          socket.emit('current-time', moment().format('h:mm a'))
        }, 1000)
      })
    })

    callback()
  }
}

module.exports = new Socket()