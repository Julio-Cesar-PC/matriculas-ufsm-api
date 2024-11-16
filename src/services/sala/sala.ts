// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  salaDataValidator,
  salaPatchValidator,
  salaQueryValidator,
  salaResolver,
  salaExternalResolver,
  salaDataResolver,
  salaPatchResolver,
  salaQueryResolver
} from './sala.schema'

import type { Application } from '../../declarations'
import { SalaService, getOptions } from './sala.class'
import { salaPath, salaMethods } from './sala.shared'

export * from './sala.class'
export * from './sala.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const sala = (app: Application) => {
  // Register our service on the Feathers application
  app.use(salaPath, new SalaService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: salaMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(salaPath).hooks({
    around: {
      all: [schemaHooks.resolveExternal(salaExternalResolver), schemaHooks.resolveResult(salaResolver)]
    },
    before: {
      all: [schemaHooks.validateQuery(salaQueryValidator), schemaHooks.resolveQuery(salaQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(salaDataValidator), schemaHooks.resolveData(salaDataResolver)],
      patch: [schemaHooks.validateData(salaPatchValidator), schemaHooks.resolveData(salaPatchResolver)],
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
    [salaPath]: SalaService
  }
}
