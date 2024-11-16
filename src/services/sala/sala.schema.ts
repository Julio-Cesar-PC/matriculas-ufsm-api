import {resolve} from '@feathersjs/schema'
import {Type, getValidator, querySyntax} from '@feathersjs/typebox'
import type {Static} from '@feathersjs/typebox'

import type {HookContext} from '../../declarations'
import {dataValidator, queryValidator} from '../../validators'
import type {SalaService} from './sala.class'

/*
* CREATE TABLE Sala (
    centro VARCHAR(10) NOT NULL,
    numero INT NOT NULL,
    capacidade_alunos TINYINT NOT NULL,
    tipo ENUM('Laboratório', 'Sala'),
    PRIMARY KEY (centro, numero),
    FOREIGN KEY (centro) REFERENCES Centro(codigo_centro)
);
* */
// Main data model schema'
export const salaSchema = Type.Object(
    {
      centro: Type.String({maxLength: 10}),
      numero: Type.Integer(),
      capacidade_alunos: Type.Integer(),
      tipo: Type.Union([Type.Literal('Laboratório'), Type.Literal('Sala')])
    },
    {$id: 'Sala', additionalProperties: false}
)
export type Sala = Static<typeof salaSchema>
export const salaValidator = getValidator(salaSchema, dataValidator)
export const salaResolver = resolve<Sala, HookContext<SalaService>>({})

export const salaExternalResolver = resolve<Sala, HookContext<SalaService>>({})

// Schema for creating new entries
export const salaDataSchema = Type.Pick(salaSchema, ['centro', 'numero', 'capacidade_alunos', 'tipo'], {
  $id: 'SalaData'
})
export type SalaData = Static<typeof salaDataSchema>
export const salaDataValidator = getValidator(salaDataSchema, dataValidator)
export const salaDataResolver = resolve<Sala, HookContext<SalaService>>({})

// Schema for updating existing entries
export const salaPatchSchema = Type.Partial(salaSchema, {
  $id: 'SalaPatch'
})
export type SalaPatch = Static<typeof salaPatchSchema>
export const salaPatchValidator = getValidator(salaPatchSchema, dataValidator)
export const salaPatchResolver = resolve<Sala, HookContext<SalaService>>({})

// Schema for allowed query properties
export const salaQueryProperties = Type.Pick(salaSchema, ['centro', 'numero', 'capacidade_alunos', 'tipo'])
export const salaQuerySchema = Type.Intersect(
    [
      querySyntax(salaQueryProperties),
      // Add additional query properties here
      Type.Object({}, {additionalProperties: false})
    ],
    {additionalProperties: false}
)
export type SalaQuery = Static<typeof salaQuerySchema>
export const salaQueryValidator = getValidator(salaQuerySchema, queryValidator)
export const salaQueryResolver = resolve<SalaQuery, HookContext<SalaService>>({})