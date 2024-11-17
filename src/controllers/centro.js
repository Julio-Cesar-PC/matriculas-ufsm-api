const database = require('../database/connection');

class CentroController {

    get(req, res) {
        database.select().from('Centro').then((data) => {
            let obj = data.map(item => ({ nome: item.codigo_centro }));
            res.send(obj);
        }).catch((err) => {
            console.log(err);
            res.status(500).send('Erro ao buscar os centros!');
        });
    }

    post(req, res) {
        const {nome} = req.body;
        let obj = {
            codigo_centro: nome
        };

        database.insert(obj).into('Centro').then(() => {
            res.send('Centro cadastrado com sucesso!');
        }).catch((err) => {
            console.log(err);
            if (err.code === '23000') {
                res.status(400).send('Centro já cadastrado!');
            }
            res.status(500).send('Erro ao cadastrar centro!');
        });
    }
}

module.exports = new CentroController();