// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import {resolve} from '@feathersjs/schema'
import {Type, getValidator, querySyntax} from '@feathersjs/typebox'
import type {Static} from '@feathersjs/typebox'

import type {HookContext} from '../../declarations'
import {dataValidator, queryValidator} from '../../validators'
import type {TurmaAlunoService} from './turma-aluno.class'

// Main data model schema
/*
CREATE TABLE Turma_Aluno (
    ano_turma YEAR NOT NULL,
    semestre_turma ENUM ('1','2') NOT NULL,
    codigo_disciplina VARCHAR(10) NOT NULL,
    Matricula_Aluno BIGINT NOT NULL,
    Matricula_Professor BIGINT NOT NULL,
    situacao_aluno ENUM('Matricula', 'Aprovado com nota', 'Reprovado por Frequência', 'Reprovado com Nota'),
    PRIMARY KEY (ano_turma, semestre_turma, codigo_disciplina, Matricula_Aluno),
    FOREIGN KEY (ano_turma, semestre_turma, codigo_disciplina, Matricula_Professor)
        REFERENCES Turma(ano, semestre_turma, codigo_disciplina, Matricula_Professor),
    FOREIGN KEY (Matricula_Aluno) REFERENCES Aluno(matricula)
);
 */
export const turmaAlunoSchema = Type.Object(
    {
      ano_turma: Type.Integer(),
      semestre_turma: Type.String({maxLength: 1}),
      codigo_disciplina: Type.String({maxLength: 10}),
      Matricula_Aluno: Type.Integer(),
      Matricula_Professor: Type.Integer(),
      situacao_aluno: Type.String({maxLength: 25})
    },
    {$id: 'TurmaAluno', additionalProperties: false}
)
export type TurmaAluno = Static<typeof turmaAlunoSchema>
export const turmaAlunoValidator = getValidator(turmaAlunoSchema, dataValidator)
export const turmaAlunoResolver = resolve<TurmaAluno, HookContext<TurmaAlunoService>>({})

export const turmaAlunoExternalResolver = resolve<TurmaAluno, HookContext<TurmaAlunoService>>({})

// Schema for creating new entries
export const turmaAlunoDataSchema = Type.Pick(turmaAlunoSchema, [
  'ano_turma', 'semestre_turma', 'codigo_disciplina', 'Matricula_Aluno', 'Matricula_Professor', 'situacao_aluno'
], {
  $id: 'TurmaAlunoData'
})
export type TurmaAlunoData = Static<typeof turmaAlunoDataSchema>
export const turmaAlunoDataValidator = getValidator(turmaAlunoDataSchema, dataValidator)
export const turmaAlunoDataResolver = resolve<TurmaAluno, HookContext<TurmaAlunoService>>({})

// Schema for updating existing entries
export const turmaAlunoPatchSchema = Type.Partial(turmaAlunoSchema, {
  $id: 'TurmaAlunoPatch'
})
export type TurmaAlunoPatch = Static<typeof turmaAlunoPatchSchema>
export const turmaAlunoPatchValidator = getValidator(turmaAlunoPatchSchema, dataValidator)
export const turmaAlunoPatchResolver = resolve<TurmaAluno, HookContext<TurmaAlunoService>>({})

// Schema for allowed query properties
export const turmaAlunoQueryProperties = Type.Pick(turmaAlunoSchema, [
  'ano_turma', 'semestre_turma', 'codigo_disciplina', 'Matricula_Aluno', 'Matricula_Professor', 'situacao_aluno'
])
export const turmaAlunoQuerySchema = Type.Intersect(
    [
      querySyntax(turmaAlunoQueryProperties),
      Type.Object({}, {additionalProperties: false})
    ],
    {additionalProperties: false}
)
export type TurmaAlunoQuery = Static<typeof turmaAlunoQuerySchema>
export const turmaAlunoQueryValidator = getValidator(turmaAlunoQuerySchema, queryValidator)
export const turmaAlunoQueryResolver = resolve<TurmaAlunoQuery, HookContext<TurmaAlunoService>>({})