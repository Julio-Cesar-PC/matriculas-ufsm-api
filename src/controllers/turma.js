const database = require('../database/connection');

class TurmaController {
    get(req, res) {
        database.select().from('Turma').then((data) => {
            console.log(data);
            let obj = data.map(item => ({
                ano: item.ano,
                semestre: item.semestre_turma,
                vagas: item.N_vagas,
                data_inicio: item.data_inicio,
                data_fim: item.data_fim,
                disciplina: item.codigo_disciplina,
                professor: item.Matricula_Professor,
                centro: item.Centro_Sala,
                numero_Sala: item.Numero_Sala,
                dia_semana: item.dia_semana,
                hora_inicio: item.hora_inicio,
                hora_fim: item.hora_fim
            }));
            res.send(obj);
        }).catch((err) => {
            console.log(err);
            res.status(500).send('Erro ao buscar turma!');
        });
    }

    post(req, res) {
        const {
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
            horario_fim
        } = req.body;
        let obj = {
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
            hora_fim: horario_fim
        };

        console.log(disciplina);
        database.select().from('Disciplina').where('codigo_disciplina', disciplina).then((data) => {
            if (data.length === 0) {
                res.status(400).send('Disciplina não encontrada!');
            } else {
                database.select().from('Professor').where('Matricula', professor).then((data2) => {
                    if (data2.length === 0) {
                        res.status(400).send('Professor não encontrado!');
                    } else {
                        database.select().from('Sala').where('numero', numero_Sala).where('centro', Centro).then((data3) => {
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
            horario_fim
        } = req.body;
        let obj = {
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
            hora_fim: horario_fim
        };

        database('Turma').where('ano', ano).andWhere('semestre_turma', semestre).andWhere('codigo_disciplina', disciplina).andWhere('Matricula_Professor', professor).then((exist) => {
            if (exist.length === 0) {
                res.status(400).send('Turma não encontrada!');
            } else {
                database.select().from('Disciplina').where('codigo_disciplina', disciplina).then((data) => {
                    if (data.length === 0) {
                        res.status(400).send('Disciplina não encontrada!');
                    } else {
                        database.select().from('Professor').where('Matricula', professor).then((data2) => {
                            if (data2.length === 0) {
                                res.status(400).send('Professor não encontrado!');
                            } else {
                                database.select().from('Sala').where('numero', numero_Sala).where('centro', Centro).then((data3) => {
                                    if (data3.length === 0) {
                                        res.status(400).send('Sala não encontrada!');
                                    } else {
                                        database('Turma').where('ano', ano).andWhere('semestre_turma', semestre).andWhere('codigo_disciplina', disciplina).andWhere('Matricula_Professor', professor).update(obj).then(() => {
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

        database('Turma').where('ano', ano).andWhere('semestre_turma', semestre).andWhere('codigo_disciplina', disciplina).andWhere('Matricula_Professor', professor).then((exist) => {
            if (exist.length === 0) {
                res.status(400).send('Turma não encontrada!');
            } else {
                database('Turma_Aluno').where('ano_turma', ano).andWhere('semestre_turma', semestre).andWhere('codigo_disciplina', disciplina).andWhere('Matricula_Professor', professor).then((exist) => {
                    if (exist.length !== 0) {
                        res.status(400).send('Turma está vinculada a um aluno!');
                    } else {
                        database('Turma').where('ano', ano).andWhere('semestre_turma', semestre).andWhere('codigo_disciplina', disciplina).andWhere('Matricula_Professor', professor).del().then(() => {
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
}

module.exports = new TurmaController();