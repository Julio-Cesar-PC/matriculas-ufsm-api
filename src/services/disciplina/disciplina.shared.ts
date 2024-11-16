// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type {
  Disciplina,
  DisciplinaData,
  DisciplinaPatch,
  DisciplinaQuery,
  DisciplinaService
} from './disciplina.class'

export type { Disciplina, DisciplinaData, DisciplinaPatch, DisciplinaQuery }

export type DisciplinaClientService = Pick<
  DisciplinaService<Params<DisciplinaQuery>>,
  (typeof disciplinaMethods)[number]
>

export const disciplinaPath = 'disciplina'

export const disciplinaMethods: Array<keyof DisciplinaService> = ['find', 'get', 'create', 'patch', 'remove']

export const disciplinaClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(disciplinaPath, connection.service(disciplinaPath), {
    methods: disciplinaMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [disciplinaPath]: DisciplinaClientService
  }
}
