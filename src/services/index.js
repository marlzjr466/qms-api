const knex = require('@/config/knex')

// service
const countersService = require('@/services/counters')
const queuesService = require('@/services/queues')

const self = {
  async reset ({ all = false }) {
    try {
      await knex('queues').truncate()

      if (all) {
        await knex('counters').truncate()
      }

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
          fields: [
            {
              column: 'serve_by',
              value: id
            },
            {
              column: 'status',
              value: 'waiting'
            }
          ]
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

        throw new Error('No available ticket in queue')
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

      queue.serve_by = id
      queue.status = 'serving'

      return queue
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
            status: 'done',
            completed_at: new Date()
          }
        }
      })
      
      const res = await self.serve(id)
      return res
    } catch (error) {
      throw error
    }
  },

  async transfer ({ ticket, user_id }) {
    try {
      await Promise.all([
        countersService.modify({
          filter: {
            column: 'id',
            value: user_id,
            data: {
              serving: ticket
            }
          }
        }),

        queuesService.modify({
          filter: {
            column: 'id',
            value: ticket,
            data: {
              serve_by: user_id
            }
          }
        })
      ])
      
      return 'success'
    } catch (error) {
      throw error
    }
  }
}

module.exports = self