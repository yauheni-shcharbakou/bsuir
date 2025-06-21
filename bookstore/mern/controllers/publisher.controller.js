import { publisherService } from '../services/index.js'
import { deleteBooks, errorHandler } from '../shared/helpers.js'

export default class PublisherController {
  async get(req, res) {
    const publishers = await publisherService.get()
    return res.json(publishers)
  }

  async create(req, res, next) {
    return errorHandler(async () => {
      const publisher = await publisherService.create(
        req.body.name,
        req.body.address
      )
      return res.json(publisher)
    }, next)
  }

  async change(req, res, next) {
    return errorHandler(async () => {
      const { _id, name, address } = req.body
      const publisher = await publisherService.change(_id, name, address)
      return res.json(publisher)
    }, next)
  }

  async delete(req, res, next) {
    return errorHandler(async () => {
      const id = await publisherService.delete(req.body._id)
      await deleteBooks({ _publisher: id })
      return res.json(id)
    }, next)
  }
}
