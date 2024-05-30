const express = require('express')
const router = express.Router()

// config
const socket = require('@/config/socket')

// service
const service = require('@/services')
const countersService = require('@/services/counters')
const queuesService = require('@/services/queues')

router
  .post('/counters/:type', async (req, res) => {
    try {
      const body = req.body || {}
      const exec = countersService[req.params.type]
      const response = await exec(body)

      if (['create', 'modify'].includes(req.params.type)) {
        socket.nsQms.emit('refresh', ['counters'])
      }

      res.status(200)
        .send(response)
    } catch (error) {
      console.log(`${req.params.type} error:`, error)
      res.status(400)
        .send(error)
    }
  })

  .post('/queues/:type', async (req, res) => {
    try {
      const body = req.body || {}
      const exec = queuesService[req.params.type]
      const response = await exec(body)

      if (['create', 'modify'].includes(req.params.type)) {
        socket.nsQms.emit('refresh', ['queues'])
      }

      res.status(200)
        .send(response)
    } catch (error) {
      console.log(`${req.params.type} error:`, error)
      res.status(400)
        .send(error)
    }
  })

  .post('/reset', async (req, res) => {
    try {
      const response = await service.reset(req.body)

      socket.nsQms.emit('refresh', [
        'queues',
        'counters'
      ])
      socket.nsQms.emit('reset-session')

      res.status(200)
        .send(response)
    } catch (error) {
      console.log(`reset error:`, error)
      res.status(400)
        .send(error)
    }
  })

  .post('/queue/:type', async (req, res) => {
    try {
      const exec = service[req.params.type]
      const response = await exec(req.body.id)

      socket.nsQms.emit('refresh', [
        'queues',
        'counters'
      ])

      res.status(200)
        .send(response)
    } catch (error) {
      console.log(`${req.params.type} error:`, error)
      res.status(400)
        .send(error)
    }
  })

module.exports = router