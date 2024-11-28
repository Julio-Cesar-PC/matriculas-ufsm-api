let knex = require('knex')({
    client: 'mysql2', connection: {
        host: 'localhost',
        user: 'root',
        password: '0804',
        database: 'matriculas'
    }
});
module.exports = knex;