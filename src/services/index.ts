import { turmaAluno } from './turma-aluno/turma-aluno'
import { turma } from './turma/turma'
import { aluno } from './aluno/aluno'
import { professor } from './professor/professor'
import { curso } from './curso/curso'
import { disciplina } from './disciplina/disciplina'
import { centro } from './centro/centro'
import { sala } from './sala/sala'
// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html#configure-functions
import type { Application } from '../declarations'

export const services = (app: Application) => {
  app.configure(turmaAluno)
  app.configure(turma)
  app.configure(aluno)
  app.configure(professor)
  app.configure(curso)
  app.configure(disciplina)
  app.configure(centro)
  app.configure(sala)
  // All services will be registered here
}
