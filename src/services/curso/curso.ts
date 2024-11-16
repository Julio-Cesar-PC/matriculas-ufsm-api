// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  cursoDataValidator,
  cursoPatchValidator,
  cursoQueryValidator,
  cursoResolver,
  cursoExternalResolver,
  cursoDataResolver,
  cursoPatchResolver,
  cursoQueryResolver
} from './curso.schema'

import type { Application } from '../../declarations'
import { CursoService, getOptions } from './curso.class'
import { cursoPath, cursoMethods } from './curso.shared'

export * from './curso.class'
export * from './curso.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const curso = (app: Application) => {
  // Register our service on the Feathers application
  app.use(cursoPath, new CursoService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: cursoMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(cursoPath).hooks({
    around: {
      all: [schemaHooks.resolveExternal(cursoExternalResolver), schemaHooks.resolveResult(cursoResolver)]
    },
    before: {
      all: [schemaHooks.validateQuery(cursoQueryValidator), schemaHooks.resolveQuery(cursoQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(cursoDataValidator), schemaHooks.resolveData(cursoDataResolver)],
      patch: [schemaHooks.validateData(cursoPatchValidator), schemaHooks.resolveData(cursoPatchResolver)],
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
    [cursoPath]: CursoService
  }
}
