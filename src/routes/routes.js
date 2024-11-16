const express = require('express');
const router = express.Router();
const CentroController = require('../controllers/centro');
const CursoController = require('../controllers/curso');
const AlunoController = require('../controllers/aluno');
const DisciplinaController = require('../controllers/disciplina');
const ProfessorController = require('../controllers/professor');
const SalaController = require('../controllers/sala');
const TurmaController = require('../controllers/turma');
const TurmaAlunoController = require('../controllers/turma-aluno');

router.get('/centros', CentroController.get);
router.get('/cursos', CursoController.get);
router.get('/alunos', AlunoController.get);
router.get('/disciplinas', DisciplinaController.get);
router.get('/professores', ProfessorController.get);
router.get('/salas', SalaController.get);
router.get('/turmas', TurmaController.get);
router.get('/turmas-alunos', TurmaAlunoController.get);

module.exports = router;