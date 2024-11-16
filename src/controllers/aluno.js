const database = require('../database/connection');

class AlunoController {

    get(req, res) {
        database.select().from('Aluno').then((data) => {
            console.log(data);

            res.send(data);
        });
    }
}

module.exports = new AlunoController();