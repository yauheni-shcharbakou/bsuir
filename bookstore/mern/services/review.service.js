import ReviewModel from '../models/review.model.js'

export default class ReviewService {
  async getOne(_id) {
    return ReviewModel.findById(_id).lean()
  }

  async create(author, content) {
    const review = await new ReviewModel({ author, content })
    await review.save()
    return review
  }

  async change(_id, content) {
    const review = await ReviewModel.findByIdAndUpdate(_id, {
      $set: { content },
    }).lean()
    return { ...review, content }
  }

  async delete(_id) {
    await ReviewModel.findByIdAndRemove(_id)
    return _id
  }
}
