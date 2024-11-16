let knex = require('knex')({
    client: 'mysql2', connection: {
        host: 'localhost',
        user: 'feather',
        password: 'strong_password',
        database: 'matriculas'
    }
});
module.exports = knex;