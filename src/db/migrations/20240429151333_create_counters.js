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
      .notNullable()

    table.integer('serving')
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
