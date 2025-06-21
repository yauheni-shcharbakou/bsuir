import BaseApi from '../shared/base.api'

export default class CategoryApi extends BaseApi {
  url = '/category'

  async getAll() {
    return (await this.api.get(this.url)).data
  }

  async create(name) {
    return (await this.authApi.post(this.url, { name })).data
  }

  async change(_id, name) {
    return (await this.authApi.patch(this.url, { _id, name })).data
  }

  async delete(_id) {
    return (await this.authApi.delete(this.url, { data: { _id } })).data
  }
}
