const database = require('../database/connection');

class TurmaController {
    get(req, res) {
        database.select().from('Turma').then((data) => {
            console.log(data);

            res.send(data);
        });
    }

}

module.exports = new TurmaController();