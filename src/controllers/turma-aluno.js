const database = require('../database/connection');
const TurmaAluno = require('../models/turma-aluno');

class TurmaAlunoController {

    get(req, res) {
        database.select().from('Turma_Aluno').then((data) => {
            console.log(data);
            let obj = data.map(item => ({
                ano: item.ano_turma,
                semestre: item.semestre_turma,
                disciplina: item.codigo_disciplina,
                aluno: item.Matricula_Aluno,
                professor: item.Matricula_Professor,
                situacao: item.situacao_aluno
            }));

            res.send(obj);
        }).catch((err) => {
            console.log(err);
            res.send('Erro ao buscar alunos nas turmas!');
        });
    }

    post(req, res) {
        const {ano, semestre, disciplina, aluno, professor, situacao} = req.body;
        let obj = {
            ano_turma: ano,
            semestre_turma: semestre,
            codigo_disciplina: disciplina,
            Matricula_Aluno: aluno,
            Matricula_Professor: professor,
            situacao_aluno: situacao
        };

        database.select().from('Turma').where('ano', ano).where('semestre_turma', semestre)
            .where('codigo_disciplina', disciplina).where('Matricula_Professor', professor).then((data) => {
            if (data.length === 0) {

                res.status(400).send('Turma não encontrada!');
            } else {
                database.select().from('Aluno').where('Matricula', aluno).then((data2) => {
                    if (data2.length === 0) {
                        res.status(400).send('Aluno não encontrado!');
                    } else {
                        database('Turma_Aluno').insert(obj).then(() => {
                            res.send('Aluno cadastrado na turma com sucesso!');
                        }).catch((err) => {
                            console.log(err);
                            res.send('Erro ao cadastrar aluno em uma turma!');
                        });
                    }
                }).catch((err) => {
                    console.log(err);
                    res.status(400).send('Erro ao buscar aluno!');
                });
            }
        }).catch((err) => {
            console.log(err);
            console.log('ano_turma ' + ano)
            console.log('semestre_turma ' + semestre)
            console.log('codigo_disciplina ' + disciplina)
            console.log('Matricula_Professor ' + professor)
            res.status(400).send('Erro ao buscar turma!');
        });
    }
}

module.exports = new TurmaAlunoController();