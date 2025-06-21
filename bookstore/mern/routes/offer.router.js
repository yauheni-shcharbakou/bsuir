import { Router } from 'express'
import { offerController } from '../controllers/index.js'
import { roleMiddleware } from '../middleware/index.js'

const offerRouter = Router()

offerRouter.get('/', offerController.get)
offerRouter.get('/current', offerController.getCurrent)
offerRouter.post(
  '/',
  roleMiddleware(['salesman', 'admin']),
  offerController.create
)
offerRouter.patch(
  '/',
  roleMiddleware(['salesman', 'admin']),
  offerController.change
)
offerRouter.delete(
  '/',
  roleMiddleware(['salesman', 'admin']),
  offerController.delete
)

export default offerRouter
