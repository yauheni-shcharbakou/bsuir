import { Router } from 'express'
import { roleMiddleware } from '../middleware/index.js'
import { authorController } from '../controllers/index.js'

const authorRouter = Router()

authorRouter.get('/', authorController.get)
authorRouter.post('/', roleMiddleware(['admin']), authorController.create)
authorRouter.patch('/', roleMiddleware(['admin']), authorController.change)
authorRouter.delete('/', roleMiddleware(['admin']), authorController.delete)

export default authorRouter
