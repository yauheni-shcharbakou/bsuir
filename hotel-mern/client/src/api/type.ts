import BaseApi from '../shared/BaseApi'
import { Type } from '../interfaces/models'

export default class TypeApi extends BaseApi {
  private readonly route = '/type'

  async getAll(): Promise<Type[]> {
    return (await this.api.get<Type[]>(this.route)).data
  }

  async create(
    _services: string[],
    name: string,
    places: number
  ): Promise<Type> {
    return (
      await this.authApi.post<Type>(this.route, { _services, name, places })
    ).data
  }

  async change(
    _id: string,
    _services: string[],
    name: string,
    places: number
  ): Promise<Type> {
    return (
      await this.authApi.patch<Type>(this.route, {
        _id,
        _services,
        name,
        places,
      })
    ).data
  }

  async delete(_id: string): Promise<string> {
    return (await this.authApi.delete<string>(this.route, { data: { _id } }))
      .data
  }
}
