import BaseApi from '../shared/base.api'

export default class BookApi extends BaseApi {
  url = '/book'

  async getAll() {
    return (await this.api.get(this.url)).data
  }

  async create(author, publisher, category, name) {
    return (
      await this.authApi.post(this.url, {
        author,
        publisher,
        category,
        name,
      })
    ).data
  }

  async change(id, author, publisher, category, name) {
    return (
      await this.authApi.patch(this.url, {
        id,
        author,
        publisher,
        category,
        name,
      })
    ).data
  }

  async delete(id) {
    return (await this.authApi.delete(this.url, { data: { id } })).data
  }
}
