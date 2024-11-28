const database = require('../database/connection');
const Sala = require('../models/sala');
const {checkExistence} = require("../utils/databaseUtil");

class SalaController {

    get(req, res) {
        database.select().from('Sala')
            .then(data => {
                const obj = data.map(({centro, numero, capacidade_alunos, tipo}) => ({
                    centro, numero, capacidade: capacidade_alunos, tipo
                }));
                res.send(obj);
            })
            .catch(err => {
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

        database.select().from('Centro').where('codigo_centro', centro)
            .then((exist) => {
                if (exist.length === 0) {
                    res.status(400).send('Centro não encontrado!');
                } else {
                    database('Sala').insert(obj)
                        .then(() => {
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

    put(req, res) {
        const {centro, numero, capacidade, tipo} = req.body;
        let obj = {
            centro: centro,
            numero: numero,
            capacidade_alunos: capacidade,
            tipo: tipo
        };

        database('Sala').where('numero', numero).andWhere('centro', centro)
            .then((exist) => {
                if (exist.length === 0) {
                    res.status(400).send('Sala não encontrada!');
                } else {
                    database.select().from('Centro').where('codigo_centro', centro)
                        .then((exist) => {
                            if (exist.length === 0) {
                                res.status(400).send('Centro não encontrado!');
                            } else {
                                database('Sala').where('numero', numero).andWhere('centro', centro).update(obj)
                                    .then(() => {
                                        res.send('Sala atualizado com sucesso!');
                                    }).catch((err) => {
                                    console.log(err);
                                    res.status(500).send('Erro ao atualizar sala!');
                                });
                            }
                        });
                }
            });
    }

    delete(req, res) {
        const {centro, numero} = req.body;

        database('Sala').where('numero', numero).andWhere('centro', centro)
            .then((exist) => {
                if (exist.length === 0) {
                    res.status(400).send('Sala não encontrada!');
                } else {
                    database('Turma').where('numero_sala', numero).andWhere('centro_sala', centro)
                        .then((exist) => {
                            if (exist.length > 0) {
                                res.status(400).send('Sala está sendo utilizada em uma turma!');
                            } else {
                                database('Sala').where('numero', numero).andWhere('centro', centro).del()
                                    .then(() => {
                                        res.send('Sala deletada com sucesso!');
                                    }).catch((err) => {
                                    console.log(err);
                                    res.status(500).send('Erro ao deletar sala!');
                                });
                            }
                        });
                }
            });
    }

    constructor() {
        this.getSalasDisponiveis = this.getSalasDisponiveis.bind(this);
        this.validarConflitos = this.validarConflitos.bind(this);
        this.validarHora = this.validarHora.bind(this);
    }

    validarConflitos(horarios) {
        let conflitos = [];
        for (let i = 0; i < horarios.length; i++) {
            for (let j = i + 1; j < horarios.length; j++) {
                const horario1 = horarios[i];
                const horario2 = horarios[j];

                if (horario1.dia === horario2.dia) {
                    if (horario1.horaInicio < horario2.horaFim && horario1.horaFim > horario2.horaInicio) {
                        conflitos.push(`Conflito entre ${horario1.dia} das ${horario1.horaInicio} até ${horario1.horaFim} e ${horario2.dia} das ${horario2.horaInicio} até ${horario2.horaFim}`);
                    }
                }
            }
        }
        return conflitos;
    }

    validarHora(hora) {
        const regexHora = /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/;
        return regexHora.test(hora);
    }

    async getSalasDisponiveis(req, res) {
        const centro = req.body[0]?.centro;
    
        if (!centro) {
            return res.status(400).send('Centro ausente ou inválido.');
        }
    
        const horarios = req.body;
    
        if (!Array.isArray(horarios)) {
            return res.status(400).send('Horários inválidos ou ausentes.');
        }
    
        const conflitos = this.validarConflitos(horarios);
        if (conflitos.length > 0) {
            return res.status(400).send(`Conflitos de horário encontrados: ${conflitos.join(", ")}`);
        }
    
        for (const horario of horarios) {
            const { dia, horaInicio, horaFim } = horario;
    
            const diasValidos = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'];
            if (!diasValidos.includes(dia)) {
                return res.status(400).send(`Dia inválido: ${dia}`);
            }
    
            if (horaInicio >= horaFim) {
                return res.status(400).send(`O horário de início deve ser antes do horário de fim para ${dia}`);
            }
    
            if (!this.validarHora(horaInicio) || !this.validarHora(horaFim)) {
                return res.status(400).send(`Horário inválido: Início: ${horaInicio}, Fim: ${horaFim}`);
            }
        }
    
        let salasDisponiveis = [];
        let erros = [];
    
        for (const horario of horarios) {
            const { dia, horaInicio, horaFim } = horario;
    
            try {
                const data = await database.raw(`CALL SalasLivres(?, ?, ?, ?)`, [centro, dia, horaInicio, horaFim]);
                const salas = data[0][0];
    
                if (salas && salas.length > 0) {
                    salasDisponiveis = [...salasDisponiveis, ...salas];
                }
            } catch (err) {
                console.log(err);
                erros.push(`Erro ao buscar salas para ${dia} das ${horaInicio} até ${horaFim}`);
            }
        }
    
        if (salasDisponiveis.length === 0) {
            return res.status(404).send('Nenhuma sala disponível encontrada para os horários informados.');
        }
    
        if (erros.length > 0) {
            return res.status(500).send(erros.join(", "));
        }
    
        const salasUnicas = Array.from(new Map(salasDisponiveis.map(sala => [sala.numero_sala, sala])).values());
    
        return res.status(200).send(salasUnicas);
    }
    
}

module.exports = new SalaController();