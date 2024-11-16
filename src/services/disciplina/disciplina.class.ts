// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { Disciplina, DisciplinaData, DisciplinaPatch, DisciplinaQuery } from './disciplina.schema'

export type { Disciplina, DisciplinaData, DisciplinaPatch, DisciplinaQuery }

export interface DisciplinaParams extends KnexAdapterParams<DisciplinaQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class DisciplinaService<ServiceParams extends Params = DisciplinaParams> extends KnexService<
  Disciplina,
  DisciplinaData,
  DisciplinaParams,
  DisciplinaPatch
> {
  constructor(options: KnexAdapterOptions) {
    super({
      ...options,
      id: 'codigo_disciplina'
    })
  }
}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mysqlClient'),
    name: 'disciplina'
  }
}
