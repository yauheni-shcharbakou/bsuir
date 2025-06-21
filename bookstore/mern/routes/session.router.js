import { Router } from 'express'
import { roleMiddleware } from '../middleware/index.js'
import { sessionController } from '../controllers/index.js'

const sessionRouter = Router()

sessionRouter.get('/', roleMiddleware(['admin']), sessionController.get)

export default sessionRouter
