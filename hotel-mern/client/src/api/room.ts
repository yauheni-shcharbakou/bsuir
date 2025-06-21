import BaseApi from '../shared/BaseApi'
import { RoomRequestConfig } from '../interfaces/types'
import { RoomResponse } from '../interfaces/responses'
import { RoomPopulated } from '../interfaces/populatedModels'

export default class RoomApi extends BaseApi {
  private readonly route = '/room'

  async get(
    page: number,
    limit: number,
    building: string = '',
    type: string = '',
    isFree: boolean | undefined = undefined
  ): Promise<RoomResponse> {
    const params: RoomRequestConfig = {
      page,
      limit,
      isFree,
    }

    if (building) params._building = building
    if (type) params._type = type
    if (isFree) params.isFree = isFree

    return (await this.api.get<RoomResponse>(this.route, { params })).data
  }

  async create(_building: string, _type: string): Promise<RoomPopulated> {
    return (
      await this.authApi.post<RoomPopulated>(this.route, {
        _building,
        _type,
      })
    ).data
  }

  async change(
    _id: string,
    _building: string,
    _type: string
  ): Promise<RoomPopulated> {
    return (
      await this.authApi.patch<RoomPopulated>(this.route, {
        _id,
        _building,
        _type,
      })
    ).data
  }

  async delete(_id: string): Promise<string> {
    return (await this.authApi.delete<string>(this.route, { data: { _id } }))
      .data
  }
}
