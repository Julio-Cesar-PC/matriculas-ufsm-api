// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  disciplinaDataValidator,
  disciplinaPatchValidator,
  disciplinaQueryValidator,
  disciplinaResolver,
  disciplinaExternalResolver,
  disciplinaDataResolver,
  disciplinaPatchResolver,
  disciplinaQueryResolver
} from './disciplina.schema'

import type { Application } from '../../declarations'
import { DisciplinaService, getOptions } from './disciplina.class'
import { disciplinaPath, disciplinaMethods } from './disciplina.shared'

export * from './disciplina.class'
export * from './disciplina.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const disciplina = (app: Application) => {
  // Register our service on the Feathers application
  app.use(disciplinaPath, new DisciplinaService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: disciplinaMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(disciplinaPath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(disciplinaExternalResolver),
        schemaHooks.resolveResult(disciplinaResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(disciplinaQueryValidator),
        schemaHooks.resolveQuery(disciplinaQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(disciplinaDataValidator),
        schemaHooks.resolveData(disciplinaDataResolver)
      ],
      patch: [
        schemaHooks.validateData(disciplinaPatchValidator),
        schemaHooks.resolveData(disciplinaPatchResolver)
      ],
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
    [disciplinaPath]: DisciplinaService
  }
}
