import { offerService, orderService } from '../services/index.js'
import { errorHandler } from '../shared/helpers.js'

export default class OrderController {
  async getForCustomer(req, res) {
    const orders = await orderService.getByCustomer(req.query._user)
    return res.json(orders)
  }

  async getForSalesman(req, res) {
    const orders = await orderService.getBySalesman(req.query._user)
    return res.json(orders)
  }

  async create(req, res, next) {
    return errorHandler(async () => {
      const { _offer, _book, _payment, _customer, _salesman, amount, price } =
        req.body
      const order = await orderService.create(
        _offer,
        _book,
        _payment,
        _customer,
        _salesman,
        amount,
        price
      )
      const offer = await offerService.getOne(_offer)
      await offerService.changeAmount(_offer, offer.amount - amount)
      return res.json(order)
    }, next)
  }

  async delete(req, res, next) {
    return errorHandler(async () => {
      const order = await orderService.getOne(req.body._id)
      const offer = await offerService.getOne(order._offer)
      await offerService.changeAmount(order._offer, offer.amount + order.amount)
      const id = await orderService.delete(order._id)
      return res.json(id)
    }, next)
  }
}
