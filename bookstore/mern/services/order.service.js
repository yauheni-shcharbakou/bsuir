import OrderModel from '../models/order.model.js'

export default class OrderService {
  async getByUser(_user) {
    return OrderModel.find({ _user }).lean()
  }

  async getOne(_id) {
    return OrderModel.findById(_id).lean()
  }

  async getByCustomer(_customer) {
    return OrderModel.find({ _customer }).lean()
  }

  async getBySalesman(_salesman) {
    return OrderModel.find({ _salesman }).lean()
  }

  async create(_offer, _book, _payment, _customer, _salesman, amount, price) {
    const order = await new OrderModel({
      _offer,
      _book,
      _payment,
      _customer,
      _salesman,
      amount,
      price,
      date: new Date().toDateString(),
    })
    await order.save()
    return order
  }

  async delete(_id) {
    await OrderModel.findByIdAndRemove(_id)
    return _id
  }

  async deleteWithBook(bookId) {
    await OrderModel.deleteMany({ _book: bookId })
  }

  async deleteWithUser(userId) {
    await OrderModel.deleteMany({ _user: userId })
  }

  async deleteWithPayment(paymentId) {
    await OrderModel.deleteMany({ _payment: paymentId })
  }
}
