const knex = require('@/config/knex')
const socket = require('@/config/socket')

const self = {
  async list ({
    is_first: isFirst = false,
    filter = null
  }) {
    try {
      const list = await knex('counters')
        .modify(knex => {
          if (filter) {
            if (filter.fields) {
              for (const field of filter.fields) {
                knex.where(field.column, field.operator || '=', field.value)
              }
            } else {
              knex.where(filter.column, filter.operator || '=', filter.value)
            } 
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
          session: 0,
          serving: 0
        })

      return 'success'
    } catch (error) {
      throw error
    }
  },

  async modify ({ filter }) {
    try {
      console.log('filter:', filter)
      await knex('counters')
        .where(filter.column, filter.value)
        .update(filter.data)

      return 'success'
    } catch (error) {
      throw error
    }
  },

  async login ({ filter }) {
    try {
      await self.modify({ filter })

      const res = await self.list({
        is_first: true,
        filter: {
          column: 'id',
          value: filter.value
        }
      })

      return res
    } catch (error) {
      throw error
    }
  },

  async logout ({ filter }) {
    try {
      const res = await self.modify({ filter })
      return res
    } catch (error) {
      throw error
    }
  }
}

module.exports = self