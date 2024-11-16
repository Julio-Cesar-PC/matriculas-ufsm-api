// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import {resolve} from '@feathersjs/schema'
import {Type, getValidator, querySyntax} from '@feathersjs/typebox'
import type {Static} from '@feathersjs/typebox'

import type {HookContext} from '../../declarations'
import {dataValidator, queryValidator} from '../../validators'
import type {AlunoService} from './aluno.class'

// Main data model schema
/*
CREATE TABLE Aluno (
    matricula BIGINT NOT NULL,
    nome VARCHAR(100) NOT NULL,
    id_curso INT NOT NULL,
    PRIMARY KEY (matricula),
    FOREIGN KEY (id_curso) REFERENCES Curso(id)
);
 */
export const alunoSchema = Type.Object(
    {
      matricula: Type.Integer(),
      nome: Type.String({maxLength: 100}),
      id_curso: Type.Integer()
    },
    {$id: 'Aluno', additionalProperties: false}
)
export type Aluno = Static<typeof alunoSchema>
export const alunoValidator = getValidator(alunoSchema, dataValidator)
export const alunoResolver = resolve<Aluno, HookContext<AlunoService>>({})

export const alunoExternalResolver = resolve<Aluno, HookContext<AlunoService>>({})

// Schema for creating new entries
export const alunoDataSchema = Type.Pick(alunoSchema, ['matricula', 'nome', 'id_curso'], {
  $id: 'AlunoData'
})
export type AlunoData = Static<typeof alunoDataSchema>
export const alunoDataValidator = getValidator(alunoDataSchema, dataValidator)
export const alunoDataResolver = resolve<Aluno, HookContext<AlunoService>>({})

// Schema for updating existing entries
export const alunoPatchSchema = Type.Partial(alunoSchema, {
  $id: 'AlunoPatch'
})
export type AlunoPatch = Static<typeof alunoPatchSchema>
export const alunoPatchValidator = getValidator(alunoPatchSchema, dataValidator)
export const alunoPatchResolver = resolve<Aluno, HookContext<AlunoService>>({})

// Schema for allowed query properties
export const alunoQueryProperties = Type.Pick(alunoSchema, ['matricula', 'nome', 'id_curso'])
export const alunoQuerySchema = Type.Intersect(
    [
      querySyntax(alunoQueryProperties),
      // Add additional query properties here
      Type.Object({}, {additionalProperties: false})
    ],
    {additionalProperties: false}
)
export type AlunoQuery = Static<typeof alunoQuerySchema>
export const alunoQueryValidator = getValidator(alunoQuerySchema, queryValidator)
export const alunoQueryResolver = resolve<AlunoQuery, HookContext<AlunoService>>({})