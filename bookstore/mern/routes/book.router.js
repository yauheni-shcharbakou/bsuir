import { Router } from 'express'
import { roleMiddleware } from '../middleware/index.js'
import { bookController } from '../controllers/index.js'

const bookRouter = Router()

bookRouter.get('/', bookController.get)
bookRouter.post('/', roleMiddleware(['admin']), bookController.create)
bookRouter.patch('/', roleMiddleware(['admin']), bookController.change)
bookRouter.delete('/', roleMiddleware(['admin']), bookController.delete)

export default bookRouter
