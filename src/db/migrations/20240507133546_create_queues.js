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
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('queues')
};
