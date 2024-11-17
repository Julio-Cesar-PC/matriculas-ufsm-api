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
router.post('/centros', CentroController.post);

router.get('/cursos', CursoController.get);
router.post('/cursos', CursoController.post);

router.get('/alunos', AlunoController.get);
router.post('/alunos', AlunoController.post);

router.get('/disciplinas', DisciplinaController.get);
router.post('/disciplinas', DisciplinaController.post);

router.get('/professores', ProfessorController.get);
router.post('/professores', ProfessorController.post);

router.get('/salas', SalaController.get);
router.post('/salas', SalaController.post);

router.get('/turmas', TurmaController.get);
router.post('/turmas', TurmaController.post);

router.get('/turmas-alunos', TurmaAlunoController.get);
router.post('/turmas-alunos', TurmaAlunoController.post);

module.exports = router;