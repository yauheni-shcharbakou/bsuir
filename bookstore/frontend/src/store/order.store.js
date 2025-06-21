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

  findOrder(orderId) {
    return this._orders.find(({ id }) => id === orderId)
  }

  addOrder(order) {
    this._orders.push(order)
  }

  deleteOrder(orderId) {
    this._orders = this._orders.filter(({ id }) => id !== orderId)
  }
}
