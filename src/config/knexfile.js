// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/qms.db3'
    }
  },

  useNullAsDefault: true,

  migrations: {
    directory: './data/migrations'
  },

  seeds: {
    director: './data/seeds'
  }
}
