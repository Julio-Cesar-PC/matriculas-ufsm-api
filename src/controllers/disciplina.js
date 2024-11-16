const database = require('../database/connection');

class DisciplinaController {

    get(req, res) {
        database.select().from('Disciplina').then((data) => {
            console.log(data);

            res.send(data);
        });
    }
}

module.exports = new DisciplinaController();