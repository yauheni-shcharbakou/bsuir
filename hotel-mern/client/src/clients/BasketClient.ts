import { AppStore } from '../interfaces/types'
import BaseClient from './BaseClient'
import BasketApi from '../api/basket'

export default class BasketClient extends BaseClient<BasketApi> {
  loadAll(basket: AppStore['basket']) {
    this.api
      .getAll()
      .then((baskets) => basket.setBaskets(baskets))
      .catch((e) => console.error(e))
  }

  loadOne(id: string, basket: AppStore['basket'], callback: () => void) {
    this.api
      .getOne(id)
      .then((response) => {
        basket.setBasket(response)
        callback()
      })
      .catch((e) => console.error(e))
  }
}
