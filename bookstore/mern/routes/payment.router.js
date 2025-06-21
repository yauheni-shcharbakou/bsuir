import { Router } from 'express'
import { roleMiddleware } from '../middleware/index.js'
import { paymentController } from '../controllers/index.js'

const paymentRouter = Router()

paymentRouter.get('/', paymentController.get)
paymentRouter.post('/', roleMiddleware(['admin']), paymentController.create)
paymentRouter.patch('/', roleMiddleware(['admin']), paymentController.change)
paymentRouter.delete('/', roleMiddleware(['admin']), paymentController.delete)

export default paymentRouter
