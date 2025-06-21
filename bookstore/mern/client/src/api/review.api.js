import BaseApi from '../shared/base.api'

export default class ReviewApi extends BaseApi {
  url = '/review'

  async create(_book, author, content) {
    return (await this.api.post(this.url, { _book, author, content })).data
  }

  async change(_id, content) {
    return (await this.api.patch(this.url, { _id, content })).data
  }

  async delete(_id) {
    return (await this.api.delete(this.url, { data: { _id } })).data
  }
}
