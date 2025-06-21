import { Router } from 'express'
import { roleMiddleware } from '../middleware/index.js'
import { publisherController } from '../controllers/index.js'

const publisherRouter = Router()

publisherRouter.get('/', publisherController.get)
publisherRouter.post('/', roleMiddleware(['admin']), publisherController.create)
publisherRouter.patch(
  '/',
  roleMiddleware(['admin']),
  publisherController.change
)
publisherRouter.delete(
  '/',
  roleMiddleware(['admin']),
  publisherController.delete
)

export default publisherRouter
