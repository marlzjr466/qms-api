/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('counters', table => {
    table.increments('id')
      .primary()
      .unsigned()

    table.binary('status')
      .defaultTo(0)
      .notNullable()

    table.integer('total_serve')
      .notNullable()
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('counters')
}
