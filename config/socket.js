const { Server } = require("socket.io")
const moment = require("moment")

class Socket {
  start (port, callback) {
    const io = new Server(port)

    io.on('connection', socket => {
      socket.on('generate-number', number => {
        console.log('new number to be posted ->', number)
      })

      // jobs for current date
      setInterval(() => {
        socket.emit('current-date', moment().format('MMMM Do YYYY, h:mm:ss a'))
      }, 1000)
    })

    callback()
  }
}

module.exports = new Socket()