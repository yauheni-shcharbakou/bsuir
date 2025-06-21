import BaseApi from '../shared/base.api'

export default class ReviewApi extends BaseApi {
  url = '/review'

  async create(book, author, content) {
    return (await this.api.post(this.url, { book, author, content })).data
  }

  async change(id, content) {
    return (await this.api.patch(this.url, { id, content })).data
  }

  async delete(id) {
    return (await this.api.delete(this.url, { data: { id } })).data
  }
}
