const knex = require('@/config/knex')

// service
const countersService = require('@/services/counters')
const queuesService = require('@/services/queues')

const self = {
  async reset () {
    try {
      await knex('counters').truncate()
      await knex('queues').truncate()

      return 'success'
    } catch (error) {
      throw error
    }
  },

  async serve (id) {
    try {
      const queue = await queuesService.list({
        is_first: true,
        filter: {
          column: 'status',
          value: 'waiting'
        }
      })

      if (!queue) {
        await countersService.modify({
          filter: {
            column: 'id',
            value: id,
            data: {
              serving: 0
            }
          }
        })

        return ('No available ticket in queue')
      }

      await queuesService.modify({
        filter: {
          column: 'id',
          value: queue.id,
          data: {
            serve_by: id,
            status: 'serving'
          }
        }
      })

      await countersService.modify({
        filter: {
          column: 'id',
          value: id,
          data: {
            serving: queue.id
          }
        }
      })

      return 'success'
    } catch (error) {
      throw error
    }
  },

  async next (id) {
    try {
      const counter = await countersService.list({
        is_first: true,
        filter: {
          column: 'id',
          value: id
        }
      })

      await queuesService.modify({
        filter: {
          column: 'id',
          value: counter.serving,
          data: {
            status: 'done'
          }
        }
      })
      
      const res = await self.serve(id)
      return res
    } catch (error) {
      throw error
    }
  }
}

module.exports = self