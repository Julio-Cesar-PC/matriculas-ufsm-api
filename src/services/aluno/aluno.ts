// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  alunoDataValidator,
  alunoPatchValidator,
  alunoQueryValidator,
  alunoResolver,
  alunoExternalResolver,
  alunoDataResolver,
  alunoPatchResolver,
  alunoQueryResolver
} from './aluno.schema'

import type { Application } from '../../declarations'
import { AlunoService, getOptions } from './aluno.class'
import { alunoPath, alunoMethods } from './aluno.shared'

export * from './aluno.class'
export * from './aluno.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const aluno = (app: Application) => {
  // Register our service on the Feathers application
  app.use(alunoPath, new AlunoService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: alunoMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(alunoPath).hooks({
    around: {
      all: [schemaHooks.resolveExternal(alunoExternalResolver), schemaHooks.resolveResult(alunoResolver)]
    },
    before: {
      all: [schemaHooks.validateQuery(alunoQueryValidator), schemaHooks.resolveQuery(alunoQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(alunoDataValidator), schemaHooks.resolveData(alunoDataResolver)],
      patch: [schemaHooks.validateData(alunoPatchValidator), schemaHooks.resolveData(alunoPatchResolver)],
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
    [alunoPath]: AlunoService
  }
}
