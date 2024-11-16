// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Turma, TurmaData, TurmaPatch, TurmaQuery, TurmaService } from './turma.class'

export type { Turma, TurmaData, TurmaPatch, TurmaQuery }

export type TurmaClientService = Pick<TurmaService<Params<TurmaQuery>>, (typeof turmaMethods)[number]>

export const turmaPath = 'turma'

export const turmaMethods: Array<keyof TurmaService> = ['find', 'get', 'create', 'patch', 'remove']

export const turmaClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(turmaPath, connection.service(turmaPath), {
    methods: turmaMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [turmaPath]: TurmaClientService
  }
}
