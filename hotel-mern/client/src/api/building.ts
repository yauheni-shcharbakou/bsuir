import BaseApi from '../shared/BaseApi'
import { Building } from '../interfaces/models'

export default class BuildingApi extends BaseApi {
  private readonly route = '/building'

  async getAll(): Promise<Building[]> {
    return (await this.api.get<Building[]>(this.route)).data
  }

  async create(address: string): Promise<Building> {
    return (await this.authApi.post<Building>(this.route, { address })).data
  }

  async change(_id: string, address: string): Promise<Building> {
    return (await this.authApi.patch<Building>(this.route, { _id, address }))
      .data
  }

  async delete(_id: string): Promise<string> {
    return (await this.authApi.delete<string>(this.route, { data: { _id } }))
      .data
  }
}
