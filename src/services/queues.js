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
            if (filter.fields) {
              for (const field of filter.fields) {
                knex.where(field.column, field.operator || '=', field.value)
              }
            } else {
              knex.where(filter.column, filter.operator || '=', filter.value)
            }

            if (filter.sort) {
              knex.orderBy(filter.sort.column || 'id', filter.sort.direction)
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

  async create (body) {
    try {
      await knex('queues')
        .insert({
          ticket: body.ticket,
          serve_by: body.serve_by,
          status: 'waiting',
          created_at: new Date()
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