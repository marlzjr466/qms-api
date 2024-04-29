const knex = require('@/config/knex')

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
      const [id] = await knex('counters')
        .insert({ total_serve: 0 })

      return {
        id,
        status: 0,
        total_serve: 0
      }
    } catch (error) {
      throw error
    }
  },

  async modify ({ filter }) {
    try {
      await knex('counters')
        .where(filter.column, filter.value)
        .update(filter.data)

      return true
    } catch (error) {
      throw error
    }
  },

  async reset () {
    try {
      await knex('counters').truncate()
      return true
    } catch (error) {
      throw error
    }
  }
}