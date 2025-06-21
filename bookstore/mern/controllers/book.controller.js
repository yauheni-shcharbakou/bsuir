import {
  bookService,
  offerService,
  orderService,
  reviewService,
  userService,
} from '../services/index.js'
import { errorHandler } from '../shared/helpers.js'

export default class BookController {
  async get(req, res) {
    const books = await bookService.get()
    return res.json(books)
  }

  async create(req, res, next) {
    return errorHandler(async () => {
      const { _author, _publisher, _category, name } = req.body
      const book = await bookService.create(
        _author,
        _publisher,
        _category,
        name
      )
      return res.json(book)
    }, next)
  }

  async change(req, res, next) {
    return errorHandler(async () => {
      const { _id, _author, _publisher, _category, name } = req.body
      const book = await bookService.change(
        _id,
        _author,
        _publisher,
        _category,
        name
      )
      return res.json(book)
    }, next)
  }

  async delete(req, res, next) {
    return errorHandler(async () => {
      const bookPopulated = await bookService.getOnePopulated(req.body._id)
      const id = bookPopulated._id

      bookPopulated._reviews.map(
        async (reviewId) => await reviewService.delete(reviewId)
      )

      await orderService.deleteWithBook(id)
      await offerService.deleteWithBook(id)
      await userService.removeBook(id)

      await bookService.delete(id)
      return res.json(id)
    }, next)
  }
}
