// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  professorDataValidator,
  professorPatchValidator,
  professorQueryValidator,
  professorResolver,
  professorExternalResolver,
  professorDataResolver,
  professorPatchResolver,
  professorQueryResolver
} from './professor.schema'

import type { Application } from '../../declarations'
import { ProfessorService, getOptions } from './professor.class'
import { professorPath, professorMethods } from './professor.shared'

export * from './professor.class'
export * from './professor.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const professor = (app: Application) => {
  // Register our service on the Feathers application
  app.use(professorPath, new ProfessorService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: professorMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(professorPath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(professorExternalResolver),
        schemaHooks.resolveResult(professorResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(professorQueryValidator),
        schemaHooks.resolveQuery(professorQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(professorDataValidator),
        schemaHooks.resolveData(professorDataResolver)
      ],
      patch: [
        schemaHooks.validateData(professorPatchValidator),
        schemaHooks.resolveData(professorPatchResolver)
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
    [professorPath]: ProfessorService
  }
}
