const database = require('../database/connection');

class ProfessorController {

    get(req, res) {
        database.select().from('Professor')
            .then(data => res.send(data))
            .catch(err => {
                console.log(err);
                res.status(500).send('Erro ao buscar professores!');
            });
    }

    post(req, res) {
        const {Matricula, nome, centro} = req.body;
        if (!centro) return res.status(400).send('Centro n��o informado!');

        const obj = {Matricula, nome, centro};

        database.select().from('Centro').where('codigo_centro', centro)
            .then((exist) => {
                if (exist.length === 0) {
                    res.status(400).send('Centro não encontrado!');
                } else {
                    database.insert(obj).into('Professor').then(() => {
                        res.send('Professor cadastrado com sucesso!');
                    }).catch((err) => {
                        console.log(err);
                        res.status(500).send('Erro ao cadastrar professor!');
                    });
                }
            }).catch((err) => {
            console.log(err);
            res.status(400).send('Centro não encontrado!');
        });
    }

    put(req, res) {
        const {Matricula, nome, centro} = req.body;
        const obj = {Matricula, nome, centro};

        database('Professor').where('Matricula', Matricula)
            .then((exist) => {
                if (exist.length === 0) {
                    res.status(400).send('Professor não encontrado!');
                } else {
                    database.select().from('Centro').where('codigo_centro', centro)
                        .then((exist) => {
                            if (exist.length === 0) {
                                res.status(400).send('Centro não encontrado!');
                            } else {
                                database('Professor').where('Matricula', Matricula).update(obj)
                                    .then(() => {
                                        res.send('Professor atualizado com sucesso!');
                                    }).catch((err) => {
                                    console.log(err);
                                    res.status(500).send('Erro ao atualizar professor!');
                                });
                            }
                        });
                }
            });
    }

    delete(req, res) {
        const {matricula} = req.body;


        database('Professor').where('Matricula', matricula)
            .then((exist) => {
                if (exist.length === 0) {
                    res.status(400).send('Professor não encontrado!');
                } else {
                    database('Turma').where('Matricula_Professor', matricula)
                        .then((exist) => {
                            if (exist.length !== 0) {
                                res.status(400).send('Professor está vinculado a uma disciplina!');
                            } else {
                                database('Professor').where('Matricula', matricula).del()
                                    .then(() => {
                                        res.send('Professor deletado com sucesso!');
                                    }).catch((err) => {
                                    console.log(err);
                                    res.status(500).send('Erro ao deletar professor!');
                                });
                            }
                        });
                }
            });
    }

    getProfessoresCentro(req, res) {
        const {centro} = req.params;
        database.select().from('Professor').where('centro', centro)
            .then(data => res.send(data))
            .catch(err => {
                console.log(err);
                res.status(500).send('Erro ao buscar professores!');
            });
    }
}

module.exports = new ProfessorController();