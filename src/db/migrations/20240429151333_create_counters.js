/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('counters', table => {
    table.increments('id')
      .primary()
      .unsigned()

    table.string('name')
      .notNullable()

    table.binary('status')
      .notNullable()

    table.integer('session')
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
