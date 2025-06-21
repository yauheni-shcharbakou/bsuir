import { action, computed, makeObservable, observable } from 'mobx'
import { OrderPopulated } from '../interfaces/populatedModels'

export default class OrderStore {
  @observable private _orders: OrderPopulated[] = []

  constructor() {
    makeObservable(this)
  }

  @action
  setOrders(value: OrderPopulated[]) {
    this._orders = value
  }

  @action
  addOrder(order: OrderPopulated) {
    this._orders.push(order)
  }

  @action
  deleteOrder(id: string) {
    this._orders = this._orders.filter(({ _id }) => _id !== id)
  }

  @computed
  get orders() {
    return this._orders
  }
}
