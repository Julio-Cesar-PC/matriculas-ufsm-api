// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import {resolve} from '@feathersjs/schema'
import {Type, getValidator, querySyntax} from '@feathersjs/typebox'
import type {Static} from '@feathersjs/typebox'

import type {HookContext} from '../../declarations'
import {dataValidator, queryValidator} from '../../validators'
import type {TurmaService} from './turma.class'

// Main data model schema
/*
CREATE TABLE Turma (
    ano YEAR NOT NULL,
    semestre_turma ENUM('1','2') NOT NULL,
    N_vagas INT,
    data_inicio DATE,
    data_fim DATE,
    codigo_disciplina VARCHAR(10) NOT NULL,
    Matricula_Professor BIGINT NOT NULL,
    Centro_Sala VARCHAR(10) NOT NULL,
    Numero_Sala INT NOT NULL,
    dia_semana ENUM('Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom') NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fim TIME NOT NULL,
    PRIMARY KEY (ano, semestre_turma, codigo_disciplina, Matricula_Professor),
    FOREIGN KEY (codigo_disciplina) REFERENCES Disciplina(codigo_disciplina),
    FOREIGN KEY (Matricula_Professor) REFERENCES Professor(Matricula),
    FOREIGN KEY (Centro_Sala, Numero_Sala) REFERENCES Sala(centro, numero),
    CHECK (hora_inicio >= '07:30:00' AND hora_inicio <= '20:00:00'),
    CHECK (hora_fim >= ADDTIME(hora_inicio, '01:00:00') AND hora_fim <= ADDTIME(hora_inicio, '04:00:00')),
    CHECK (hora_fim <= '23:00:00')
);
 */
export const turmaSchema = Type.Object(
    {
      ano: Type.Integer(),
      semestre_turma: Type.String({maxLength: 1}),
      N_vagas: Type.Optional(Type.Integer()),
      data_inicio: Type.Optional(Type.String({format: 'date'})),
      data_fim: Type.Optional(Type.String({format: 'date'})),
      codigo_disciplina: Type.String({maxLength: 10}),
      Matricula_Professor: Type.Integer(),
      Centro_Sala: Type.String({maxLength: 10}),
      Numero_Sala: Type.Integer(),
      dia_semana: Type.String({maxLength: 3}),
      hora_inicio: Type.String({format: 'time'}),
      hora_fim: Type.String({format: 'time'})
    },
    {$id: 'Turma', additionalProperties: false}
)
export type Turma = Static<typeof turmaSchema>
export const turmaValidator = getValidator(turmaSchema, dataValidator)
export const turmaResolver = resolve<Turma, HookContext<TurmaService>>({})

export const turmaExternalResolver = resolve<Turma, HookContext<TurmaService>>({})

// Schema for creating new entries
export const turmaDataSchema = Type.Pick(turmaSchema, [
  'ano', 'semestre_turma', 'N_vagas', 'data_inicio', 'data_fim',
  'codigo_disciplina', 'Matricula_Professor', 'Centro_Sala',
  'Numero_Sala', 'dia_semana', 'hora_inicio', 'hora_fim'
], {
  $id: 'TurmaData'
})
export type TurmaData = Static<typeof turmaDataSchema>
export const turmaDataValidator = getValidator(turmaDataSchema, dataValidator)
export const turmaDataResolver = resolve<Turma, HookContext<TurmaService>>({})

// Schema for updating existing entries
export const turmaPatchSchema = Type.Partial(turmaSchema, {
  $id: 'TurmaPatch'
})
export type TurmaPatch = Static<typeof turmaPatchSchema>
export const turmaPatchValidator = getValidator(turmaPatchSchema, dataValidator)
export const turmaPatchResolver = resolve<Turma, HookContext<TurmaService>>({})

// Schema for allowed query properties
export const turmaQueryProperties = Type.Pick(turmaSchema, [
  'ano', 'semestre_turma', 'N_vagas', 'data_inicio', 'data_fim',
  'codigo_disciplina', 'Matricula_Professor', 'Centro_Sala',
  'Numero_Sala', 'dia_semana', 'hora_inicio', 'hora_fim'
])
export const turmaQuerySchema = Type.Intersect(
    [
      querySyntax(turmaQueryProperties),
      Type.Object({}, {additionalProperties: false})
    ],
    {additionalProperties: false}
)
export type TurmaQuery = Static<typeof turmaQuerySchema>
export const turmaQueryValidator = getValidator(turmaQuerySchema, queryValidator)
export const turmaQueryResolver = resolve<TurmaQuery, HookContext<TurmaService>>({})