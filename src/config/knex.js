const knex = require('knex')
const config = require('@root/knexfile')['development']

module.exports = knex(config)