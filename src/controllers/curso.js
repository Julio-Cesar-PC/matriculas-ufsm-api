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
        const { nome, campus, ementa, centro } = req.body;
        let obj = {
            nome: nome,
            campus: campus,
            ementa: ementa,
            centro: centro
        };

        database('Curso').insert(obj).then(() => {
            res.send('Curso cadastrado com sucesso!');
        }).catch((err) => {
            res.status(500).send('Erro ao cadastrar curso!');
        });
    }
}

module.exports = new CursoController();