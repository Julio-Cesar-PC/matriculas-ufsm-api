var knex = require('knex')({
        client: 'mysql', connection: {
            host: 'localhost',
            user: 'your_database_user',
            password: 'your_database_password',
            database: 'your_database'
        }
    })
;module.exports = knex;