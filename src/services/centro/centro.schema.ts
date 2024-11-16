// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import {resolve} from '@feathersjs/schema'
import {Type, getValidator, querySyntax} from '@feathersjs/typebox'
import type {Static} from '@feathersjs/typebox'

import type {HookContext} from '../../declarations'
import {dataValidator, queryValidator} from '../../validators'
import type {CentroService} from './centro.class'

// Main data model schema
/*
* CREATE TABLE Centro (
    codigo_centro VARCHAR(10) NOT NULL,
    PRIMARY KEY (codigo_centro)
);
* */
export const centroSchema = Type.Object(
    {
      codigo_centro: Type.String({maxLength: 10})
    },
    {$id: 'Centro', additionalProperties: false}
)
export type Centro = Static<typeof centroSchema>
export const centroValidator = getValidator(centroSchema, dataValidator)
export const centroResolver = resolve<Centro, HookContext<CentroService>>({})

export const centroExternalResolver = resolve<Centro, HookContext<CentroService>>({})

// Schema for creating new entries
export const centroDataSchema = Type.Pick(centroSchema, ['codigo_centro'], {
  $id: 'CentroData'
})
export type CentroData = Static<typeof centroDataSchema>
export const centroDataValidator = getValidator(centroDataSchema, dataValidator)
export const centroDataResolver = resolve<Centro, HookContext<CentroService>>({})

// Schema for updating existing entries
export const centroPatchSchema = Type.Partial(centroSchema, {
  $id: 'CentroPatch'
})
export type CentroPatch = Static<typeof centroPatchSchema>
export const centroPatchValidator = getValidator(centroPatchSchema, dataValidator)
export const centroPatchResolver = resolve<Centro, HookContext<CentroService>>({})

// Schema for allowed query properties
export const centroQueryProperties = Type.Pick(centroSchema, ['codigo_centro'])
export const centroQuerySchema = Type.Intersect(
    [
      querySyntax(centroQueryProperties),
      // Add additional query properties here
      Type.Object({}, {additionalProperties: false})
    ],
    {additionalProperties: false}
)
export type CentroQuery = Static<typeof centroQuerySchema>
export const centroQueryValidator = getValidator(centroQuerySchema, queryValidator)
export const centroQueryResolver = resolve<CentroQuery, HookContext<CentroService>>({})