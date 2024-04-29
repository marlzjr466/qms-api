const express = require('express')
const router = express.Router()

// service
const service = require('@/services')

router
  .post('/:type', async (req, res) => {
    try {
      const body = req.body || {}
      const exec = service[req.params.type]
      const response = await exec(body)

      res.status(200)
        .send(response)
    } catch (error) {
      console.log(`${req.params.type} error:`, error)
      res.status(401)
        .send(error)
    }
  })

module.exports = router