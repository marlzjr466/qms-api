// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './src/db/dev.db3'
    },
  
    migrations: {
      directory: './src/db/migrations'
    },

    useNullAsDefault: true
  }
}
