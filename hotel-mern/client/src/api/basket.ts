import BaseApi from '../shared/BaseApi'
import { BasketPopulated } from '../interfaces/populatedModels'

export default class BasketApi extends BaseApi {
  private readonly route = '/basket'
  private readonly currentAlias = '/current'

  async getOne(_user: string): Promise<BasketPopulated> {
    return (
      await this.api.get<BasketPopulated>(this.route + this.currentAlias, {
        params: { _user },
      })
    ).data
  }

  async getAll(): Promise<BasketPopulated[]> {
    return (await this.authApi.get<BasketPopulated[]>(this.route)).data
  }
}
