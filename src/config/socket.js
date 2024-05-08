const { Server } = require("socket.io")
const moment = require("moment")

// service
const queuesService = require('@/services/queues')

class Socket {
  start (port, callback) {
    const io = new Server(port)
    
    io.on('connection', socket => {
      // create new queues
      socket.on('generate-number', async number => {
        await queuesService.create(number)
        socket.broadcast.emit('inqueue-number', number)
      })

      // jobs for current date
      setInterval(() => {
        socket.emit('current-date', moment().format('MMMM Do YYYY, h:mm:ss a'))
      }, 1000)

      setInterval(() => {
        socket.emit('current-time', moment().format('h:mm a'))
      }, 1000)
    })

    callback()
  }
}

module.exports = new Socket()