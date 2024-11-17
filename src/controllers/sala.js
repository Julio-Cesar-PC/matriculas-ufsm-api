const database = require('../database/connection');
const Sala = require('../models/sala');
const {checkExistence} = require("../utils/databaseUtil");

class SalaController {

    get(req, res) {
        database.select().from('Sala').then((data) => {
            console.log(data);
            let obj = data.map(item => ({
                centro: item.centro,
                numero: item.numero,
                capacidade: item.capacidade_alunos,
                tipo: item.tipo
            }));

            res.send(obj);
        }).catch((err) => {
            console.log(err);
            res.status(500).send('Erro ao buscar sala!');
        });
    }

    post(req, res) {
        const {centro, numero, capacidade, tipo} = req.body;
        let obj = {
            centro: centro,
            numero: numero,
            capacidade_alunos: capacidade,
            tipo: tipo
        };

        if (centro === undefined || centro === '') {
            res.status(400).send('Centro não informado!');
        }

        database.select().from('Centro').where('codigo_centro', centro).then((exist) => {
            if (exist.length === 0) {
                res.status(400).send('Centro não encontrado!');
            } else {
                database('Sala').insert(obj).then(() => {
                    res.send('Sala cadastrado com sucesso!');
                }).catch((err) => {
                    console.log(err);
                    res.status(500).send('Erro ao cadastrar sala!');
                });
            }
        }).catch((err) => {
            console.log(err);
            res.status(400).send('Centro não encontrado!');
        });
    }
}

module.exports = new SalaController();