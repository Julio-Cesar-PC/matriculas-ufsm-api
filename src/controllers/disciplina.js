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
        };

        database('Disciplina').where('codigo_disciplina',codigo).then((exist) => {
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
}

module.exports = new DisciplinaController();