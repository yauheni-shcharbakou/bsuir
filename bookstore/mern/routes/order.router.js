import { Router } from 'express'
import { orderController } from '../controllers/index.js'

const orderRouter = Router()

orderRouter.get('/customer', orderController.getForCustomer)
orderRouter.get('/salesman', orderController.getForSalesman)
orderRouter.post('/', orderController.create)
orderRouter.delete('/', orderController.delete)

export default orderRouter
