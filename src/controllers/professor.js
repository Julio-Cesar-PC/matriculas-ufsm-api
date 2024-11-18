const database = require('../database/connection');
const Professor = require('../models/professor');
const {checkExistence} = require("../utils/databaseUtil");

class ProfessorController {

    get(req, res) {
        database.select().from('Professor').then((data) => {
            console.log(data);
            res.send(data);
        }).catch((err) => {
            console.log(err);
            res.status(500).send('Erro ao buscar professores!');
        });
    }

    post(req, res) {
        const {Matricula, nome, centro} = req.body;
        let obj = {
            Matricula: Matricula,
            nome: nome,
            centro: centro
        };

        if (centro === undefined || centro === '') {
            res.status(400).send('Centro não informado!');
        }

        database.select().from('Centro').where('codigo_centro', centro).then((exist) => {
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
        let obj = {
            Matricula: Matricula,
            nome: nome,
            centro: centro
        };

        database('Professor').where('Matricula', Matricula).then((exist) => {
            if (exist.length === 0) {
                res.status(400).send('Professor não encontrado!');
            } else {
                database.select().from('Centro').where('codigo_centro', centro).then((exist) => {
                    if (exist.length === 0) {
                        res.status(400).send('Centro não encontrado!');
                    } else {
                        database('Professor').where('Matricula', Matricula).update(obj).then(() => {
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
}

module.exports = new ProfessorController();