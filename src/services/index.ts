import { centro } from './centro/centro'
import { sala } from './sala/sala'
// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html#configure-functions
import type { Application } from '../declarations'

export const services = (app: Application) => {
  app.configure(centro)
  app.configure(sala)
  // All services will be registered here
}
