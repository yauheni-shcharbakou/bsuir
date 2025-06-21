import { makeAutoObservable } from 'mobx'

export default class OrderStore {
  constructor() {
    this._orders = []
    makeAutoObservable(this)
  }

  setOrders(value) {
    this._orders = value
  }

  get orders() {
    return this._orders
  }

  findOrder(id) {
    return this._orders.find(({ _id }) => _id === id)
  }

  addOrder(order) {
    this._orders.push(order)
  }

  deleteOrder(id) {
    this._orders = this._orders.filter(({ _id }) => _id !== id)
  }
}
