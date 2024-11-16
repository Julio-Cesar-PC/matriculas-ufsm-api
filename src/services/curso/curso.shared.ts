// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Curso, CursoData, CursoPatch, CursoQuery, CursoService } from './curso.class'

export type { Curso, CursoData, CursoPatch, CursoQuery }

export type CursoClientService = Pick<CursoService<Params<CursoQuery>>, (typeof cursoMethods)[number]>

export const cursoPath = 'curso'

export const cursoMethods: Array<keyof CursoService> = ['find', 'get', 'create', 'patch', 'remove']

export const cursoClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(cursoPath, connection.service(cursoPath), {
    methods: cursoMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [cursoPath]: CursoClientService
  }
}
