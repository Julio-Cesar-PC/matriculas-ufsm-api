// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type {
  Professor,
  ProfessorData,
  ProfessorPatch,
  ProfessorQuery,
  ProfessorService
} from './professor.class'

export type { Professor, ProfessorData, ProfessorPatch, ProfessorQuery }

export type ProfessorClientService = Pick<
  ProfessorService<Params<ProfessorQuery>>,
  (typeof professorMethods)[number]
>

export const professorPath = 'professor'

export const professorMethods: Array<keyof ProfessorService> = ['find', 'get', 'create', 'patch', 'remove']

export const professorClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(professorPath, connection.service(professorPath), {
    methods: professorMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [professorPath]: ProfessorClientService
  }
}
