const database = require('../database/connection');

class CursoController {

    get(req, res) {
        database.select().from('Curso').then((data) => {
            console.log(data);

            res.send(data);
        });
    }
}

module.exports = new CursoController();