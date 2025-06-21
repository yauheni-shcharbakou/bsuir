import OfferModel from '../models/offer.model.js'

export default class OfferService {
  async get() {
    return OfferModel.find({ amount: { $gt: 0 } }).lean()
  }

  async getOne(_id) {
    return OfferModel.findById(_id).lean()
  }

  async getByUser(_user) {
    return OfferModel.find({ _user }).lean()
  }

  async create(_book, _user, salesman, amount, price) {
    const offer = await new OfferModel({
      _book,
      _user,
      salesman,
      amount,
      price,
    })
    await offer.save()
    return offer
  }

  async change(_id, _book, amount, price) {
    const offer = await OfferModel.findByIdAndUpdate(_id, {
      $set: { _book, amount, price },
    })
    return { ...offer, _book, amount, price }
  }

  async changeAmount(_id, amount) {
    const offer = await OfferModel.findByIdAndUpdate(_id, {
      $set: { amount },
    })
    return { ...offer, amount }
  }

  async delete(_id) {
    await OfferModel.findByIdAndRemove(_id)
    return _id
  }

  async deleteWithBook(bookId) {
    await OfferModel.deleteMany({ _book: bookId })
  }

  async deleteWithUser(userId) {
    await OfferModel.deleteMany({ _user: userId })
  }
}
