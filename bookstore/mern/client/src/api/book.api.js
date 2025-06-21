import BaseApi from '../shared/base.api'

export default class BookApi extends BaseApi {
  url = '/book'

  async getAll() {
    return (await this.api.get(this.url)).data
  }

  async create(_author, _publisher, _category, name) {
    return (
      await this.authApi.post(this.url, {
        _author,
        _publisher,
        _category,
        name,
      })
    ).data
  }

  async change(_id, _author, _publisher, _category, name) {
    return (
      await this.authApi.patch(this.url, {
        _id,
        _author,
        _publisher,
        _category,
        name,
      })
    ).data
  }

  async delete(_id) {
    return (await this.authApi.delete(this.url, { data: { _id } })).data
  }
}
