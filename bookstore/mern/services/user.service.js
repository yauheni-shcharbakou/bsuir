import UserModel from '../models/user.model.js'

export default class UserService {
  async get() {
    return UserModel.find({}).lean()
  }

  async getOne(_id) {
    return UserModel.findById(_id).lean()
  }

  async getBooks(_id) {
    const userPopulated = await UserModel.findById(_id)
      .populate('_books')
      .lean()
    return userPopulated._books
  }

  async getByEmail(email) {
    return UserModel.findOne({ email }).lean()
  }

  async count() {
    return UserModel.countDocuments()
  }

  async create(email, password, role) {
    const user = await new UserModel({ email, password, role })
    await user.save()
    return user
  }

  async changeBooks(_id, _books) {
    const user = await UserModel.findByIdAndUpdate(_id, {
      $set: { _books },
    }).lean()
    return { ...user, _books }
  }

  async change(_id, role) {
    const user = await UserModel.findByIdAndUpdate(_id, {
      $set: { role },
    }).lean()
    return { ...user, role }
  }

  async removeBook(bookId) {
    await UserModel.updateMany({}, { $pull: { _books: bookId } })
  }

  async delete(_id) {
    await UserModel.findByIdAndRemove(_id)
    return _id
  }
}
