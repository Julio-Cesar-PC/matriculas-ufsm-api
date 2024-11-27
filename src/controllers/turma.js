const database = require('../database/connection');

class TurmaController {
    get(req, res) {
        database.select().from('Turma')
            .then(data => {
                const obj = data.map(({
                                          id_turma,
                                          ano,
                                          semestre_turma,
                                          N_vagas,
                                          data_inicio,
                                          data_fim,
                                          codigo_disciplina,
                                          Matricula_Professor,
                                          Centro_Sala,
                                          Numero_Sala,
                                          dia_semana,
                                          hora_inicio,
                                          hora_fim
                                      }) => ({
                    id: id_turma,
                    ano,
                    semestre: semestre_turma,
                    vagas: N_vagas,
                    data_inicio,
                    data_fim,
                    disciplina: codigo_disciplina,
                    professor: Matricula_Professor,
                    centro: Centro_Sala,
                    numero_Sala: Numero_Sala,
                    dia_semana,
                    hora_inicio,
                    hora_fim
                }));
                res.send(obj);
            })
            .catch(err => {
                console.log(err);
                res.status(500).send('Erro ao buscar turma!');
            });
    }

    post(req, res) {
        console.log('pinto: ', req.body)
        const {
            id_turma,
            ano,
            semestre_turma,
            N_vagas,
            data_inicio,
            data_fim,
            codigo_disciplina,
            Matricula_Professor,
            Centro,
            Numero_Sala,
            dia_semana,
            hora_inicio,
            hora_fim,
            id_curso
        } = req.body;
        let obj = {
            id_turma: id_turma,
            ano: ano,
            semestre_turma: semestre_turma,
            N_vagas: N_vagas,
            data_inicio: data_inicio,
            data_fim: data_fim,
            codigo_disciplina: codigo_disciplina,
            Matricula_Professor: Matricula_Professor,
            Centro_Sala: Centro,
            Numero_Sala: Numero_Sala,
            dia_semana: dia_semana,
            hora_inicio: hora_inicio,
            hora_fim: hora_fim,
            id_curso: id_curso
        };
        console.log('murcho: ', obj)

        database.select().from('Disciplina').where('codigo_disciplina', codigo_disciplina)
            .then((data) => {
                if (data.length === 0) {
                    res.status(400).send('Disciplina não encontrada!');
                } else {
                    database.select().from('Professor').where('Matricula', Matricula_Professor)
                        .then((data2) => {
                            if (data2.length === 0) {
                                res.status(400).send('Professor não encontrado!');
                            } else {
                                database.select().from('Sala').where('numero', Numero_Sala).where('centro', Centro)
                                    .then((data3) => {
                                        if (data3.length === 0) {
                                            res.status(400).send('Sala não encontrada!');
                                        } else {
                                            database('Turma').insert(obj).then(() => {
                                                res.send('Turma cadastrada com sucesso!');
                                            }).catch((err) => {
                                                console.log(err);
                                                res.status(500).send('Erro ao cadastrar turma!');
                                            });
                                        }
                                    }).catch((err) => {
                                    console.log(err);
                                    res.status(500).send('Erro ao buscar sala!');
                                });
                            }
                        }).catch((err) => {
                        console.log(err);
                        res.status(400).send('Erro ao buscar professor!');
                    });
                }
            }).catch((err) => {
            console.log(err);
            res.status(400).send('Erro ao buscar disciplina!');
        });
    }

    put(req, res) {
        const {
            id,
            ano,
            semestre,
            vagas,
            data_inicio,
            data_fim,
            disciplina,
            professor,
            Centro,
            numero_Sala,
            dia_semana,
            horario_inicio,
            horario_fim,
            curso
        } = req.body;
        let obj = {
            id_turma: id,
            ano: ano,
            semestre_turma: semestre,
            N_vagas: vagas,
            data_inicio: data_inicio,
            data_fim: data_fim,
            codigo_disciplina: disciplina,
            Matricula_Professor: professor,
            Centro_Sala: Centro,
            Numero_Sala: numero_Sala,
            dia_semana: dia_semana,
            hora_inicio: horario_inicio,
            hora_fim: horario_fim,
            id_curso: curso
        };

        database('Turma').where('id_turma', id)
            .then((exist) => {
                if (exist.length === 0) {
                    res.status(400).send('Turma não encontrada!');
                } else {
                    database.select().from('Disciplina').where('codigo_disciplina', disciplina)
                        .then((data) => {
                            if (data.length === 0) {
                                res.status(400).send('Disciplina não encontrada!');
                            } else {
                                database.select().from('Professor').where('Matricula', professor)
                                    .then((data2) => {
                                        if (data2.length === 0) {
                                            res.status(400).send('Professor não encontrado!');
                                        } else {
                                            database.select().from('Sala').where('numero', numero_Sala).where('centro', Centro)
                                                .then((data3) => {
                                                    if (data3.length === 0) {
                                                        res.status(400).send('Sala não encontrada!');
                                                    } else {
                                                        database('Turma').where('ano', ano).andWhere('semestre_turma', semestre).andWhere('codigo_disciplina', disciplina).andWhere('Matricula_Professor', professor).update(obj)
                                                            .then(() => {
                                                                res.send('Turma atualizada com sucesso!');
                                                            }).catch((err) => {
                                                            console.log(err);
                                                            res.status(500).send('Erro ao atualizar turma!');
                                                        });
                                                    }
                                                }).catch((err) => {
                                                console.log(err);
                                                res.status(500).send('Erro ao buscar sala!');
                                            });
                                        }
                                    }).catch((err) => {
                                    console.log(err);
                                    res.status(400).send('Erro ao buscar professor!');
                                });
                            }
                        });
                }
            });
    }

    delete(req, res) {
        const {ano, semestre, disciplina, professor} = req.body;

        database('Turma').where('ano', ano).andWhere('semestre_turma', semestre).andWhere('codigo_disciplina', disciplina).andWhere('Matricula_Professor', professor)
            .then((exist) => {
                if (exist.length === 0) {
                    res.status(400).send('Turma não encontrada!');
                } else {
                    database('Turma_Aluno').where('ano_turma', ano).andWhere('semestre_turma', semestre).andWhere('codigo_disciplina', disciplina).andWhere('Matricula_Professor', professor)
                        .then((exist) => {
                            if (exist.length !== 0) {
                                res.status(400).send('Turma está vinculada a um aluno!');
                            } else {
                                database('Turma').where('ano', ano).andWhere('semestre_turma', semestre).andWhere('codigo_disciplina', disciplina).andWhere('Matricula_Professor', professor).del()
                                    .then(() => {
                                        res.send('Turma deletada com sucesso!');
                                    }).catch((err) => {
                                    console.log(err);
                                    res.status(500).send('Erro ao deletar turma!');
                                });
                            }
                        });
                }
            });
    }

    // Puxar as turmas disponíveis das quais as disciplinas lecionadas sejam disciplinas em que aluno
    // ainda não foi aprovado (Código disciplina, nome, carga horaria, horário começo e horário fim, professor)
    getTurmasDisponiveis(req, res) {
        const {matricula} = req.params;
        database.select().from('Aluno').where('Matricula', matricula)
            .then((exist) => {
                if (exist.length === 0) {
                    res.status(400).send('Aluno não encontrado!');
                } else {
                    database.select().from('Turma_Aluno').where('Matricula_Aluno', matricula)
                        .then((exist) => {
                            if (exist.length === 0) {
                                res.status(400).send('Aluno não encontrado!');
                            } else {
                                database.select().from('Turma').innerJoin('Turma_Aluno', 'Turma.id_turma', 'Turma_Aluno.id_turma').where('Matricula_Aluno', matricula).whereNot('situacao_aluno', 'Aprovado')
                                    .then((data) => {
                                        const obj = data.map(({
                                                                  codigo_disciplina,
                                                                  Matricula_Professor,
                                                                  dia_semana,
                                                                  hora_inicio,
                                                                  hora_fim
                                                              }) => ({
                                            disciplina: codigo_disciplina,
                                            professor: Matricula_Professor,
                                            dia: dia_semana,
                                            hora_inicio,
                                            hora_fim
                                        }));
                                        res.send(obj);
                                    }).catch((err) => {
                                    console.log(err);
                                    res.status(500).send('Erro ao buscar turmas!');
                                });
                            }
                        });
                }
            });
    }
}

module.exports = new TurmaController();