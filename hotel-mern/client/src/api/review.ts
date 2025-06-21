import BaseApi from '../shared/BaseApi'
import { Review } from '../interfaces/models'

export default class ReviewApi extends BaseApi {
  private readonly route = '/review'

  async getAll(_room: string): Promise<Review[]> {
    return (await this.api.get<Review[]>(this.route, { params: { _room } }))
      .data
  }

  async create(
    _room: string,
    author: string,
    content: string
  ): Promise<Review> {
    return (await this.api.post<Review>(this.route, { _room, author, content }))
      .data
  }

  async change(_id: string, content: string): Promise<Review> {
    return (await this.api.patch<Review>(this.route, { _id, content })).data
  }

  async delete(_id: string): Promise<string> {
    return (await this.api.delete<string>(this.route, { data: { _id } })).data
  }
}
