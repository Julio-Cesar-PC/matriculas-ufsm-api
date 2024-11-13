# Requisitos Fundamentais

## Cadastro de Disciplinas

- Nome da disciplina, código, ementa, carga horária, pré-requisitos, professor responsável, semestre

## Cadastro de Professores

- Dados pessoais, titulação, área de atuação.
- Vinculação a disciplinas de horários não conflitantes.

## Cadastro de Salas

- Número da sala, capacidade de alunos.

## Criação de Turmas

- Número de vagas (n precisa colocar na tabela turma pq dá pra puxar da sala), alunos matriculados, horários das aulas, sala, professor, dias da semana.

# Funcionalidades Essenciais

## Geração Automática de Grades

- Usar a informação de horário + dias da semana para gerar uma representação visual da agenda semanal de disciplinas.
- Salvar essa grade em png.

## Gerenciamento de Conflitos

- Impedir matrícula em disciplinas que têm horários conflitantes.
- Impedir matrículas caso essa matrícula cause exceção do limite de alunos matriculados.

## Geração de comprovante de Solicitação de Matrícula

- Fazer uma página em HTML simples, o navegador permite imprimí-la como pdf, o que seria tanto fácil como útil considerando que essa funcionalidade existe no
  portal da UFSM.

# Endpoints

## Salas

POST /salas para criar uma nova sala.
GET /salas para listar todas as salas.
GET /salas/:id para obter uma sala específica.
PUT /salas/:id para atualizar uma sala específica.
DELETE /salas/:id para deletar uma sala específica.

## Disciplinas

POST /disciplinas para criar uma nova disciplina.
GET /disciplinas para listar todas as disciplinas.
GET /disciplinas/:id para obter uma disciplina específica.
PUT /disciplinas/:id para atualizar uma disciplina específica.
DELETE /disciplinas/:id para deletar uma disciplina específica.

## Cursos

POST /cursos para criar um novo curso.
GET /cursos para listar todos os cursos.
GET /cursos/:id para obter um curso específico.
PUT /cursos/:id para atualizar um curso específico.
DELETE /cursos/:id para deletar um curso específico.

## Professores

POST /professores para criar um novo professor.
GET /professores para listar todos os professores.
GET /professores/:id para obter um professor específico.
PUT /professores/:id para atualizar um professor específico.
DELETE /professores/:id para deletar um professor específico.

## Alunos

POST /alunos para criar um novo aluno.
GET /alunos para listar todos os alunos.
GET /alunos/:id para obter um aluno específico.
PUT /alunos/:id para atualizar um aluno específico.
DELETE /alunos/:id para deletar um aluno específico.

## Turmas

POST /turmas to create a new turma.
GET /turmas to list all turmas.
GET /turmas/:id to get a specific turma.
PUT /turmas/:id to update a specific turma.
DELETE /turmas/:id to delete a specific turma.

## Turma Alunos

POST /turmas_alunos to create a new Turma_Aluno.
GET /turmas_alunos to list all Turma_Aluno.
GET /turmas_alunos/:id to get a specific Turma_Aluno.
PUT /turmas_alunos/:id to update a specific Turma_Aluno.
DELETE /turmas_alunos/:id to delete a specific Turma_Aluno.

