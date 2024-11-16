// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { Aluno, AlunoData, AlunoPatch, AlunoQuery } from './aluno.schema'

export type { Aluno, AlunoData, AlunoPatch, AlunoQuery }

export interface AlunoParams extends KnexAdapterParams<AlunoQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class AlunoService<ServiceParams extends Params = AlunoParams> extends KnexService<
  Aluno,
  AlunoData,
  AlunoParams,
  AlunoPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mysqlClient'),
    name: 'aluno'
  }
}
