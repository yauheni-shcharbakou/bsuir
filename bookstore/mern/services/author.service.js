import AuthorModel from '../models/author.model.js'

export default class AuthorService {
  async get() {
    return AuthorModel.find({}).lean()
  }

  async getOne(_id) {
    return AuthorModel.findById(_id).lean()
  }

  async create(name) {
    const author = await new AuthorModel({ name })
    await author.save()
    return author
  }

  async change(_id, name) {
    const author = await AuthorModel.findByIdAndUpdate(_id, {
      $set: { name },
    }).lean()
    return { ...author, name }
  }

  async delete(_id) {
    await AuthorModel.findByIdAndRemove(_id)
    return _id
  }
}
