import {feathers} from '@feathersjs/feathers'
import {koa, rest, bodyParser, errorHandler, serveStatic} from '@feathersjs/koa'
import socketio from '@feathersjs/socketio'
import {Sequelize} from 'sequelize'
import {SequelizeService} from 'feathers-sequelize'
import messageModel from './models/message.model'

const sequelize = new Sequelize('matriculas', 'feather', 'strong_password', {
  host: 'localhost',
  dialect: 'mysql'
})

const Message = messageModel(sequelize)

sequelize.sync()

type ServiceTypes = {
  messages: SequelizeService
}

const app = koa<ServiceTypes>(feathers())

app.use(serveStatic('.'))
app.use(errorHandler())
app.use(bodyParser())
app.configure(rest())
app.configure(socketio())

app.use('messages', new SequelizeService({
  Model: Message,
  paginate: {
    default: 10,
    max: 50
  }
}))

app.on('connection', (connection) => app.channel('everybody').join(connection))
app.publish((_data) => app.channel('everybody'))

app.listen(3030)
    .then(() => console.log('Feathers server listening on localhost:3030'))

app.service('messages').create({
  text: 'Hello world from the server'
})