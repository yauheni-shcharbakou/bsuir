import { Router } from 'express'
import { reviewController } from '../controllers/index.js'

const reviewRouter = Router()

reviewRouter.post('/', reviewController.create)
reviewRouter.patch('/', reviewController.change)
reviewRouter.delete('/', reviewController.delete)

export default reviewRouter
