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

  findPayment(paymentId) {
    return this._payments.find(({ id }) => id === paymentId)
  }

  addPayment(payment) {
    this._payments.push(payment)
  }

  changePayment(changed) {
    this._payments = this._payments.map((payment) =>
      payment.id === changed.id ? changed : payment
    )
  }

  deletePayment(paymentId) {
    this._payments = this._payments.filter(({ id }) => id !== paymentId)
  }
}
