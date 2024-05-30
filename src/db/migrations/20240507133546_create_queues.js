/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('queues', table => {
    table.increments('id')
      .primary()
      .unsigned()

    table.integer('ticket')
      .defaultTo(0)
      .notNullable()

    table.integer('serve_by')
      .nullable()

    table.enu('status', ['waiting', 'serving', 'done'])
      .notNullable()

    table.timestamp('created_at')
      .defaultTo(knex.fn.now())

    table.timestamp('completed_at')
      .defaultTo(knex.fn.now())
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('queues')
};
