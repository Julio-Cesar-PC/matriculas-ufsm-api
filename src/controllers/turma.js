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
    async getTurmasDisponiveis(req, res) {
        const matriculaAluno = req.params.matricula;
    
        try {
            // 1. Obter as disciplinas disponíveis para o aluno usando a procedure GetDisciplinasDisponiveis
            const disciplinasDisponiveis = await database.raw('CALL GetDisciplinasDisponiveis(?)', [matriculaAluno]);
    
            // Se não houver disciplinas disponíveis, retornar erro
            if (disciplinasDisponiveis[0].length === 0) {
                return res.status(404).send('Nenhuma disciplina disponível para o aluno!');
            }
    
            // 2. Extrair os códigos das disciplinas disponíveis para o aluno
            const codigosDisciplinasDisponiveis = disciplinasDisponiveis[0][0].map(d => d.codigo_disciplina);
    
            // 3. Buscar as turmas disponíveis para as disciplinas encontradas
            const turmasDisponiveis = await database('Turma as t')
                .join('Disciplina as d', 't.codigo_disciplina', '=', 'd.codigo_disciplina')
                .leftJoin('Turma_Aluno as ta', function() {
                    this.on('ta.id_turma', '=', 't.id_turma')
                        .andOn('ta.Matricula_Aluno', '=', database.raw('?', [matriculaAluno]));  // Verifica se o aluno já está matriculado
                })
                .whereIn('t.codigo_disciplina', codigosDisciplinasDisponiveis) // Só busca as turmas das disciplinas disponíveis
                .andWhere('ta.id_turma', null) // Verifica que o aluno ainda não está matriculado nas turmas
                .select(
                    't.id_turma',
                    't.codigo_disciplina',
                    'd.nome as nome_disciplina',
                    't.semestre_turma',
                    't.hora_inicio',
                    't.hora_fim',
                    't.Matricula_Professor',
                    't.Numero_Sala',
                    't.dia_semana'
                );
    
            // 4. Se não houver turmas disponíveis
            if (turmasDisponiveis.length === 0) {
                return res.status(404).send('Nenhuma turma disponível para o aluno!');
            }
    
            // 5. Retornar as turmas disponíveis
            return res.status(200).json(turmasDisponiveis);
    
        } catch (error) {
            console.error('Erro ao buscar turmas disponíveis:', error);
            return res.status(500).json({ error: 'Erro ao buscar turmas disponíveis.' });
        }
    }
}
    

module.exports = new TurmaController();