// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  turmaDataValidator,
  turmaPatchValidator,
  turmaQueryValidator,
  turmaResolver,
  turmaExternalResolver,
  turmaDataResolver,
  turmaPatchResolver,
  turmaQueryResolver
} from './turma.schema'

import type { Application } from '../../declarations'
import { TurmaService, getOptions } from './turma.class'
import { turmaPath, turmaMethods } from './turma.shared'

export * from './turma.class'
export * from './turma.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const turma = (app: Application) => {
  // Register our service on the Feathers application
  app.use(turmaPath, new TurmaService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: turmaMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(turmaPath).hooks({
    around: {
      all: [schemaHooks.resolveExternal(turmaExternalResolver), schemaHooks.resolveResult(turmaResolver)]
    },
    before: {
      all: [schemaHooks.validateQuery(turmaQueryValidator), schemaHooks.resolveQuery(turmaQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(turmaDataValidator), schemaHooks.resolveData(turmaDataResolver)],
      patch: [schemaHooks.validateData(turmaPatchValidator), schemaHooks.resolveData(turmaPatchResolver)],
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
    [turmaPath]: TurmaService
  }
}
