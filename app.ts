import {feathers} from '@feathersjs/feathers'
import {koa, rest, bodyParser, errorHandler, serveStatic} from '@feathersjs/koa'
import socketio from '@feathersjs/socketio'
import {Sequelize} from 'sequelize'
import {SequelizeService} from 'feathers-sequelize'
import salaModel from "./models/sala.model";
import disciplinaModel from "./models/disciplina.model";
import cursoModel from "./models/curso.model";
import professorModel from "./models/professor.model";
import alunoModel from "./models/aluno.model";
import turmaModel from "./models/turma.model";
import turmaAlunoModel from "./models/turmaAluno.model";

const sequelize = new Sequelize('matriculas', 'feather', 'strong_password', {
  host: 'localhost',
  dialect: 'mysql'
})

const Sala = salaModel(sequelize);
const Disciplina = disciplinaModel(sequelize);
const Curso = cursoModel(sequelize);
const Professor = professorModel(sequelize);
const Aluno = alunoModel(sequelize);
const Turma = turmaModel(sequelize);
const Turma_Aluno = turmaAlunoModel(sequelize);

// type ServiceTypes = {
//   messages: SequelizeService
// }

const app = koa(feathers())

app.use(serveStatic('.'))
app.use(errorHandler())
app.use(bodyParser())
app.configure(rest())
app.configure(socketio())

app.use('Sala', new SequelizeService({
  Model: Sala,
  paginate: {
    default: 10,
    max: 50
  }
}));
app.use('Disciplina', new SequelizeService({
  Model: Disciplina,
  paginate: {
    default: 10,
    max: 50
  }
}));
app.use('Curso', new SequelizeService({
  Model: Curso,
  paginate: {
    default: 10,
    max: 50
  }
}));
app.use('Professor', new SequelizeService({
  Model: Professor,
  paginate: {
    default: 10,
    max: 50
  }
}));
app.use('Aluno', new SequelizeService({
  Model: Aluno,
  paginate: {
    default: 10,
    max: 50
  }
}));
app.use('Turma', new SequelizeService({
  Model: Turma,
  paginate: {
    default: 10,
    max: 50
  }
}));
app.use('Turma_Aluno', new SequelizeService({
  Model: Turma_Aluno,
  paginate: {
    default: 10,
    max: 50
  }
}));

app.on('connection', (connection) => app.channel('everybody').join(connection))
app.publish((_data) => app.channel('everybody'))

sequelize.authenticate().then(() => {
  app.listen(3030)
      .then(() => console.log('Feathers server listening on localhost:3030'))
      .catch(error => console.log(error))
});