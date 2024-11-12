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
- Fazer uma página em HTML simples, o navegador permite imprimí-la como pdf, o que seria tanto fácil como útil considerando que essa funcionalidade existe no portal da UFSM.
