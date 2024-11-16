// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { Turma, TurmaData, TurmaPatch, TurmaQuery } from './turma.schema'

export type { Turma, TurmaData, TurmaPatch, TurmaQuery }

export interface TurmaParams extends KnexAdapterParams<TurmaQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class TurmaService<ServiceParams extends Params = TurmaParams> extends KnexService<
  Turma,
  TurmaData,
  TurmaParams,
  TurmaPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mysqlClient'),
    name: 'turma'
  }
}
