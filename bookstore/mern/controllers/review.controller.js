import { bookService, reviewService } from '../services/index.js'
import { errorHandler } from '../shared/helpers.js'

export default class ReviewController {
  async create(req, res, next) {
    return errorHandler(async () => {
      const { _book, author, content } = req.body
      const review = await reviewService.create(author, content)
      await bookService.addReview(_book, review._id)
      return res.json(review)
    }, next)
  }

  async change(req, res, next) {
    return errorHandler(async () => {
      const review = await reviewService.change(req.body._id, req.body.content)
      return res.json(review)
    }, next)
  }

  async delete(req, res, next) {
    return errorHandler(async () => {
      const id = await reviewService.delete(req.body._id)
      await bookService.removeReview(id)
      return res.json(id)
    }, next)
  }
}
