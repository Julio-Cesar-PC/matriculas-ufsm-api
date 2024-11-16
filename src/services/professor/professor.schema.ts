// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import {resolve} from '@feathersjs/schema'
import {Type, getValidator, querySyntax} from '@feathersjs/typebox'
import type {Static} from '@feathersjs/typebox'

import type {HookContext} from '../../declarations'
import {dataValidator, queryValidator} from '../../validators'
import type {ProfessorService} from './professor.class'

// Main data model schema
/*
CREATE TABLE Professor (
    Matricula BIGINT NOT NULL,
    nome VARCHAR(100) NOT NULL,
    centro VARCHAR(10) NOT NULL,
    PRIMARY KEY (Matricula),
    FOREIGN KEY (centro) REFERENCES Centro(codigo_centro)
);
 */
export const professorSchema = Type.Object(
    {
      Matricula: Type.Integer(),
      nome: Type.String({maxLength: 100}),
      centro: Type.String({maxLength: 10})
    },
    {$id: 'Professor', additionalProperties: false}
)
export type Professor = Static<typeof professorSchema>
export const professorValidator = getValidator(professorSchema, dataValidator)
export const professorResolver = resolve<Professor, HookContext<ProfessorService>>({})

export const professorExternalResolver = resolve<Professor, HookContext<ProfessorService>>({})

// Schema for creating new entries
export const professorDataSchema = Type.Pick(professorSchema, ['Matricula', 'nome', 'centro'], {
  $id: 'ProfessorData'
})
export type ProfessorData = Static<typeof professorDataSchema>
export const professorDataValidator = getValidator(professorDataSchema, dataValidator)
export const professorDataResolver = resolve<Professor, HookContext<ProfessorService>>({})

// Schema for updating existing entries
export const professorPatchSchema = Type.Partial(professorSchema, {
  $id: 'ProfessorPatch'
})
export type ProfessorPatch = Static<typeof professorPatchSchema>
export const professorPatchValidator = getValidator(professorPatchSchema, dataValidator)
export const professorPatchResolver = resolve<Professor, HookContext<ProfessorService>>({})

// Schema for allowed query properties
export const professorQueryProperties = Type.Pick(professorSchema, ['Matricula', 'nome', 'centro'])
export const professorQuerySchema = Type.Intersect(
    [
      querySyntax(professorQueryProperties),
      // Add additional query properties here
      Type.Object({}, {additionalProperties: false})
    ],
    {additionalProperties: false}
)
export type ProfessorQuery = Static<typeof professorQuerySchema>
export const professorQueryValidator = getValidator(professorQuerySchema, queryValidator)
export const professorQueryResolver = resolve<ProfessorQuery, HookContext<ProfessorService>>({})