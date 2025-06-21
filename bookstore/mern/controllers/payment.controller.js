import { orderService, paymentService } from '../services/index.js'
import { errorHandler } from '../shared/helpers.js'

export default class PaymentController {
  async get(req, res) {
    const payments = await paymentService.get()
    return res.json(payments)
  }

  async create(req, res, next) {
    return errorHandler(async () => {
      const payment = await paymentService.create(req.body.name)
      return res.json(payment)
    }, next)
  }

  async change(req, res, next) {
    return errorHandler(async () => {
      const { _id, name } = req.body
      const payment = await paymentService.change(_id, name)
      return res.json(payment)
    }, next)
  }

  async delete(req, res, next) {
    return errorHandler(async () => {
      const id = await paymentService.delete(req.body._id)
      await orderService.deleteWithPayment(id)
      return res.json(id)
    }, next)
  }
}
