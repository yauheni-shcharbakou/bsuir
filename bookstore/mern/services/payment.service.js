import PaymentModel from '../models/payment.model.js'

export default class PaymentService {
  async get() {
    return PaymentModel.find({}).lean()
  }

  async create(name) {
    const payment = await new PaymentModel({ name })
    await payment.save()
    return payment
  }

  async change(_id, name) {
    const payment = await PaymentModel.findByIdAndUpdate(_id, {
      $set: { name },
    }).lean()
    return { ...payment, name }
  }

  async delete(_id) {
    await PaymentModel.findByIdAndRemove(_id)
    return _id
  }
}
