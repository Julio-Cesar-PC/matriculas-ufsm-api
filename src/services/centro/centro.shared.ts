// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Centro, CentroData, CentroPatch, CentroQuery, CentroService } from './centro.class'

export type { Centro, CentroData, CentroPatch, CentroQuery }

export type CentroClientService = Pick<CentroService<Params<CentroQuery>>, (typeof centroMethods)[number]>

export const centroPath = 'centro'

export const centroMethods: Array<keyof CentroService> = ['find', 'get', 'create', 'patch', 'remove']

export const centroClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(centroPath, connection.service(centroPath), {
    methods: centroMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [centroPath]: CentroClientService
  }
}
