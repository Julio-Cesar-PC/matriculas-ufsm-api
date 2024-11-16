// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { TurmaAluno, TurmaAlunoData, TurmaAlunoPatch, TurmaAlunoQuery } from './turma-aluno.schema'

export type { TurmaAluno, TurmaAlunoData, TurmaAlunoPatch, TurmaAlunoQuery }

export interface TurmaAlunoParams extends KnexAdapterParams<TurmaAlunoQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class TurmaAlunoService<ServiceParams extends Params = TurmaAlunoParams> extends KnexService<
  TurmaAluno,
  TurmaAlunoData,
  TurmaAlunoParams,
  TurmaAlunoPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mysqlClient'),
    name: 'turma-aluno'
  }
}
