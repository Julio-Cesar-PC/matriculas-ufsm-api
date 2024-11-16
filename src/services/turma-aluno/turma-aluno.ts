// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  turmaAlunoDataValidator,
  turmaAlunoPatchValidator,
  turmaAlunoQueryValidator,
  turmaAlunoResolver,
  turmaAlunoExternalResolver,
  turmaAlunoDataResolver,
  turmaAlunoPatchResolver,
  turmaAlunoQueryResolver
} from './turma-aluno.schema'

import type { Application } from '../../declarations'
import { TurmaAlunoService, getOptions } from './turma-aluno.class'
import { turmaAlunoPath, turmaAlunoMethods } from './turma-aluno.shared'

export * from './turma-aluno.class'
export * from './turma-aluno.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const turmaAluno = (app: Application) => {
  // Register our service on the Feathers application
  app.use(turmaAlunoPath, new TurmaAlunoService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: turmaAlunoMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(turmaAlunoPath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(turmaAlunoExternalResolver),
        schemaHooks.resolveResult(turmaAlunoResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(turmaAlunoQueryValidator),
        schemaHooks.resolveQuery(turmaAlunoQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(turmaAlunoDataValidator),
        schemaHooks.resolveData(turmaAlunoDataResolver)
      ],
      patch: [
        schemaHooks.validateData(turmaAlunoPatchValidator),
        schemaHooks.resolveData(turmaAlunoPatchResolver)
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
    [turmaAlunoPath]: TurmaAlunoService
  }
}
