// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  centroDataValidator,
  centroPatchValidator,
  centroQueryValidator,
  centroResolver,
  centroExternalResolver,
  centroDataResolver,
  centroPatchResolver,
  centroQueryResolver
} from './centro.schema'

import type { Application } from '../../declarations'
import { CentroService, getOptions } from './centro.class'
import { centroPath, centroMethods } from './centro.shared'

export * from './centro.class'
export * from './centro.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const centro = (app: Application) => {
  // Register our service on the Feathers application
  app.use(centroPath, new CentroService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: centroMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(centroPath).hooks({
    around: {
      all: [schemaHooks.resolveExternal(centroExternalResolver), schemaHooks.resolveResult(centroResolver)]
    },
    before: {
      all: [schemaHooks.validateQuery(centroQueryValidator), schemaHooks.resolveQuery(centroQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(centroDataValidator), schemaHooks.resolveData(centroDataResolver)],
      patch: [schemaHooks.validateData(centroPatchValidator), schemaHooks.resolveData(centroPatchResolver)],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [centroPath]: CentroService
  }
}
