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
        const { codigo_disciplina, nome, semestre_disciplina, ementa, carga_horaria, id_curso } = req.body;
    
        if (!codigo_disciplina || !nome || !semestre_disciplina || !carga_horaria || !id_curso) {
            return res.status(400).send('Todos os campos obrigatórios devem ser preenchidos!');
        }
    
        const obj = {
            codigo_disciplina,
            nome,
            semestre_disciplina,
            ementa,
            carga_horaria,
            id_curso
        };
    
        database.insert(obj).into('Disciplina')
            .then(() => {
                res.send('Disciplina cadastrada com sucesso!');
            })
            .catch((err) => {
                console.error(err);
                res.status(500).send('Erro ao cadastrar disciplina!');
            });
    }

    put(req, res) {
        const {codigo, nome, semestre, ementa, carga_horaria, curso} = req.body;
        let obj = {
            codigo_disciplina: codigo,
            nome: nome,
            semestre_disciplina: semestre,
            ementa: ementa,
            carga_horaria: carga_horaria,
            id_curso: curso
        };

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
        console.log('pionto: ', req.params)
        const { codigo } = req.params;

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