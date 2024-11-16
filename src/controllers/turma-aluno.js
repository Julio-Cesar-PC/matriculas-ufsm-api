const database = require('../database/connection');

class TurmaAlunoController {

    get(req, res) {
        database.select().from('Turma_Aluno').then((data) => {
            console.log(data);

            res.send(data);
        });
    }
}

module.exports = new TurmaAlunoController();