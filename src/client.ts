// For more information about this file see https://dove.feathersjs.com/guides/cli/client.html
import { feathers } from '@feathersjs/feathers'
import type { TransportConnection, Application } from '@feathersjs/feathers'
import authenticationClient from '@feathersjs/authentication-client'
import type { AuthenticationClientOptions } from '@feathersjs/authentication-client'

import { turmaAlunoClient } from './services/turma-aluno/turma-aluno.shared'
export type {
  TurmaAluno,
  TurmaAlunoData,
  TurmaAlunoQuery,
  TurmaAlunoPatch
} from './services/turma-aluno/turma-aluno.shared'

import { turmaClient } from './services/turma/turma.shared'
export type { Turma, TurmaData, TurmaQuery, TurmaPatch } from './services/turma/turma.shared'

import { alunoClient } from './services/aluno/aluno.shared'
export type { Aluno, AlunoData, AlunoQuery, AlunoPatch } from './services/aluno/aluno.shared'

import { professorClient } from './services/professor/professor.shared'
export type {
  Professor,
  ProfessorData,
  ProfessorQuery,
  ProfessorPatch
} from './services/professor/professor.shared'

import { cursoClient } from './services/curso/curso.shared'
export type { Curso, CursoData, CursoQuery, CursoPatch } from './services/curso/curso.shared'

import { disciplinaClient } from './services/disciplina/disciplina.shared'
export type {
  Disciplina,
  DisciplinaData,
  DisciplinaQuery,
  DisciplinaPatch
} from './services/disciplina/disciplina.shared'

import { centroClient } from './services/centro/centro.shared'
export type { Centro, CentroData, CentroQuery, CentroPatch } from './services/centro/centro.shared'

import { salaClient } from './services/sala/sala.shared'
export type { Sala, SalaData, SalaQuery, SalaPatch } from './services/sala/sala.shared'

export interface Configuration {
  connection: TransportConnection<ServiceTypes>
}

export interface ServiceTypes {}

export type ClientApplication = Application<ServiceTypes, Configuration>

/**
 * Returns a typed client for the matriculas-ufsm-api app.
 *
 * @param connection The REST or Socket.io Feathers client connection
 * @param authenticationOptions Additional settings for the authentication client
 * @see https://dove.feathersjs.com/api/client.html
 * @returns The Feathers client application
 */
export const createClient = <Configuration = any,>(
  connection: TransportConnection<ServiceTypes>,
  authenticationOptions: Partial<AuthenticationClientOptions> = {}
) => {
  const client: ClientApplication = feathers()

  client.configure(connection)
  client.configure(authenticationClient(authenticationOptions))
  client.set('connection', connection)

  client.configure(salaClient)
  client.configure(centroClient)
  client.configure(disciplinaClient)
  client.configure(cursoClient)
  client.configure(professorClient)
  client.configure(alunoClient)
  client.configure(turmaClient)
  client.configure(turmaAlunoClient)
  return client
}
