// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import {resolve} from '@feathersjs/schema'
import {Type, getValidator, querySyntax} from '@feathersjs/typebox'
import type {Static} from '@feathersjs/typebox'

import type {HookContext} from '../../declarations'
import {dataValidator, queryValidator} from '../../validators'
import type {CursoService} from './curso.class'

// Main data model schema
/*
CREATE TABLE Curso (
    id INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    campus VARCHAR(100) NOT NULL,
    ementa VARCHAR(220),  -- URL da ementa
    centro VARCHAR(10) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (centro) REFERENCES Centro(codigo_centro)
);
 */
export const cursoSchema = Type.Object(
    {
      id: Type.Integer(),
      nome: Type.String({maxLength: 100}),
      campus: Type.String({maxLength: 100}),
      ementa: Type.Optional(Type.String({maxLength: 220})),
      centro: Type.String({maxLength: 10})
    },
    {$id: 'Curso', additionalProperties: false}
)
export type Curso = Static<typeof cursoSchema>
export const cursoValidator = getValidator(cursoSchema, dataValidator)
export const cursoResolver = resolve<Curso, HookContext<CursoService>>({})

export const cursoExternalResolver = resolve<Curso, HookContext<CursoService>>({})

// Schema for creating new entries
export const cursoDataSchema = Type.Pick(cursoSchema, ['nome', 'campus', 'ementa', 'centro'], {
  $id: 'CursoData'
})
export type CursoData = Static<typeof cursoDataSchema>
export const cursoDataValidator = getValidator(cursoDataSchema, dataValidator)
export const cursoDataResolver = resolve<Curso, HookContext<CursoService>>({})

// Schema for updating existing entries
export const cursoPatchSchema = Type.Partial(cursoSchema, {
  $id: 'CursoPatch'
})
export type CursoPatch = Static<typeof cursoPatchSchema>
export const cursoPatchValidator = getValidator(cursoPatchSchema, dataValidator)
export const cursoPatchResolver = resolve<Curso, HookContext<CursoService>>({})

// Schema for allowed query properties
export const cursoQueryProperties = Type.Pick(cursoSchema, ['id', 'nome', 'campus', 'ementa', 'centro'])
export const cursoQuerySchema = Type.Intersect(
    [
      querySyntax(cursoQueryProperties),
      // Add additional query properties here
      Type.Object({}, {additionalProperties: false})
    ],
    {additionalProperties: false}
)
export type CursoQuery = Static<typeof cursoQuerySchema>
export const cursoQueryValidator = getValidator(cursoQuerySchema, queryValidator)
export const cursoQueryResolver = resolve<CursoQuery, HookContext<CursoService>>({})