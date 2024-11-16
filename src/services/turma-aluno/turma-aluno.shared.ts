// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type {
  TurmaAluno,
  TurmaAlunoData,
  TurmaAlunoPatch,
  TurmaAlunoQuery,
  TurmaAlunoService
} from './turma-aluno.class'

export type { TurmaAluno, TurmaAlunoData, TurmaAlunoPatch, TurmaAlunoQuery }

export type TurmaAlunoClientService = Pick<
  TurmaAlunoService<Params<TurmaAlunoQuery>>,
  (typeof turmaAlunoMethods)[number]
>

export const turmaAlunoPath = 'turma-aluno'

export const turmaAlunoMethods: Array<keyof TurmaAlunoService> = ['find', 'get', 'create', 'patch', 'remove']

export const turmaAlunoClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(turmaAlunoPath, connection.service(turmaAlunoPath), {
    methods: turmaAlunoMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [turmaAlunoPath]: TurmaAlunoClientService
  }
}
