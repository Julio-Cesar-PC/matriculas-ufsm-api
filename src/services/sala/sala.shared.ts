// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Sala, SalaData, SalaPatch, SalaQuery, SalaService } from './sala.class'

export type { Sala, SalaData, SalaPatch, SalaQuery }

export type SalaClientService = Pick<SalaService<Params<SalaQuery>>, (typeof salaMethods)[number]>

export const salaPath = 'sala'

export const salaMethods: Array<keyof SalaService> = ['find', 'get', 'create', 'patch', 'remove']

export const salaClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(salaPath, connection.service(salaPath), {
    methods: salaMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [salaPath]: SalaClientService
  }
}
