const database = require('../database/connection');

class TurmaAlunoController {

    get(req, res) {
        database.select().from('Turma_Aluno')
            .then((data) => {
                console.log(data);
                let obj = data.map(item => ({
                    turma: item.id_turma,
                    aluno: item.Matricula_Aluno,
                    situacao: item.situacao_aluno
                }));

                res.send(obj);
            }).catch((err) => {
            console.log(err);
            res.send('Erro ao buscar alunos nas turmas!');
        });
    }

    post(req, res) {
        const matriculas = req.body; // Array com múltiplos objetos
    
        // Para cada matrícula
        matriculas.forEach(({ turma, aluno, situacao }) => {
            let obj = {
                id_turma: turma,
                Matricula_Aluno: aluno,
                situacao_aluno: situacao,
            };
    
            // Verifique se a turma existe
            database
                .select()
                .from("Turma")
                .where("id_turma", turma)
                .then((data) => {
                    if (data.length === 0) {
                        return res.status(400).send("Turma não encontrada!");
                    } else {
                        // Verifique se o aluno existe
                        database
                            .select()
                            .from("Aluno")
                            .where("Matricula", aluno)
                            .then((data2) => {
                                if (data2.length === 0) {
                                    return res.status(400).send("Aluno não encontrado!");
                                } else {
                                    // Insira a matrícula na tabela Turma_Aluno
                                    database("Turma_Aluno")
                                        .insert(obj)
                                        .then(() => {
                                            console.log(`Aluno ${aluno} cadastrado na turma ${turma}`);
                                        })
                                        .catch((err) => {
                                            console.log(err);
                                            res.status(500).send("Erro ao cadastrar aluno em uma turma!");
                                        });
                                }
                            })
                            .catch((err) => {
                                console.log(err);
                                res.status(400).send("Erro ao buscar aluno!");
                            });
                    }
                })
                .catch((err) => {
                    console.log(err);
                    res.status(400).send("Erro ao buscar turma!");
                });
        });
    
        res.send("Matrículas processadas com sucesso!");
    }
    

    put(req, res) {
        const {turma, aluno, professor, situacao} = req.body;
        let obj = {
            turma: turma,
            Matricula_Aluno: aluno,
            situacao_aluno: situacao
        };

        database.select().from('Turma_Aluno').where('id_turma', turma).where('Matricula_Aluno', aluno)
            .then((exist) => {
                if (exist.length === 0) {
                    res.status(400).send('Aluno não encontrado na turma!');
                } else {
                    database.select().from('Turma').where('id_turma', turma)
                        .then((data) => {
                            if (data.length === 0) {
                                res.status(400).send('Turma não encontrada!');
                            } else {
                                database.select().from('Aluno').where('Matricula', aluno)
                                    .then((data2) => {
                                        if (data2.length === 0) {
                                            res.status(400).send('Aluno não encontrado!');
                                        } else {
                                            database('Turma_Aluno').where('ano_turma', ano).where('semestre_turma', semestre)
                                                .where('codigo_disciplina', disciplina).where('Matricula_Aluno', aluno)
                                                .where('Matricula_Professor', professor).update(obj)
                                                .then(() => {
                                                    res.send('Aluno atualizado na turma com sucesso!');
                                                }).catch((err) => {
                                                console.log(err);
                                                res.send('Erro ao atualizar aluno em uma turma!');
                                            });
                                        }
                                    }).catch((err) => {
                                    console.log(err);
                                    res.status(400).send('Erro ao buscar aluno!');
                                });
                            }
                        }).catch((err) => {
                        console.log(err);
                        res.status(400).send('Erro ao buscar turma!');
                    });
                }
            });
    }

    delete(req, res) {
        const {ano, semestre, disciplina, aluno, professor} = req.body;

        database.select().from('Turma_Aluno').where('id_turma', turma).where('Matricula_Aluno', aluno)
            .then((exist) => {
                if (exist.length === 0) {
                    res.status(400).send('Aluno não encontrado na turma!');
                } else {
                    database('Turma_Aluno').where('ano_turma', ano).where('semestre_turma', semestre)
                        .where('codigo_disciplina', disciplina).where('Matricula_Aluno', aluno).where('Matricula_Professor', professor).del()
                        .then(() => {
                            res.send('Aluno deletado da turma com sucesso!');
                        }).catch((err) => {
                        console.log(err);
                        res.send('Erro ao deletar aluno em uma turma!');
                    });
                }
            });
    }

    // Puxar nome da disciplina + estado da solicitação
    // (no banco está como "situacao_aluno" na tabela Turma_Aluno)
    getTurmasAluno(req, res) {
        const {matricula} = req.params;

        database.select().from('Turma_Aluno').where('id_turma', turma).where('Matricula_Aluno', aluno)
            .then((exist) => {
                if (exist.length === 0) {
                    res.status(400).send('Aluno não encontrado na turma!');
                } else {
                    database.select().from('Turma_Aluno').where('Matricula_Aluno', matricula).innerJoin('Turma', 'Turma.id_turma', 'Turma_Aluno.id_turma')
                        .then((data) => {
                            let obj = data.map(item => ({
                                turma: item.id_turma,
                                disciplina: item.codigo_disciplina,
                                situacao: item.situacao_aluno
                            }));

                            res.send(obj);
                        }).catch((err) => {
                        console.log(err);
                        res.send('Erro ao buscar turmas do aluno!');
                    });
                }
            });
    }

    getGradeSemanal(req, res) {
        const { matricula } = req.params;

        // Definindo os dias da semana
        const diasSemana = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];
        const diaAtual = diasSemana[new Date().getDay()]; // Dia da semana atual

        database.select('Turma.codigo_disciplina', 'Turma.dia_semana', 'Turma.hora_inicio', 'Turma.hora_fim', 'Turma_Aluno.situacao_aluno')
            .from('Turma_Aluno')
            .innerJoin('Turma', 'Turma.id_turma', 'Turma_Aluno.id_turma') // Relaciona turmas ao aluno
            .where('Turma_Aluno.Matricula_Aluno', matricula)
            .andWhere('Turma.dia_semana', diaAtual) // Filtro pelo dia atual
            .then((turmas) => {
                if (turmas.length === 0) {
                    res.send(`Nenhuma aula encontrada para hoje (${diaAtual}).`);
                } else {
                    const grade = turmas.map(({
                        codigo_disciplina,
                        dia_semana,
                        hora_inicio,
                        hora_fim,
                        situacao_aluno
                    }) => ({
                        disciplina: codigo_disciplina,
                        dia: dia_semana,
                        hora_inicio,
                        hora_fim,
                        situacao: situacao_aluno
                    }));

                    res.send(grade);
                }
            }).catch((err) => {
                console.log(err);
                res.status(500).send('Erro ao buscar a grade semanal do aluno!');
            });
    }



}

module.exports = new TurmaAlunoController();