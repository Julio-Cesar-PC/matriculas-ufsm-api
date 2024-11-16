// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { Professor, ProfessorData, ProfessorPatch, ProfessorQuery } from './professor.schema'

export type { Professor, ProfessorData, ProfessorPatch, ProfessorQuery }

export interface ProfessorParams extends KnexAdapterParams<ProfessorQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class ProfessorService<ServiceParams extends Params = ProfessorParams> extends KnexService<
  Professor,
  ProfessorData,
  ProfessorParams,
  ProfessorPatch
> {
  constructor(options: KnexAdapterOptions) {
    super({
      ...options,
      id: 'Matricula'
    })
  }
}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mysqlClient'),
    name: 'professor'
  }
}
