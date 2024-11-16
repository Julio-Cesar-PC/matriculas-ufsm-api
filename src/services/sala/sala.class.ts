// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { Sala, SalaData, SalaPatch, SalaQuery } from './sala.schema'

export type { Sala, SalaData, SalaPatch, SalaQuery }

export interface SalaParams extends KnexAdapterParams<SalaQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class SalaService<ServiceParams extends Params = SalaParams> extends KnexService<
  Sala,
  SalaData,
  SalaParams,
  SalaPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mysqlClient'),
    name: 'sala'
  }
}
