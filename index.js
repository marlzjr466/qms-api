const socket = require('./config/socket')
const bootstrap = require('./config/bootstrap')

const apps = [
  { name: 'Server', config: bootstrap, port: 8000 },
  { name: 'Socket', config: socket, port: 8001 }
]

apps.forEach(app => {
  app.config
    .start(app.port, () => {
      console.log(`${app.name} running at http://localhost:${app.port}`)
    })
})