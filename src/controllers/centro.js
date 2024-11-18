const database = require('../database/connection');

class CentroController {

    get(req, res) {
        database.select().from('Centro').then((data) => {
            let obj = data.map(item => ({nome: item.codigo_centro}));
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

    put(req, res) {
        const {original, novo} = req.body;
        let obj = {
            codigo_centro: novo
        };

        database('Centro').where('codigo_centro', original).then((exist) => {
            if (exist.length === 0) {
                res.status(400).send('Centro não encontrado!');
            } else {
                database('Centro').where('codigo_centro', original).update(obj).then(() => {
                    res.send('Centro atualizado com sucesso!');
                }).catch((err) => {
                    console.log(err);
                    res.status(500).send('Erro ao atualizar centro!');
                });
            }
        });
    }

    delete(req, res) {
        const {nome} = req.body;
        database('Centro').where('codigo_centro', nome).then((exist) => {
            if (exist.length === 0) {
                res.status(400).send('Centro não encontrado!');
            } else {
                database.select().from('Sala').where('centro', nome).then((data) => {
                    if (data.length > 0) {
                        res.status(400).send('Centro está sendo utilizado em uma sala!');
                    } else {
                        database.select().from('Curso').where('centro', nome).then((data) => {
                            if (data.length > 0) {
                                res.status(400).send('Centro está sendo utilizado em um curso!');
                            } else {
                                database.select().from('Professor').where('centro', nome).then((data) => {
                                    if (data.length > 0) {
                                        res.status(400).send('Centro está sendo utilizado em um professor!');
                                    } else {
                                        database('Centro').where('codigo_centro', nome).del().then(() => {
                                            res.send('Centro deletado com sucesso!');
                                        }).catch((err) => {
                                            console.log(err);
                                            res.status(500).send('Erro ao deletar centro!');
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    }
}

module.exports = new CentroController();