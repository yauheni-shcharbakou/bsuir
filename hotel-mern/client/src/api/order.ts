import BaseApi from '../shared/BaseApi'
import { OrderPopulated } from '../interfaces/populatedModels'
import { Order } from '../interfaces/models'

export default class OrderApi extends BaseApi {
  private readonly route = '/order'

  async get(_basket: string): Promise<OrderPopulated[]> {
    return (
      await this.api.get<OrderPopulated[]>(this.route, { params: { _basket } })
    ).data
  }

  async create(
    _basket: string,
    _room: string,
    _services: string[],
    duty: number,
    population: number
  ): Promise<OrderPopulated> {
    return (
      await this.api.post<OrderPopulated>(this.route, {
        _basket,
        _room,
        _services,
        duty,
        population,
        date: new Date().toDateString(),
      })
    ).data
  }

  async delete(_id: string): Promise<string> {
    return (await this.api.delete<string>(this.route, { data: { _id } })).data
  }
}
