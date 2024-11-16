// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { Curso, CursoData, CursoPatch, CursoQuery } from './curso.schema'

export type { Curso, CursoData, CursoPatch, CursoQuery }

export interface CursoParams extends KnexAdapterParams<CursoQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class CursoService<ServiceParams extends Params = CursoParams> extends KnexService<
  Curso,
  CursoData,
  CursoParams,
  CursoPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mysqlClient'),
    name: 'curso'
  }
}
