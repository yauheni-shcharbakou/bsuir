import { AppStore } from '../interfaces/types'
import BaseClient from './BaseClient'
import OrderApi from '../api/order'
import { OrderPopulated } from '../interfaces/populatedModels'
import { errorViewer, incorrectHandler } from '../shared/constants'

export default class OrderClient extends BaseClient<OrderApi> {
  loadAll(
    basket: AppStore['basket'],
    order: AppStore['order'],
    callback: (orders: OrderPopulated[]) => void
  ) {
    this.api
      .get(basket.basket._id)
      .then((orders) => {
        order.setOrders(orders)
        callback(orders)
      })
      .catch((e) => console.error(e))
  }

  create(
    services: string[],
    price: number,
    population: number,
    order: AppStore['order'],
    basket: AppStore['basket'],
    user: AppStore['user'],
    room: AppStore['room'],
    callback: () => void
  ) {
    if (user.isAuth && room.current.isFree) {
      this.api
        .create(
          basket.basket._id,
          room.current._id,
          services,
          price,
          population
        )
        .then((response) => {
          order.addOrder(response)
          callback()
        })
        .catch((e) => errorViewer(e))
    } else {
      incorrectHandler()
    }
  }

  delete(id: string, order: AppStore['order'], callback: () => void) {
    this.api
      .delete(id)
      .then(() => {
        order.deleteOrder(id)
        callback()
      })
      .catch((e) => console.error(e))
  }
}
