const express = require('express')
const router = express.Router()

// service
const service = require('@/services')

router
  .get('/counter', (_, res) => {
    const response = service.store()

    res.status(200)
      .send(response)
  })

module.exports = router