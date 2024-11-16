// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import {resolve} from '@feathersjs/schema'
import {Type, getValidator, querySyntax} from '@feathersjs/typebox'
import type {Static} from '@feathersjs/typebox'

import type {HookContext} from '../../declarations'
import {dataValidator, queryValidator} from '../../validators'
import type {DisciplinaService} from './disciplina.class'

// Main data model schema
/*
* CREATE TABLE Disciplina (
    codigo_disciplina VARCHAR(10) NOT NULL,
    nome VARCHAR(100) NOT NULL,
    semestre_disciplina TINYINT NOT NULL,
    ementa VARCHAR(220),
    carga_horaria INT,
    PRIMARY KEY (codigo_disciplina)
);
* */

// Main data model schema
export const disciplinaSchema = Type.Object(
    {
      codigo_disciplina: Type.String({maxLength: 10}),
      nome: Type.String({maxLength: 100}),
      semestre_disciplina: Type.Integer(),
      ementa: Type.Optional(Type.String({maxLength: 220})),
      carga_horaria: Type.Optional(Type.Integer())
    },
    {$id: 'Disciplina', additionalProperties: false}
)
export type Disciplina = Static<typeof disciplinaSchema>
export const disciplinaValidator = getValidator(disciplinaSchema, dataValidator)
export const disciplinaResolver = resolve<Disciplina, HookContext<DisciplinaService>>({})

export const disciplinaExternalResolver = resolve<Disciplina, HookContext<DisciplinaService>>({})

// Schema for creating new entries
export const disciplinaDataSchema = Type.Pick(disciplinaSchema, ['codigo_disciplina', 'nome', 'semestre_disciplina', 'ementa', 'carga_horaria'], {
  $id: 'DisciplinaData'
})
export type DisciplinaData = Static<typeof disciplinaDataSchema>
export const disciplinaDataValidator = getValidator(disciplinaDataSchema, dataValidator)
export const disciplinaDataResolver = resolve<Disciplina, HookContext<DisciplinaService>>({})

// Schema for updating existing entries
export const disciplinaPatchSchema = Type.Partial(disciplinaSchema, {
  $id: 'DisciplinaPatch'
})
export type DisciplinaPatch = Static<typeof disciplinaPatchSchema>
export const disciplinaPatchValidator = getValidator(disciplinaPatchSchema, dataValidator)
export const disciplinaPatchResolver = resolve<Disciplina, HookContext<DisciplinaService>>({})

// Schema for allowed query properties
export const disciplinaQueryProperties = Type.Pick(disciplinaSchema, ['codigo_disciplina', 'nome', 'semestre_disciplina', 'ementa', 'carga_horaria'])
export const disciplinaQuerySchema = Type.Intersect(
    [
      querySyntax(disciplinaQueryProperties),
      // Add additional query properties here
      Type.Object({}, {additionalProperties: false})
    ],
    {additionalProperties: false}
)
export type DisciplinaQuery = Static<typeof disciplinaQuerySchema>
export const disciplinaQueryValidator = getValidator(disciplinaQuerySchema, queryValidator)
export const disciplinaQueryResolver = resolve<DisciplinaQuery, HookContext<DisciplinaService>>({})