const knex = require('@/config/knex')

module.exports = {
  async list ({
    is_first: isFirst = false,
    filter = null
  }) {
    try {
      const list = await knex('queues')
        .modify(knex => {
          if (filter) {
            knex.where(filter.column, filter.value)
          }

          if (isFirst) {
            knex.first()
          }
        })
      
      return list
    } catch (error) {
      throw error
    }
  },

  async create (ticket = 0) {
    try {
      await knex('queues')
        .insert({
          ticket,
          status: 'waiting'
        })

      return 'success'
    } catch (error) {
      throw error
    }
  },

  async modify ({ filter }) {
    try {
      await knex('queues')
        .where(filter.column, filter.value)
        .update(filter.data)

      return 'success'
    } catch (error) {
      throw error
    }
  }
}