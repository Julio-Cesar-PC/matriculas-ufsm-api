const database = require('../database/connection');
const Disciplina = require('../models/disciplina');

class DisciplinaController {

    get(req, res) {
        database.select().from('Disciplina').then((data) => {
            console.log(data);

            res.send(data);
        }).catch((err) => {
            console.log(err);
            res.status(500).send('Erro ao buscar disciplinas!');
        });
    }

    post(req, res) {
        const {codigo, nome, semestre, ementa, carga_horaria} = req.body;
        let obj = {
            codigo_disciplina: codigo,
            nome: nome,
            semestre_disciplina: semestre,
            ementa: ementa,
            carga_horaria: carga_horaria
        };

        database.insert(obj).into('Disciplina').then(() => {
            res.send('Disciplina cadastrada com sucesso!');
        }).catch((err) => {
            console.log(err);
            res.status(500).send('Erro ao cadastrar disciplina!');
        });
    }

    put(req, res) {
        const {codigo, nome, semestre, ementa, carga_horaria} = req.body;
        let obj = {
            codigo_disciplina: codigo,
            nome: nome,
            semestre_disciplina: semestre,
            ementa: ementa,
            carga_horaria: carga_horaria
        };const database = require('../database/connection');
const Aluno = require('../models/aluno');
const {checkExistence} = require("../utils/databaseUtil");

class AlunoController {

    get(req, res) {
        database.select().from('Aluno').then((data) => {
            console.log(data);
            let obj = data.map(item => ({matricula: item.matricula, nome: item.nome, curso: item.id_curso}));

            res.send(obj);
        }).catch((err) => {
            console.log(err);
            res.status(500).send('Erro ao buscar os alunos!');
        });
    }

    post(req, res) {
        const {matricula, nome, curso} = req.body;
        let obj = {
            matricula: matricula,
            nome: nome,
            id_curso: curso
        };
        if (curso === undefined || curso === '') {
            res.status(400).send('Curso não informado!');
        }

        database.select().from('Curso').where('id', curso).then((exist) => {
            if (exist.length === 0) {
                res.status(400).send('Curso não encontrado!');
            } else {
                database('Aluno').insert(obj).then(() => {
                    res.send('Aluno cadastrado com sucesso!');
                }).catch((err) => {
                    console.log(err);
                    res.status(500).send('Erro ao cadastrar aluno!');
                });
            }
        }).catch((err) => {
            console.log(err);
            res.status(400).send('Curso não encontrado!');
        });
    }

    put(req, res) {
        const {matricula, nome, curso} = req.body;
        let obj = {
            matricula: matricula,
            nome: nome,
            id_curso: curso
        };

        database('Aluno').where('matricula', matricula).then((exist) => {
            if (exist.length === 0) {
                res.status(400).send('Aluno não encontrado!');
            } else {
                database.select().from('Curso').where('id', curso).then((exist) => {
                    if (exist.length === 0) {
                        res.status(400).send('Curso não encontrado!');
                    } else {
                        database('Aluno').where('matricula', matricula).update(obj).then(() => {
                            res.send('Aluno atualizado com sucesso!');
                        }).catch((err) => {
                            console.log(err);
                            res.status(500).send('Erro ao atualizar aluno!');
                        });
                    }
                }).catch((err) => {
                    console.log(err);
                    res.status(400).send('Curso não encontrado!');
                });
            }
        });
    }

    delete(req, res) {
        const {matricula} = req.body;


        database('Aluno').where('matricula', matricula).then((exist) => {
            if (exist.length === 0) {
                res.status(400).send('Aluno não encontrado!');
            } else {
                database('Turma_Aluno').where('Matricula_Aluno', matricula).then((exist) => {
                    if (exist.length > 0) {
                        res.status(400).send('Aluno está cadastrado em uma turma!');
                    } else {
                        database('Aluno').where('matricula', matricula).del().then(() => {
                            res.send('Aluno deletado com sucesso!');
                        }).catch((err) => {
                            console.log(err);
                            res.status(500).send('Erro ao deletar aluno!');
                        });
                    }
                });
            }
        });
    }
}

module.exports = new AlunoController();

        database('Disciplina').where('codigo_disciplina', codigo).then((exist) => {
            if (exist.length === 0) {
                res.status(400).send('Disciplina não encontrada!');
            } else {
                database('Disciplina').where('codigo_disciplina', codigo).update(obj).then(() => {
                    res.send('Disciplina atualizada com sucesso!');
                }).catch((err) => {
                    console.log(err);
                    res.status(500).send('Erro ao atualizar disciplina!');
                });
            }
        });
    }

    delete(req, res) {
        const {codigo} = req.body;

        database('Disciplina').where('codigo_disciplina', codigo).then((exist) => {
            if (exist.length === 0) {
                res.status(400).send('Disciplina não encontrada!');
            } else {
                database('Turma').where('codigo_disciplina', codigo).then((exist) => {
                    if (exist.length !== 0) {
                        res.status(400).send('Disciplina está vinculada a uma turma!');
                    } else {
                        database('Disciplina').where('codigo_disciplina', codigo).del().then(() => {
                            res.send('Disciplina deletada com sucesso!');
                        }).catch((err) => {
                            console.log(err);
                            res.status(500).send('Erro ao deletar disciplina!');
                        });
                    }
                });
            }
        });
    }
}

module.exports = new DisciplinaController();