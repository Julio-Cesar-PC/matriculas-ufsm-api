// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Aluno, AlunoData, AlunoPatch, AlunoQuery, AlunoService } from './aluno.class'

export type { Aluno, AlunoData, AlunoPatch, AlunoQuery }

export type AlunoClientService = Pick<AlunoService<Params<AlunoQuery>>, (typeof alunoMethods)[number]>

export const alunoPath = 'aluno'

export const alunoMethods: Array<keyof AlunoService> = ['find', 'get', 'create', 'patch', 'remove']

export const alunoClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(alunoPath, connection.service(alunoPath), {
    methods: alunoMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [alunoPath]: AlunoClientService
  }
}
