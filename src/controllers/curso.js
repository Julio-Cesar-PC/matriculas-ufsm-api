const database = require('../database/connection');

class CursoController {

    get(req, res) {
        database.select().from('Curso').then((data) => {
            res.send(data);
        }).catch((err) => {
            res.status(500).send('Erro ao buscar os cursos!');
        });
    }

    post(req, res) {
        const {nome, campus, ementa, centro} = req.body;
        let obj = {
            nome: nome,
            campus: campus,
            ementa: ementa,
            centro: centro
        };

        database.select().from('Centro').where('codigo_centro', centro).then((exist) => {
            if (exist.length === 0) {
                res.status(400).send('Centro não encontrado!');
            } else {
                database('Curso').insert(obj).then(() => {
                    res.send('Curso cadastrado com sucesso!');
                }).catch((err) => {
                    console.log(err);
                    res.status(500).send('Erro ao cadastrar curso!');
                });
            }
        }).catch((err) => {
            console.log(err);
            res.status(400).send('Centro não encontrado!');
        });

    }

    put(req, res) {
        const {id, nome, campus, ementa, centro} = req.body;
        let obj = {
            id: id,
            nome: nome,
            campus: campus,
            ementa: ementa,
            centro: centro
        };

        database.select().from('Curso').where('id', id).then((exist) => {
            if (exist.length === 0) {
                res.status(400).send('Curso não encontrado!');
            } else {
                database.select().from('Centro').where('codigo_centro', centro).then((exist) => {
                    if (exist.length === 0) {
                        res.status(400).send('Centro não encontrado!');
                    } else {
                        database('Curso').where('id', id).update(obj).then(() => {
                            res.send('Curso atualizado com sucesso!');
                        }).catch((err) => {
                            console.log(err);
                            res.status(500).send('Erro ao atualizar curso!');
                        });
                    }
                }).catch((err) => {
                    console.log(err);
                    res.status(400).send('Centro não encontrado!');
                });
            }
        });
    }
}

module.exports = new CursoController();