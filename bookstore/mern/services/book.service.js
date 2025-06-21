import BookModel from '../models/book.model.js'

export default class BookService {
  async get() {
    return BookModel.find({})
      .populate('_author')
      .populate('_publisher')
      .populate('_category')
      .populate('_reviews')
      .lean()
  }

  async getOnePopulated(_id) {
    return BookModel.findById(_id)
      .populate('_author')
      .populate('_publisher')
      .populate('_category')
      .populate('_reviews')
      .lean()
  }

  async getByQuery(query) {
    return BookModel.find(query).lean()
  }

  async create(_author, _publisher, _category, name) {
    const book = await new BookModel({ _author, _publisher, _category, name })
    await book.save()
    return this.getOnePopulated(book._id)
  }

  async change(_id, _author, _publisher, _category, name) {
    const book = await BookModel.findByIdAndUpdate(_id, {
      $set: { _author, _publisher, _category, name },
    }).lean()
    return this.getOnePopulated(_id)
  }

  async addReview(bookId, reviewId) {
    await BookModel.findByIdAndUpdate(bookId, { $push: { _reviews: reviewId } })
  }

  async removeReview(reviewId) {
    await BookModel.updateMany({}, { $pull: { _reviews: reviewId } })
  }

  async delete(_id) {
    await BookModel.findByIdAndRemove(_id)
    return _id
  }
}
