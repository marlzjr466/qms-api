const express = require('express')
const router = express.Router()

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

      res.status(200)
        .send(response)
    } catch (error) {
      console.log(`${req.params.type} error:`, error)
      res.status(401)
        .send(error)
    }
  })

  .post('/queues/:type', async (req, res) => {
    try {
      const body = req.body || {}
      const exec = queuesService[req.params.type]
      const response = await exec(body)

      res.status(200)
        .send(response)
    } catch (error) {
      console.log(`${req.params.type} error:`, error)
      res.status(401)
        .send(error)
    }
  })

  .post('/reset', async (req, res) => {
    try {
      const response = await service.reset()

      res.status(200)
        .send(response)
    } catch (error) {
      console.log(`reset error:`, error)
      res.status(401)
        .send(error)
    }
  })

  .post('/queue/:type', async (req, res) => {
    try {
      const exec = service[req.params.type]
      const response = await exec(req.body.id)

      res.status(200)
        .send(response)
    } catch (error) {
      console.log(`${req.params.type} error:`, error)
      res.status(401)
        .send(error)
    }
  })

module.exports = router