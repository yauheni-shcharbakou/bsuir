import { offerService } from '../services/index.js'
import { errorHandler } from '../shared/helpers.js'

export default class OfferController {
  async get(req, res) {
    const offers = await offerService.get()
    return res.json(offers)
  }

  async getCurrent(req, res) {
    const offers = await offerService.getByUser(req.query._user)
    return res.json(offers)
  }

  async create(req, res, next) {
    return errorHandler(async () => {
      const { _book, _user, salesman, amount, price } = req.body
      const offer = await offerService.create(
        _book,
        _user,
        salesman,
        amount,
        price
      )
      return res.json(offer)
    }, next)
  }

  async change(req, res, next) {
    return errorHandler(async () => {
      const { _id, _book, amount, price } = req.body
      const offer = await offerService.change(_id, _book, amount, price)
      return res.json(offer)
    }, next)
  }

  async delete(req, res, next) {
    return errorHandler(async () => {
      const id = await offerService.delete(req.body._id)
      return res.json(id)
    }, next)
  }
}
