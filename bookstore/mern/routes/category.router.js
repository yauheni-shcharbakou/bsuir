import { Router } from 'express'
import { roleMiddleware } from '../middleware/index.js'
import { categoryController } from '../controllers/index.js'

const categoryRouter = Router()

categoryRouter.get('/', categoryController.get)
categoryRouter.post('/', roleMiddleware(['admin']), categoryController.create)
categoryRouter.patch('/', roleMiddleware(['admin']), categoryController.change)
categoryRouter.delete('/', roleMiddleware(['admin']), categoryController.delete)

export default categoryRouter
