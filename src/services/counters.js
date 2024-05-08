const knex = require('@/config/knex')
const socket = require('@/config/socket')

module.exports = {
  async list ({
    is_first: isFirst = false,
    filter = null
  }) {
    try {
      const list = await knex('counters')
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

  async create () {
    try {
      await knex('counters')
        .insert({
          status: 0,
          serving: 0
        })

      return 'success'
    } catch (error) {
      throw error
    }
  },

  async modify ({ filter }) {
    try {
      await knex('counters')
        .where(filter.column, filter.value)
        .update(filter.data)

      return 'success'
    } catch (error) {
      throw error
    }
  }
}