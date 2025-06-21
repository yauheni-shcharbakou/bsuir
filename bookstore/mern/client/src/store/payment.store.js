import { makeAutoObservable } from 'mobx'

export default class PaymentStore {
  constructor() {
    this._payments = []
    makeAutoObservable(this)
  }

  setPayments(value) {
    this._payments = value
  }

  get payments() {
    return this._payments
  }

  findPayment(id) {
    return this._payments.find(({ _id }) => _id === id)
  }

  addPayment(payment) {
    this._payments.push(payment)
  }

  changePayment(changed) {
    this._payments = this._payments.map((payment) =>
      payment._id === changed._id ? changed : payment
    )
  }

  deletePayment(id) {
    this._payments = this._payments.filter(({ _id }) => _id !== id)
  }
}
